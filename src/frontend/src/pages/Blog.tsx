import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useGetBlogPosts } from '@/hooks/useQueries';
import { Calendar, User } from 'lucide-react';

export default function Blog() {
  const { data: posts, isLoading } = useGetBlogPosts();

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-600">Loading articles...</p>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-navy mb-4">No Articles Yet</h2>
          <p className="text-gray-600">Check back soon for cybersecurity insights and startup security tips.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 md:py-24">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-navy mb-4 text-center">Blog</h1>
          <p className="text-lg text-gray-600 mb-12 text-center">
            Cybersecurity insights, AI risk management, and compliance guidance for Indian startups.
          </p>

          <div className="space-y-8">
            {posts.map((post) => {
              const postId = post.id.toString();
              return (
                <Link key={postId} to={`/blog/${postId}` as any}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    {post.featuredImage && (
                      <div className="h-48 bg-gray-200 rounded-t-lg overflow-hidden">
                        <img
                          src={post.featuredImage}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {post.author}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(Number(post.publishDate) / 1000000).toLocaleDateString('en-IN')}
                        </div>
                      </div>
                      <CardTitle className="text-navy hover:text-emerald-600 transition-colors">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2">{post.content.substring(0, 150)}...</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
