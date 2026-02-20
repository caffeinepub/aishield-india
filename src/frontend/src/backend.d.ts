import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface BlogPost {
    id: bigint;
    title: string;
    content: string;
    publishDate: Time;
    featuredImage: string;
    tags: Array<string>;
    author: string;
}
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export type Time = bigint;
export interface ContactSubmission {
    id: bigint;
    status: string;
    name: string;
    email: string;
    company: string;
    message: string;
    timestamp: Time;
}
export interface LeadTag {
    source: string;
    tags: Array<string>;
    category: string;
}
export interface LeadExport {
    source: string;
    name: string;
    tags: Array<string>;
    email: string;
    timestamp: Time;
}
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface ShoppingItem {
    productName: string;
    currency: string;
    quantity: bigint;
    priceInCents: bigint;
    productDescription: string;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export interface AdvisoryApplication {
    id: bigint;
    status: string;
    estimatedBudgetRange: string;
    workEmail: string;
    currentSecuritySetup: string;
    source: string;
    fullName: string;
    submittedAt: Time;
    companyName: string;
    companySize: string;
    companyWebsite: string;
    fundingStage: string;
    primaryConcern: string;
    industry: string;
}
export type StripeSessionStatus = {
    __kind__: "completed";
    completed: {
        userPrincipal?: string;
        response: string;
    };
} | {
    __kind__: "failed";
    failed: {
        error: string;
    };
};
export interface StripeConfiguration {
    allowedCountries: Array<string>;
    secretKey: string;
}
export interface UserProfile {
    name: string;
    email: string;
    company: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addLeadTag(email: string, category: string, source: string, tags: Array<string>): Promise<void>;
    analyticsAccessInstructions(): Promise<string>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createBlogPost(title: string, content: string, author: string, tags: Array<string>, featuredImage: string): Promise<bigint>;
    createCheckoutSession(items: Array<ShoppingItem>, successUrl: string, cancelUrl: string): Promise<string>;
    deleteBlogPost(id: bigint): Promise<void>;
    exportLeadsAsJSON(): Promise<Array<LeadExport>>;
    getAllAdvisoryApplications(): Promise<Array<AdvisoryApplication>>;
    getAllContactSubmissions(): Promise<Array<ContactSubmission>>;
    getAllLeadTags(): Promise<Array<LeadTag>>;
    getBlogPostsByTag(tag: string): Promise<Array<BlogPost>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getLeadTags(email: string): Promise<LeadTag | null>;
    getRecentInboundWebhooks(_limit: string): Promise<Array<string>>;
    getStripeSessionStatus(sessionId: string): Promise<StripeSessionStatus>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    isStripeConfigured(): Promise<boolean>;
    queryLeadDataWithToken(_caller: string, token: string, email: string): Promise<LeadExport | null>;
    recordLeadDownload(email: string, checklistVersion: string, source: string): Promise<void>;
    recordOrder(productType: string, pricingTier: string, customerEmail: string, paymentStatus: string, tags: Array<string>, source: string): Promise<bigint>;
    registerToken(token: string): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    setStripeConfiguration(config: StripeConfiguration): Promise<void>;
    submitAdvisoryApplication(fullName: string, workEmail: string, companyName: string, companyWebsite: string, companySize: string, industry: string, fundingStage: string, currentSecuritySetup: string, primaryConcern: string, estimatedBudgetRange: string, source: string): Promise<bigint>;
    submitContactForm(name: string, email: string, company: string, message: string): Promise<bigint>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    updateAdvisoryApplicationStatus(id: bigint, status: string): Promise<void>;
    updateBlogPost(id: bigint, title: string, content: string, author: string, tags: Array<string>, featuredImage: string): Promise<void>;
    updateContactSubmissionStatus(id: bigint, status: string): Promise<void>;
    updateDownloadStatus(email: string, status: string): Promise<void>;
    updateOrderStatus(orderId: bigint, status: string): Promise<void>;
    updateOrderTags(orderId: bigint, tags: Array<string>): Promise<void>;
    verifyToken(token: string): Promise<boolean>;
}
