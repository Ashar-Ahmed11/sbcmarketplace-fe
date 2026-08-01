function BlogPagination() {
  return (
    <section className="blogs-pagination-section">
      <div className="container-xl">
        <div className="blogs-pagination">
          <button className="active" type="button">1</button>
          <button type="button">2</button>
          <button type="button">3</button>
          <button className="arrow" type="button" aria-label="Next page"><i className="fa fa-long-arrow-right" /></button>
        </div>
      </div>
    </section>
  );
}

export default BlogPagination;
