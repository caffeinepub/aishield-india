import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Lock, Grid, Activity, CheckCircle2, ArrowRight, Target, Users, Briefcase } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section
        className="relative py-24 md:py-32 bg-cover bg-center"
        style={{ backgroundImage: 'url(/assets/generated/hero-bg.dim_1920x1080.png)' }}
      >
        <div className="absolute inset-0 bg-navy/90" />
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-3 leading-tight">
                AIShield India
              </h1>
              <p className="text-xl md:text-2xl text-emerald-400 font-semibold mb-6">
                Security Systems for Modern Startups
              </p>
            </div>
            <p className="text-lg md:text-xl text-white/90 mb-10">
              Implement structured AI governance and cybersecurity systems in 30 days — or work directly with us for guided founder-level advisory.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-lg px-10 py-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-emerald-500">
                <Link to="/security-advisory">Book Strategy Call</Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 text-lg px-8 py-4 shadow-lg transition-all duration-300 hover:scale-105"
              >
                <Link to="/free-checklist">Download Free AI Risk Checklist</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-8 text-center">
              Most Indian Startups Are One AI Mistake Away from a Data Breach
            </h2>
            <p className="text-lg text-gray-700 mb-6 text-center">
              Your team is using AI tools. But do you know what data they're sharing? Without structured governance,
              you're exposed.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              <div className="flex items-start space-x-3">
                <Activity className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-navy mb-1">Shadow AI Usage</h3>
                  <p className="text-gray-600">Sensitive customer data being pasted into AI tools without visibility.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Lock className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-navy mb-1">No Incident Response</h3>
                  <p className="text-gray-600">No documented playbook when a breach actually happens.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Grid className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-navy mb-1">Compliance Gaps</h3>
                  <p className="text-gray-600">DPDP Act 2023 requires documentation you don't have</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Shield className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-navy mb-1">Founder Blind Spots</h3>
                  <p className="text-gray-600">No visibility into actual security posture or risk exposure</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOC Experience Credibility Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-navy to-emerald-900 text-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
              Built by security practitioners with real incident response exposure in enterprise SOC environments.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="h-6 w-6 text-emerald-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-white/90">SIEM monitoring (Splunk / QRadar exposure)</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="h-6 w-6 text-emerald-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-white/90">Incident investigation</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="h-6 w-6 text-emerald-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-white/90">Executive-level reporting experience</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="h-6 w-6 text-emerald-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-white/90">DPDP compliance mapping</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Advisory Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-emerald-50 to-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
              Founder-Level Security Advisory
            </h2>
            <p className="text-lg text-gray-700 mb-4">
              Work directly with us to build and implement your security systems.
            </p>
            <p className="text-xl font-semibold text-emerald-700 mb-8">
              Engagements typically range from ₹49,999 – ₹1,50,000 depending on scope
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
            <Card className="border-2 border-emerald-200 hover:border-emerald-400 transition-all">
              <CardHeader>
                <Target className="h-10 w-10 text-emerald-600 mb-3" />
                <CardTitle className="text-navy">Security Gap Audit</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">Comprehensive assessment of your current security posture with actionable roadmap</p>
                <p className="text-2xl font-bold text-emerald-600">₹49,999</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-emerald-400 shadow-lg">
              <CardHeader>
                <Users className="h-10 w-10 text-emerald-600 mb-3" />
                <CardTitle className="text-navy">Guided Implementation</CardTitle>
                <CardDescription className="text-emerald-600 font-semibold">Most Popular</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">30-day sprint to implement AI governance policy, incident response playbook, and risk register</p>
                <p className="text-2xl font-bold text-emerald-600">₹99,999</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-emerald-200 hover:border-emerald-400 transition-all">
              <CardHeader>
                <Briefcase className="h-10 w-10 text-emerald-600 mb-3" />
                <CardTitle className="text-navy">Ongoing Advisory</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">Quarterly security reviews, compliance updates, and strategic guidance</p>
                <p className="text-2xl font-bold text-emerald-600">₹1,50,000</p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold">
              <Link to="/security-advisory">Apply for Advisory</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Advisory Process */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-12 text-center">How Advisory Works</h2>
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-navy mb-2">Application & Discovery Call</h3>
                  <p className="text-gray-700">
                    Submit your application. If approved, we'll schedule a 30-minute discovery call to understand your
                    security needs and current setup.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-navy mb-2">Custom Proposal</h3>
                  <p className="text-gray-700">
                    We'll create a tailored proposal with specific deliverables, timeline, and pricing based on your
                    requirements.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-navy mb-2">Implementation Sprint</h3>
                  <p className="text-gray-700">
                    Work directly with us to build and implement your security systems. Weekly check-ins and async
                    support throughout.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-navy mb-2">Handoff & Training</h3>
                  <p className="text-gray-700">
                    Receive all documentation, templates, and training to maintain your security systems independently.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deliverables Showcase */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-emerald-50 to-white">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-12 text-center">
              What You'll Get
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-navy">AI Governance Policy</CardTitle>
                </CardHeader>
                <CardContent>
                  <img
                    src="/assets/generated/ai-governance-policy-mockup.dim_800x600.png"
                    alt="AI Governance Policy"
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <p className="text-gray-700">
                    Comprehensive policy covering AI tool usage, data handling, and compliance requirements
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-navy">Risk Register Dashboard</CardTitle>
                </CardHeader>
                <CardContent>
                  <img
                    src="/assets/generated/risk-register-dashboard-mockup.dim_800x600.png"
                    alt="Risk Register Dashboard"
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <p className="text-gray-700">
                    Live dashboard to track and prioritize security risks across your organization
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-navy">Incident Response Playbook</CardTitle>
                </CardHeader>
                <CardContent>
                  <img
                    src="/assets/generated/incident-response-playbook-mockup.dim_800x600.png"
                    alt="Incident Response Playbook"
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <p className="text-gray-700">
                    Step-by-step procedures for handling security incidents and data breaches
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-navy">Executive KPI Dashboard</CardTitle>
                </CardHeader>
                <CardContent>
                  <img
                    src="/assets/generated/executive-kpi-dashboard-mockup.dim_800x600.png"
                    alt="Executive KPI Dashboard"
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <p className="text-gray-700">
                    Real-time security metrics and compliance status for leadership visibility
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* DIY Toolkit Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
                Prefer to Build It Yourself?
              </h2>
              <p className="text-lg text-gray-700 mb-8">
                Get our complete Security Toolkit with templates, frameworks, and implementation guides
              </p>
            </div>

            <Card className="border-2 border-gray-200">
              <CardHeader>
                <CardTitle className="text-2xl text-navy">Security Toolkit</CardTitle>
                <CardDescription>Complete DIY implementation package</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">AI Governance Policy Template</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Risk Register Framework</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Incident Response Playbook</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Executive Dashboard Templates</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-navy">₹9,999</p>
                    <p className="text-sm text-gray-600">One-time payment</p>
                  </div>
                  <Button asChild size="lg" variant="outline" className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50">
                    <Link to="/toolkit">
                      View Toolkit <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
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
              Stop Guessing. Start Securing.
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Apply for founder-level advisory or download our free AI Risk Checklist to get started
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold">
                <Link to="/security-advisory">Book Strategy Call</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-2 border-white/30">
                <Link to="/free-checklist">Download Free Checklist</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
