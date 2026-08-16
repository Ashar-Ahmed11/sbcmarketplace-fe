import { Link } from 'react-router-dom';
import './requirements.css';

const requirementCards = [
  {
    title: 'Truck',
    text: 'Buy new or used trucks by category, budget and delivery preference.',
    icon: 'fa fa-truck',
    to: '/post-a-requirement/trucks',
  },
  {
    title: 'Construction Machinery',
    text: 'Share your machinery requirement and let matching suppliers respond.',
    icon: 'fa fa-industry',
    to: '/post-a-requirement/construction-machinery',
  },
  {
    title: 'Construction Material',
    text: 'Post your material requirement and receive verified seller matches.',
    icon: 'fa fa-cubes',
    to: '/post-a-requirement/construction-material',
  },
  {
    title: 'Spare Part',
    text: 'Request spare parts and match with the right vendors quickly.',
    icon: 'fa fa-cog',
    to: '/post-a-requirement/spare-parts',
  },
];

function PostRequirementPage() {
  return (
    <main className="requirement-page">
      <div className="container-xl requirement-shell">
        

        <div className="requirement-content">
          <div className="requirement-breadcrumb">SBC / <strong>Post a Requirement</strong></div>

          <section className="requirement-hero">
            <div className="requirement-hero__eyebrow">Smart Matching</div>
            <h1 className="requirement-hero__title">Tell us what you need — we&apos;ll find who can supply it.</h1>
            <p className="requirement-hero__text">
              Post one requirement and every matching seller on SBC gets notified. No need to search listing by listing.
            </p>
          </section>

          <section className="requirement-steps">
            {[
              ['01', 'Describe your requirement'],
              ['02', 'SBC matches you to verified providers'],
              ['03', 'Negotiate safely with matching sellers'],
              ['04', 'Move to agreement once your offer is accepted'],
            ].map(([number, text]) => (
              <div className="requirement-step" key={number}>
                <span className="requirement-step__number">{number}</span>
                <span className="requirement-step__text">{text}</span>
              </div>
            ))}
          </section>

          <section className="requirement-card-grid">
            {requirementCards.map((card) => {
              const className = `requirement-card${card.disabled ? ' requirement-card--disabled' : ''}`;
              const content = (
                <>
                  <i aria-hidden="true" className={`requirement-card__icon ${card.icon}`} />
                  <h2 className="requirement-card__title">{card.title}</h2>
                  <p className="requirement-card__text">{card.text}</p>
                  {card.disabled ? <span className="requirement-card__badge">Soon</span> : null}
                  <span className="requirement-card__arrow">→</span>
                </>
              );

              return card.disabled ? (
                <div className={className} key={card.title}>
                  {content}
                </div>
              ) : (
                <Link className={className} key={card.title} to={card.to}>
                  {content}
                </Link>
              );
            })}
          </section>
        </div>
      </div>
    </main>
  );
}

export default PostRequirementPage;
