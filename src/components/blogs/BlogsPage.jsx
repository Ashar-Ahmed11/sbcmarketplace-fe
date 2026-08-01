import BlogsHero from './BlogsHero';
import BlogGrid from './BlogGrid';
import BlogPagination from './BlogPagination';

function BlogsPage() {
  return (
    <main className="blogs-page">
      <BlogsHero />
      <BlogGrid />
      <BlogPagination />
    </main>
  );
}

export default BlogsPage;
