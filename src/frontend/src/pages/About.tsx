import { Card, CardContent } from '@/components/ui/card';
import { Shield, Activity, Target } from 'lucide-react';

export default function About() {
  return (
    <div className="py-16 md:py-24">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <img src="/assets/generated/shield-icon.dim_64x64.png" alt="Shield" className="h-20 w-20" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-navy mb-6">About AIShield India</h1>
            <p className="text-xl text-gray-600">Security Systems for Modern Startups</p>
          </div>

          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-gray-700 leading-relaxed">
              AIShield India was founded to address a critical gap in the Indian startup ecosystem: accessible,
              practical cybersecurity solutions that don't require enterprise budgets or dedicated security teams.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We understand that Indian startups face unique challenges—rapid AI adoption, remote work models, complex
              compliance requirements under the Digital Personal Data Protection Act 2023, and limited security
              resources. Our mission is to democratize cybersecurity by providing battle-tested frameworks, templates,
              and systems that founders can implement immediately.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card>
              <CardContent className="pt-6 text-center">
                <Shield className="h-12 w-12 text-emerald-500 mx-auto mb-4" />
                <h3 className="font-semibold text-navy mb-2">Real-World Experience</h3>
                <p className="text-gray-600 text-sm">
                  Built by SOC professionals with 5+ years of hands-on incident response and threat investigation
                  experience.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <Activity className="h-12 w-12 text-emerald-500 mx-auto mb-4" />
                <h3 className="font-semibold text-navy mb-2">Practical Approach</h3>
                <p className="text-gray-600 text-sm">
                  No theoretical frameworks. Every template and system has been tested in real startup environments.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <Target className="h-12 w-12 text-emerald-500 mx-auto mb-4" />
                <h3 className="font-semibold text-navy mb-2">India-Focused</h3>
                <p className="text-gray-600 text-sm">
                  Specifically designed for Indian compliance requirements, startup culture, and resource constraints.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-navy text-white">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4">Our Expertise</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-emerald-400 mr-3">•</span>
                  <span>5+ years of Security Operations Center (SOC) experience</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-400 mr-3">•</span>
                  <span>Real-world incident response and threat hunting</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-400 mr-3">•</span>
                  <span>SIEM implementation and security monitoring</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-400 mr-3">•</span>
                  <span>Compliance frameworks (ISO 27001, DPDP Act 2023)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-400 mr-3">•</span>
                  <span>AI security and governance frameworks</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
