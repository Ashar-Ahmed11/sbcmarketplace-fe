import equipmentExcavator from '../../assets/figma/equipment-excavator.jpg';
import equipmentForklift from '../../assets/figma/equipment-forklift.jpg';
import equipmentLoader from '../../assets/figma/equipment-loader.png';

const posts = [
  { category: 'CONSTRUCTION', image: equipmentExcavator },
  { category: 'INSIGHTS', image: equipmentForklift },
  { category: 'EQUIPMENT', image: equipmentLoader },
  { category: 'CONSTRUCTION', image: equipmentLoader },
  { category: 'INSIGHTS', image: equipmentExcavator },
  { category: 'EQUIPMENT', image: equipmentForklift },
  { category: 'CONSTRUCTIONS', image: equipmentForklift },
  { category: 'INSIGHTS', image: equipmentLoader },
  { category: 'EQUIPMENT', image: equipmentExcavator },
];

function BlogGrid() {
  return (
    <section className="blogs-grid-section">
      <div className="container-xl blogs-grid">
        {posts.map((post, index) => (
          <article className="blog-card" key={`${post.category}-${index}`}>
            <div className="blog-card-image">
              <img src={post.image} alt={post.category} />
              <span>{post.category}</span>
            </div>
            <div className="blog-card-copy">
              <div className="blog-card-meta">
                <span>September 23</span>
                <i className="fa fa-minus" aria-hidden="true" />
                <a href="#top">By SBC Admin</a>
              </div>
              <h2>Generator Components Which You Should Know</h2>
              <p>Magna aliqua umt enimd mini venia quis ulamco aliquip commodo cons equat duis aute irue derit...</p>
            </div>
            <a className="blog-card-link" href="#top">Read More <i className="fa fa-long-arrow-right" aria-hidden="true" /></a>
          </article>
        ))}
      </div>
    </section>
  );
}

export default BlogGrid;
