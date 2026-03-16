import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";

const posts: Record<string, { title: string; content: string; date: string; category: string }> = {
  "1": { title: "10 Essential Back-to-School Supplies for 2024", date: "2024-01-15", category: "School Tips",
    content: "Getting ready for a new school year is exciting! Here are the top 10 items every student needs:\n\n1. **Exercise Books** - The foundation of note-taking\n2. **HB Pencils** - A must for writing and sketching\n3. **Blue Pens** - For clean, professional work\n4. **Eraser** - Everyone makes mistakes!\n5. **Sharpener** - Keep those pencils sharp\n6. **Ruler** - Essential for neat lines and measurements\n7. **Mathematical Set** - For geometry and technical drawing\n8. **Crayons or Colored Pencils** - For art and creative subjects\n9. **Glue Stick** - For projects and assignments\n10. **Manila Paper** - For charts and presentations\n\nAt JSEdumart, we have all these items at student-friendly prices. Shop our complete back-to-school collection today!" },
  "2": { title: "How to Choose the Right Mathematical Set", date: "2024-01-10", category: "Buying Guides",
    content: "A good mathematical set is crucial for secondary school students. Here's what to look for:\n\n**Brand Matters**: The Helix Oxford Mathematical Set is the gold standard in Kenya. It includes a compass, protractor, set squares, and more.\n\n**Check the Contents**: A complete set should include a compass, protractor, 30° and 45° set squares, a ruler, an eraser, and a sharpener.\n\n**Durability**: Metal compasses last longer than plastic ones. Look for sets with a sturdy case.\n\n**Price vs Quality**: Don't go for the cheapest option. A K-350 Helix Oxford set will last the entire school year, while cheaper alternatives might break within weeks.\n\nVisit JSEdumart to browse our range of mathematical sets!" },
  "3": { title: "Creative Art Projects for Primary School Students", date: "2024-01-05", category: "Education",
    content: "Art is a wonderful way for children to express themselves. Here are some fun projects:\n\n1. **Watercolor Landscapes** - Use our Water Colour sets to paint beautiful scenery\n2. **Crayon Resist Art** - Draw with crayons, then paint over with watercolors\n3. **Manila Paper Collages** - Cut and paste colorful manila paper into creative designs\n4. **Pencil Sketching** - Practice drawing with HB pencils\n\nAll materials are available at JSEdumart at affordable prices!" },
  "4": { title: "Organizing Your Study Space on a Budget", date: "2023-12-28", category: "Study Tips",
    content: "A well-organized study space can boost your productivity. Here are budget-friendly tips:\n\n1. **Use Spring Files** - Organize notes by subject (KSh 50 each at JSEdumart)\n2. **Label Everything** - Use luminous paper for eye-catching labels\n3. **Keep Supplies in a Pencil Case** - Reduces clutter\n4. **Create a Schedule** - Pin it on your wall using cellotape\n\nShop affordable organizational supplies at JSEdumart!" },
};

const BlogPost = () => {
  const { id } = useParams();
  const post = posts[id || ""];

  if (!post) {
    return <Layout><div className="container mx-auto py-20 text-center"><h1 className="font-display text-2xl font-bold">Post not found</h1><Link to="/blog" className="text-accent hover:underline mt-4 inline-block">Back to Blog</Link></div></Layout>;
  }

  return (
    <Layout>
      <article className="container mx-auto py-12 max-w-3xl">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-accent"><i className="fa-solid fa-house" /></Link>
          <i className="fa-solid fa-chevron-right text-xs" />
          <Link to="/blog" className="hover:text-accent">Blog</Link>
          <i className="fa-solid fa-chevron-right text-xs" />
          <span className="text-foreground truncate">{post.title}</span>
        </nav>
        <span className="px-3 py-1 rounded-lg bg-accent/10 text-accent text-sm font-semibold">{post.category}</span>
        <h1 className="font-display text-3xl md:text-4xl font-bold mt-4 mb-3">{post.title}</h1>
        <p className="text-muted-foreground text-sm mb-8"><i className="fa-solid fa-calendar mr-1" />{new Date(post.date).toLocaleDateString()}</p>
        <div className="prose prose-slate max-w-none">
          {post.content.split("\n\n").map((para, i) => (
            <p key={i} className="text-muted-foreground leading-relaxed mb-4">{para}</p>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-border">
          <Link to="/blog" className="inline-flex items-center gap-2 text-accent font-medium hover:underline">
            <i className="fa-solid fa-arrow-left" /> Back to Blog
          </Link>
        </div>
      </article>
    </Layout>
  );
};

export default BlogPost;
