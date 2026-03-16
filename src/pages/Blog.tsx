import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";

const blogPosts = [
  { id: 1, title: "10 Essential Back-to-School Supplies for 2024", excerpt: "Make sure your child is prepared with these must-have items for the new school year.", date: "2024-01-15", category: "School Tips", image: "fa-backpack" },
  { id: 2, title: "How to Choose the Right Mathematical Set", excerpt: "A complete guide to selecting quality mathematical instruments for secondary school students.", date: "2024-01-10", category: "Buying Guides", image: "fa-compass-drafting" },
  { id: 3, title: "Creative Art Projects for Primary School Students", excerpt: "Fun and educational art activities using affordable materials from our store.", date: "2024-01-05", category: "Education", image: "fa-palette" },
  { id: 4, title: "Organizing Your Study Space on a Budget", excerpt: "Tips for creating an effective study environment with affordable stationery and supplies.", date: "2023-12-28", category: "Study Tips", image: "fa-desk" },
];

const Blog = () => (
  <Layout>
    <div className="bg-surface py-16">
      <div className="container mx-auto text-center">
        <span className="handwritten text-2xl">Learn & Grow</span>
        <h1 className="font-display text-4xl md:text-5xl font-bold mt-2">Our Blog</h1>
        <p className="text-muted-foreground mt-2">Tips, guides, and news for students & educators</p>
      </div>
    </div>
    <div className="container mx-auto py-12">
      <div className="grid md:grid-cols-2 gap-6">
        {blogPosts.map((post) => (
          <Link key={post.id} to={`/blog/${post.id}`} className="bg-card rounded-xl shadow-card overflow-hidden hover:shadow-card-hover transition-all group">
            <div className="h-48 bg-accent/10 flex items-center justify-center">
              <i className={`fa-solid ${post.image} text-accent text-5xl group-hover:scale-110 transition-transform`} />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="px-2.5 py-1 rounded-lg bg-accent/10 text-accent text-xs font-semibold">{post.category}</span>
                <span className="text-xs text-muted-foreground">{new Date(post.date).toLocaleDateString()}</span>
              </div>
              <h2 className="font-display text-xl font-bold mb-2 group-hover:text-accent transition-colors">{post.title}</h2>
              <p className="text-sm text-muted-foreground">{post.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </Layout>
);

export default Blog;
