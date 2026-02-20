import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { useActor } from '@/hooks/useActor';
import { Users, Mail, Download } from 'lucide-react';
import StatCard from '@/components/admin/StatCard';

export default function AdminDashboard() {
  const { actor, isFetching } = useActor();

  const { data: applications = [], isLoading: loadingApplications } = useQuery({
    queryKey: ['advisoryApplications'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllAdvisoryApplications();
    },
    enabled: !!actor && !isFetching,
  });

  const { data: contacts = [], isLoading: loadingContacts } = useQuery({
    queryKey: ['contactSubmissions'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllContactSubmissions();
    },
    enabled: !!actor && !isFetching,
  });

  const { data: leads = [], isLoading: loadingLeads } = useQuery({
    queryKey: ['leadExports'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.exportLeadsAsJSON();
    },
    enabled: !!actor && !isFetching,
  });

  const isLoading = loadingApplications || loadingContacts || loadingLeads;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-navy mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's an overview of your security advisory platform.</p>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Advisory Applications"
          value={applications.length}
          icon={<Users className="h-6 w-6" />}
          loading={isLoading}
        />
        <StatCard
          title="Contact Submissions"
          value={contacts.length}
          icon={<Mail className="h-6 w-6" />}
          loading={isLoading}
        />
        <StatCard
          title="Lead Downloads"
          value={leads.length}
          icon={<Download className="h-6 w-6" />}
          loading={isLoading}
        />
      </div>

      {/* Recent Advisory Applications */}
      <div>
        <h2 className="text-2xl font-bold text-navy mb-4">Recent Advisory Applications</h2>
        <Card>
          <CardContent className="pt-6">
            {applications.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No applications yet</p>
            ) : (
              <div className="space-y-4">
                {applications.slice(0, 10).map((app) => (
                  <div key={Number(app.id)} className="flex items-center justify-between border-b pb-4 last:border-b-0">
                    <div className="flex-1">
                      <p className="font-semibold text-navy">{app.fullName}</p>
                      <p className="text-sm text-gray-600">{app.companyName} • {app.industry}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {app.workEmail} • {app.fundingStage} • {app.primaryConcern}
                      </p>
                    </div>
                    <div className="text-right ml-4">
                      <p className="text-sm text-gray-500">{new Date(Number(app.submittedAt) / 1000000).toLocaleDateString()}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        app.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {app.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Contact Submissions */}
      <div>
        <h2 className="text-2xl font-bold text-navy mb-4">Recent Contact Submissions</h2>
        <Card>
          <CardContent className="pt-6">
            {contacts.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No contact submissions yet</p>
            ) : (
              <div className="space-y-4">
                {contacts.slice(0, 5).map((contact) => (
                  <div key={Number(contact.id)} className="flex items-center justify-between border-b pb-4 last:border-b-0">
                    <div className="flex-1">
                      <p className="font-semibold text-navy">{contact.name}</p>
                      <p className="text-sm text-gray-600">{contact.company}</p>
                      <p className="text-xs text-gray-500 mt-1">{contact.email}</p>
                      <p className="text-sm text-gray-700 mt-2">{contact.message}</p>
                    </div>
                    <div className="text-right ml-4">
                      <p className="text-sm text-gray-500">{new Date(Number(contact.timestamp) / 1000000).toLocaleDateString()}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        contact.status === 'new' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {contact.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Lead Downloads Summary */}
      <div>
        <h2 className="text-2xl font-bold text-navy mb-4">Lead Downloads Summary</h2>
        <Card>
          <CardContent className="pt-6">
            {leads.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No lead downloads yet</p>
            ) : (
              <div className="space-y-4">
                {leads.slice(0, 5).map((lead, index) => (
                  <div key={index} className="flex items-center justify-between border-b pb-4 last:border-b-0">
                    <div className="flex-1">
                      <p className="font-semibold text-navy">{lead.name || 'Anonymous'}</p>
                      <p className="text-sm text-gray-600">{lead.email}</p>
                      <p className="text-xs text-gray-500 mt-1">Source: {lead.source}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {lead.tags.map((tag, tagIndex) => (
                          <span key={tagIndex} className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <p className="text-sm text-gray-500">{new Date(Number(lead.timestamp) / 1000000).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
