import Map "mo:core/Map";
import Text "mo:core/Text";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Int "mo:core/Int";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import OutCall "http-outcalls/outcall";
import Stripe "stripe/stripe";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";
import MixinStorage "blob-storage/Mixin";
import Migration "migration";

(with migration = Migration.run)
actor {
  include MixinStorage();

  // Authorization
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Rate limiting (new state)
  type FailedLoginAttempt = {
    timestamp : Time.Time;
    count : Nat;
  };

  let loginAttempts = Map.empty<Principal, FailedLoginAttempt>();
  let blockedLogins = Map.empty<Principal, Time.Time>();

  // User Profiles
  public type UserProfile = {
    name : Text;
    email : Text;
    company : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Blog Posts
  public type BlogPost = {
    id : Nat;
    title : Text;
    content : Text;
    author : Text;
    publishDate : Time.Time;
    tags : [Text];
    featuredImage : Text;
  };

  module BlogPost {
    public func compareByDate(post1 : BlogPost, post2 : BlogPost) : Order.Order {
      Int.compare(post1.publishDate, post2.publishDate);
    };
  };

  let blogPosts = Map.empty<Nat, BlogPost>();
  var nextBlogPostId = 1;

  // Contact Form Submissions
  public type ContactSubmission = {
    id : Nat;
    name : Text;
    email : Text;
    company : Text;
    message : Text;
    timestamp : Time.Time;
    status : Text;
  };

  let contactSubmissions = Map.empty<Nat, ContactSubmission>();
  var nextContactSubmissionId = 1;

  // Lead Magnet Downloads
  public type LeadMagnetDownload = {
    email : Text;
    downloadTimestamp : Time.Time;
    checklistVersion : Text;
    deliveryStatus : Text;
    tags : [Text];
    source : Text;
  };

  let leadDownloads = Map.empty<Text, LeadMagnetDownload>();

  // Orders
  public type Order = {
    orderId : Nat;
    productType : Text;
    pricingTier : Text;
    customerEmail : Text;
    paymentStatus : Text;
    timestamp : Time.Time;
    fulfillmentStatus : Text;
    tags : [Text];
  };

  let orders = Map.empty<Nat, Order>();
  var nextOrderId = 1;

  // Advisory Applications
  public type AdvisoryApplication = {
    id : Nat;
    fullName : Text;
    workEmail : Text;
    companyName : Text;
    companyWebsite : Text;
    companySize : Text;
    industry : Text;
    fundingStage : Text;
    currentSecuritySetup : Text;
    primaryConcern : Text;
    estimatedBudgetRange : Text;
    submittedAt : Time.Time;
    status : Text;
    source : Text;
  };

  let advisoryApplications = Map.empty<Nat, AdvisoryApplication>();
  var nextAdvisoryApplicationId = 1;

  // Stripe Configuration
  var stripeConfig : ?Stripe.StripeConfiguration = null;

  // Webhook Security Tokens
  let validTokens = Map.empty<Text, Bool>();

  // Product Categories
  public type ProductCategory = {
    id : Nat;
    name : Text;
    description : Text;
    featuredImage : Text;
    createdAt : Time.Time;
  };

  let productCategories = Map.empty<Nat, ProductCategory>();
  var nextCategoryId = 1;

  // Blog Posts CRUD
  public shared ({ caller }) func createBlogPost(title : Text, content : Text, author : Text, tags : [Text], featuredImage : Text) : async Nat {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can create posts");
    };
    raiseLoginFailedIfBlocked(caller);
    let id = nextBlogPostId;
    let post : BlogPost = {
      id;
      title;
      content;
      author;
      publishDate = Time.now();
      tags;
      featuredImage;
    };
    blogPosts.add(id, post);
    nextBlogPostId += 1;
    id;
  };

  public query func getBlogPostsByTag(tag : Text) : async [BlogPost] {
    // Public read access - no authorization needed
    blogPosts.values().toArray().filter(
      func(post) {
        post.tags.find(
          func(t) { Text.equal(t, tag) }
        ) != null;
      }
    );
  };

  public shared ({ caller }) func updateBlogPost(id : Nat, title : Text, content : Text, author : Text, tags : [Text], featuredImage : Text) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update posts");
    };
    raiseLoginFailedIfBlocked(caller);
    switch (blogPosts.get(id)) {
      case (null) { Runtime.trap("Post not found") };
      case (?_) {
        let updatedPost : BlogPost = {
          id;
          title;
          content;
          author;
          publishDate = Time.now();
          tags;
          featuredImage;
        };
        blogPosts.add(id, updatedPost);
      };
    };
  };

  public shared ({ caller }) func deleteBlogPost(id : Nat) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can delete posts");
    };
    raiseLoginFailedIfBlocked(caller);
    if (not blogPosts.containsKey(id)) {
      Runtime.trap("Post not found");
    };
    blogPosts.remove(id);
  };

  // Contact Form CRUD
  public shared ({ caller }) func submitContactForm(name : Text, email : Text, company : Text, message : Text) : async Nat {
    // Public submission - no authorization needed (guests can submit)
    let id = nextContactSubmissionId;
    let submission : ContactSubmission = {
      id;
      name;
      email;
      company;
      message;
      timestamp = Time.now();
      status = "new";
    };
    contactSubmissions.add(id, submission);
    nextContactSubmissionId += 1;
    id;
  };

  public shared ({ caller }) func updateContactSubmissionStatus(id : Nat, status : Text) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update submissions");
    };
    raiseLoginFailedIfBlocked(caller);
    switch (contactSubmissions.get(id)) {
      case (null) { Runtime.trap("Submission not found") };
      case (?submission) {
        let updatedSubmission = {
          submission with
          status
        };
        contactSubmissions.add(id, updatedSubmission);
      };
    };
  };

  public query ({ caller }) func getAllContactSubmissions() : async [ContactSubmission] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view submissions");
    };
    contactSubmissions.values().toArray();
  };

  // Advisory Application CRUD
  public shared ({ caller }) func submitAdvisoryApplication(
    fullName : Text,
    workEmail : Text,
    companyName : Text,
    companyWebsite : Text,
    companySize : Text,
    industry : Text,
    fundingStage : Text,
    currentSecuritySetup : Text,
    primaryConcern : Text,
    estimatedBudgetRange : Text,
    source : Text,
  ) : async Nat {
    // Public submission - no authorization needed (guests can submit)
    let id = nextAdvisoryApplicationId;
    let application : AdvisoryApplication = {
      id;
      fullName;
      workEmail;
      companyName;
      companyWebsite;
      companySize;
      industry;
      fundingStage;
      currentSecuritySetup;
      primaryConcern;
      estimatedBudgetRange;
      submittedAt = Time.now();
      status = "pending";
      source;
    };
    advisoryApplications.add(id, application);
    nextAdvisoryApplicationId += 1;
    id;
  };

  public query ({ caller }) func getAllAdvisoryApplications() : async [AdvisoryApplication] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view advisory applications");
    };
    advisoryApplications.values().toArray();
  };

  public shared ({ caller }) func updateAdvisoryApplicationStatus(id : Nat, status : Text) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update advisory applications");
    };
    raiseLoginFailedIfBlocked(caller);
    switch (advisoryApplications.get(id)) {
      case (null) { Runtime.trap("Advisory application not found") };
      case (?application) {
        let updatedApplication = {
          application with
          status
        };
        advisoryApplications.add(id, updatedApplication);
      };
    };
  };

  // Lead Magnet Download & Orders CRUD
  public shared ({ caller }) func recordLeadDownload(email : Text, checklistVersion : Text, source : Text) : async () {
    // Public access - no authorization needed (guests can download)
    let download : LeadMagnetDownload = {
      email;
      downloadTimestamp = Time.now();
      checklistVersion;
      deliveryStatus = "pending";
      tags = ["Checklist Download"];
      source;
    };
    leadDownloads.add(email, download);
  };

  public shared ({ caller }) func updateDownloadStatus(email : Text, status : Text) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update download status");
    };
    raiseLoginFailedIfBlocked(caller);
    switch (leadDownloads.get(email)) {
      case (null) { Runtime.trap("Download not found") };
      case (?download) {
        let updatedDownload = {
          download with
          deliveryStatus = status
        };
        leadDownloads.add(email, updatedDownload);
      };
    };
  };

  public shared ({ caller }) func recordOrder(productType : Text, pricingTier : Text, customerEmail : Text, paymentStatus : Text, tags : [Text], source : Text) : async Nat {
    // Public access - no authorization needed (guests can create orders via Stripe)
    let orderId = nextOrderId;
    let order : Order = {
      orderId;
      productType;
      pricingTier;
      customerEmail;
      paymentStatus;
      timestamp = Time.now();
      fulfillmentStatus = "pending";
      tags;
    };
    orders.add(orderId, order);
    nextOrderId += 1;
    orderId;
  };

  public shared ({ caller }) func updateOrderStatus(orderId : Nat, status : Text) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update order status");
    };
    raiseLoginFailedIfBlocked(caller);
    switch (orders.get(orderId)) {
      case (null) { Runtime.trap("Order not found") };
      case (?order) {
        let updatedOrder = {
          order with
          fulfillmentStatus = status
        };
        orders.add(orderId, updatedOrder);
      };
    };
  };

  public shared ({ caller }) func updateOrderTags(orderId : Nat, tags : [Text]) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update order tags");
    };
    raiseLoginFailedIfBlocked(caller);
    switch (orders.get(orderId)) {
      case (null) { Runtime.trap("Order not found") };
      case (?order) {
        let updatedOrder = {
          order with
          tags
        };
        orders.add(orderId, updatedOrder);
      };
    };
  };

  public query func isStripeConfigured() : async Bool {
    // Public read access - no authorization needed
    switch (stripeConfig) {
      case (null) { false };
      case (?_) { true };
    };
  };

  // Stripe Integration
  public shared ({ caller }) func setStripeConfiguration(config : Stripe.StripeConfiguration) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    raiseLoginFailedIfBlocked(caller);
    stripeConfig := ?config;
  };

  func getStripeConfiguration() : Stripe.StripeConfiguration {
    switch (stripeConfig) {
      case (null) { Runtime.trap("Stripe needs to be first configured") };
      case (?value) { value };
    };
  };

  public func getStripeSessionStatus(sessionId : Text) : async Stripe.StripeSessionStatus {
    // Public access - needed for checkout flow verification
    await Stripe.getSessionStatus(getStripeConfiguration(), sessionId, transform);
  };

  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    // Public access - needed for HTTP outcalls
    OutCall.transform(input);
  };

  public shared ({ caller }) func createCheckoutSession(items : [Stripe.ShoppingItem], successUrl : Text, cancelUrl : Text) : async Text {
    // Public access - guests can initiate checkout
    await Stripe.createCheckoutSession(getStripeConfiguration(), caller, items, successUrl, cancelUrl, transform);
  };

  // Lead Tagging and Webhook Integration
  public type LeadTag = {
    category : Text;
    source : Text;
    tags : [Text];
  };

  let leadTags = Map.empty<Text, LeadTag>();

  public shared ({ caller }) func addLeadTag(email : Text, category : Text, source : Text, tags : [Text]) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can add lead tags");
    };
    raiseLoginFailedIfBlocked(caller);
    let leadTag : LeadTag = {
      category;
      source;
      tags;
    };
    leadTags.add(email, leadTag);
  };

  public query ({ caller }) func getLeadTags(email : Text) : async ?LeadTag {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view lead tags");
    };
    leadTags.get(email);
  };

  public query ({ caller }) func getAllLeadTags() : async [LeadTag] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view all lead tags");
    };
    leadTags.values().toArray();
  };

  // Webhook Token Management
  public shared ({ caller }) func registerToken(token : Text) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can register tokens");
    };
    raiseLoginFailedIfBlocked(caller);
    validTokens.add(token, true);
  };

  public query func verifyToken(token : Text) : async Bool {
    // Public access - needed for webhook verification
    switch (validTokens.get(token)) {
      case (?true) { true };
      case (_) { false };
    };
  };

  // Lead Export for ESP Integration
  public type LeadExport = {
    email : Text;
    name : Text;
    tags : [Text];
    source : Text;
    timestamp : Time.Time;
  };

  public shared ({ caller }) func queryLeadDataWithToken(_caller : Text, token : Text, email : Text) : async ?LeadExport {
    // Token-based authorization for external systems
    if (not (await verifyToken(token))) {
      Runtime.trap("Unauthorized: Invalid token");
    };
    switch (leadDownloads.get(email)) {
      case (?download) {
        return ?{
          email = download.email;
          name = "";
          tags = download.tags;
          source = download.source;
          timestamp = download.downloadTimestamp;
        };
      };
      case (null) {};
    };
    for ((orderId, order) in orders.entries()) {
      if (order.customerEmail == email) {
        return ?{
          email = order.customerEmail;
          name = "";
          tags = order.tags;
          source = "";
          timestamp = order.timestamp;
        };
      };
    };
    null;
  };

  public query ({ caller }) func exportLeadsAsJSON() : async [LeadExport] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can export leads");
    };
    var leads : [LeadExport] = [];
    for ((email, download) in leadDownloads.entries()) {
      leads := leads.concat([
        {
          email = download.email;
          name = "";
          tags = download.tags;
          source = download.source;
          timestamp = download.downloadTimestamp;
        },
      ]);
    };
    for ((orderId, order) in orders.entries()) {
      leads := leads.concat([
        {
          email = order.customerEmail;
          name = "";
          tags = order.tags;
          source = "";
          timestamp = order.timestamp;
        },
      ]);
    };
    for ((id, app) in advisoryApplications.entries()) {
      leads := leads.concat([
        {
          email = app.workEmail;
          name = app.fullName;
          tags = ["Advisory Application"];
          source = app.source;
          timestamp = app.submittedAt;
        },
      ]);
    };
    leads;
  };

  public query ({ caller }) func getRecentInboundWebhooks(_limit : Text) : async [Text] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view webhook logs");
    };
    [];
  };

  // Rate limiting functions (NEW)
  func recordFailedLogin(principal : Principal) {
    let now = Time.now();
    let attempt = switch (loginAttempts.get(principal)) {
      case (null) {
        {
          timestamp = now;
          count = 1;
        };
      };
      case (?existing) {
        if (now - existing.timestamp > 15 * 60 * 1_000_000_000) {
          {
            timestamp = now;
            count = 1;
          };
        } else {
          {
            timestamp = now;
            count = existing.count + 1;
          };
        };
      };
    };
    loginAttempts.add(principal, attempt);
    if (attempt.count >= 5) {
      blockedLogins.add(principal, now + 15 * 60 * 1_000_000_000);
    };
  };

  func isRateLimited(principal : Principal) : Bool {
    switch (blockedLogins.get(principal)) {
      case (null) { false };
      case (?unblockTime) {
        if (Time.now() > unblockTime) {
          blockedLogins.remove(principal);
          false;
        } else {
          true;
        };
      };
    };
  };

  func raiseLoginFailedIfBlocked(principal : Principal) {
    if (isRateLimited(principal)) {
      Runtime.trap("Too many attempts: Temporarlily blocked");
    };
    recordFailedLogin(principal);
  };

  // Analytics and Search Console access
  public query ({ caller }) func analyticsAccessInstructions() : async Text {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can access this information");
    };
    (
      "To grant Google Analytics and Search Console access:\n\n" #
      "1. Create or obtain administrator credentials:\n" #
      "- Ensure you have a Google account with full admin rights for both services\n\n" #
      "2. Add your domain to Google Search Console:\n" #
      "- Verify domain ownership using DNS or Google Tag Manager\n\n" #
      "3. Configure Google Analytics:\n" #
      "- Create a property for your website\n" #
      "- Set up tracking using Google Tag Manager\n\n" #
      "4. Share account access securely:\n" #
      "- Use encrypted credential transfer (e.g., encrypted email)\n" #
      "- Store credentials securely (e.g., encrypted password manager)\n\n" #
      "5. Provide confirmation and documentation:\n" #
      "- Confirm ownership transfer and access provisioning\n" #
      "- Document administrator access history for future reference\n"
    );
  };
};
