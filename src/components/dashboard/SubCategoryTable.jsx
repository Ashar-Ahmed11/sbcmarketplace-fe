import { Link } from 'react-router-dom';

function SubCategoryTable({ items, createTo, editBasePath, title, subtitle }) {
  return (
    <section className="dashboard-section-card">
      <div className="dashboard-section-head">
        <div>
          <h1>{title}</h1>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
        <Link className="dashboard-action-btn" to={createTo}>Create Subcategory</Link>
      </div>
      <div className="dashboard-table-wrap">
        <table className="table dashboard-table">
          <thead><tr><th>Name</th><th>Action</th></tr></thead>
          <tbody>
            {items.length ? items.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td><Link className="dashboard-inline-link" to={`${editBasePath}/${item._id}`}>Edit</Link></td>
              </tr>
            )) : <tr><td colSpan="2" className="text-center py-4">No subcategories found.</td></tr>}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default SubCategoryTable;
