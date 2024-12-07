import React from 'react';
import { Calendar } from 'lucide-react';
import './Blog.css';
const blogs = [
  {
    id: 1,
    title: 'The Future of Sustainable Farming',
    excerpt: 'Discover how modern farming techniques are helping create a more sustainable future...',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    date: '2024-03-15',
    author: 'John Smith',
  },
  {
    id: 2,
    title: 'Organic Farming Success Stories',
    excerpt: 'Learn from farmers who have successfully transitioned to organic farming methods...',
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    date: '2024-03-10',
    author: 'Maria Garcia',
  },
  {
    id: 3,
    title: 'Innovation in Agriculture',
    excerpt: 'Exploring the latest technological advancements in farming and agriculture...',
    image: 'https://images.unsplash.com/photo-1589923158776-cb4485d99fd6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    date: '2024-03-05',
    author: 'David Chen',
  },
];

export default function Blog() {
  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">Latest from Our Blog</h1>
          <p className="mt-4 text-xl text-gray-600">Stories and insights from the farming community</p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((post) => (
            <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Image with a fixed height and width */}
              <div className="w-full h-48">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content Section */}
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-2" />
                  {new Date(post.date).toLocaleDateString()}
                </div>
                <h2 className="mt-2 text-xl font-semibold text-gray-900">{post.title}</h2>
                <p className="mt-3 text-gray-600">{post.excerpt}</p>
                <div className="mt-4">
                  <span className="text-sm font-medium text-gray-900">By {post.author}</span>
                </div>
                <button className="mt-4 text-green-600 hover:text-green-700 font-medium">
                  Read More →
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
