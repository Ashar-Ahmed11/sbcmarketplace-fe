import { Link } from 'react-router-dom';

function CategoryTable({ categories, basePath, title, subtitle, actionLabel, actionTo }) {
  return (
    <section className="dashboard-section-card">
      <div className="dashboard-section-head">
        <div>
          <h1>{title}</h1>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
        {actionLabel && actionTo ? <Link className="dashboard-action-btn" to={actionTo}>{actionLabel}</Link> : null}
      </div>
      <div className="dashboard-table-wrap">
        <table className="table dashboard-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Subcategories</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {categories.length ? categories.map((category) => (
              <tr key={category._id}>
                <td>{category.name}</td>
                <td className="text-capitalize">{category.categoryType}</td>
                <td><Link className="dashboard-inline-link" to={`${basePath}/view-subcategories/${category._id}`}>View Subcategories</Link></td>
                <td><Link className="dashboard-inline-link" to={`${basePath}/edit-category/${category._id}`}>Edit</Link></td>
              </tr>
            )) : <tr><td colSpan="4" className="text-center py-4">No categories found.</td></tr>}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default CategoryTable;
