import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, X, ArrowRight, Shield, FileText, AlertTriangle, BarChart3 } from 'lucide-react';

export default function SecurityToolkitPositioning() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section
        className="relative py-20 md:py-32 bg-cover bg-center"
        style={{ backgroundImage: 'url(/assets/generated/hero-bg.dim_1920x1080.png)' }}
      >
        <div className="absolute inset-0 bg-navy/85" />
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-gray-600 text-white">DIY Security System</Badge>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
              Security Toolkit for Self-Implementation
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-4">
              For teams not ready for hands-on advisory
            </p>
            <p className="text-base text-white/80">
              A complete security system you can implement yourself — templates, frameworks, and dashboards ready to deploy.
            </p>
          </div>
        </div>
      </section>

      {/* Advisory vs Toolkit Comparison */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-12 text-center">
            Advisory vs Toolkit: Which Is Right for You?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Advisory Column */}
            <Card className="border-2 border-emerald-500 shadow-lg relative">
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-600 text-white">
                Premium Option
              </Badge>
              <CardHeader className="bg-emerald-50">
                <CardTitle className="text-navy text-2xl">Security Advisory</CardTitle>
                <CardDescription className="text-base">Hands-on implementation guidance</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-2xl font-bold text-emerald-600 mb-6">₹49,999 – ₹1,50,000</p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Custom security assessment & gap analysis</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Personalized policy customization for your startup</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Hands-on implementation support (30+ days)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Direct access to security professionals</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Ongoing advisory & quarterly reviews available</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Tailored to your industry & funding stage</span>
                  </li>
                </ul>
                <Button asChild size="lg" className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold">
                  <Link to="/security-advisory">
                    Apply for Advisory <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Toolkit Column */}
            <Card className="border-2 border-gray-300">
              <CardHeader className="bg-gray-50">
                <CardTitle className="text-navy text-2xl">Security Toolkit</CardTitle>
                <CardDescription className="text-base">Self-serve templates & frameworks</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-2xl font-bold text-gray-700 mb-6">₹7,999 – ₹14,999</p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-gray-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Pre-built security templates & policies</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-gray-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Generic frameworks (you customize yourself)</span>
                  </li>
                  <li className="flex items-start">
                    <X className="h-5 w-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-500">No implementation support</span>
                  </li>
                  <li className="flex items-start">
                    <X className="h-5 w-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-500">No direct advisory access</span>
                  </li>
                  <li className="flex items-start">
                    <X className="h-5 w-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-500">No ongoing support or reviews</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-gray-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Good for smaller teams with internal resources</span>
                  </li>
                </ul>
                <Button asChild size="lg" variant="outline" className="w-full mt-6 border-2 border-gray-400 text-gray-700 hover:bg-gray-100 font-semibold">
                  <Link to="/toolkit">
                    View Toolkit Details <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="max-w-3xl mx-auto mt-12 text-center">
            <p className="text-lg text-gray-700 mb-4">
              <strong>Not sure which option fits your startup?</strong>
            </p>
            <p className="text-gray-600 mb-6">
              Book a free 15-minute discovery call to discuss your security needs and get personalized recommendations.
            </p>
            <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8">
              <Link to="/security-advisory">Book Free Discovery Call</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* What's Included in Toolkit */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-12 text-center">
            What's Included in the Toolkit
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <img
                  src="/assets/generated/ai-governance-policy-mockup.dim_800x600.png"
                  alt="AI Governance Policy"
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <Shield className="h-8 w-8 text-gray-600 mb-2" />
                <CardTitle className="text-navy text-lg">AI Governance Policy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">Pre-built policy templates for managing AI tool usage</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <img
                  src="/assets/generated/risk-register-dashboard-mockup.dim_800x600.png"
                  alt="Risk Register"
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <AlertTriangle className="h-8 w-8 text-gray-600 mb-2" />
                <CardTitle className="text-navy text-lg">Risk Register Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">Spreadsheet-based risk tracking framework</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <img
                  src="/assets/generated/incident-response-playbook-mockup.dim_800x600.png"
                  alt="Incident Response"
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <FileText className="h-8 w-8 text-gray-600 mb-2" />
                <CardTitle className="text-navy text-lg">Incident Response Playbook</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">Generic incident response procedures & checklists</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <img
                  src="/assets/generated/executive-kpi-dashboard-mockup.dim_800x600.png"
                  alt="Executive Dashboard"
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <BarChart3 className="h-8 w-8 text-gray-600 mb-2" />
                <CardTitle className="text-navy text-lg">Executive KPI Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">Template dashboards for security metrics tracking</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-12 text-center">Toolkit Pricing Tiers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-2 border-gray-300">
              <CardHeader>
                <CardTitle className="text-navy">Basic</CardTitle>
                <CardDescription>Essential security templates</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-navy">₹7,999</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="h-5 w-5 text-gray-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">All 4 modules (PDF format)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="h-5 w-5 text-gray-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Instant download</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="h-5 w-5 text-gray-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Implementation guide</span>
                  </li>
                </ul>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/toolkit">Select Basic</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-emerald-500 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-emerald-600">Most Popular</Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-navy">Pro</CardTitle>
                <CardDescription>Customizable templates</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-navy">₹9,999</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Everything in Basic</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Editable Word/Excel files</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Customization instructions</span>
                  </li>
                </ul>
                <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-700">
                  <Link to="/toolkit">Select Pro</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-300">
              <CardHeader>
                <CardTitle className="text-navy">Pro+</CardTitle>
                <CardDescription>Complete package with bonus</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-navy">₹14,999</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="h-5 w-5 text-gray-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Everything in Pro</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="h-5 w-5 text-gray-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Bonus SOC Mini Playbook</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="h-5 w-5 text-gray-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Priority email support</span>
                  </li>
                </ul>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/toolkit">Select Pro+</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-navy to-emerald-900 text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Still Considering Hands-On Advisory?
            </h2>
            <p className="text-lg text-white/90 mb-8">
              If you want personalized implementation support and direct access to security professionals, our advisory service might be a better fit.
            </p>
            <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-10">
              <Link to="/security-advisory">
                Apply for Advisory <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
