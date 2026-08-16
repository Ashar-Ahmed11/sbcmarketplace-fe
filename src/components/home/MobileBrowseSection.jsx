import { Link } from 'react-router-dom';

function TruckIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 64 64">
      <path d="M7 36h34l7-10h8l5 10v10h-4a6 6 0 0 0-12 0H25a6 6 0 0 0-12 0H7V36Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
      <path d="M41 36V20H17v16" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
      <circle cx="19" cy="50" r="6" fill="none" stroke="currentColor" strokeWidth="3" />
      <circle cx="51" cy="50" r="6" fill="none" stroke="currentColor" strokeWidth="3" />
    </svg>
  );
}

function MaterialIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 64 64">
      <path d="M12 45h40v7H12zM16 31h32v10H16zM21 16h22v10H21z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
      <path d="M28 16V9h8v7M24 31v-5h16v5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
    </svg>
  );
}

function PartsIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 64 64">
      <path d="M36 10a8 8 0 0 1 10 10l8 8-8 8-4-4-6 6 4 4-8 8-8-8 4-4-6-6-4 4-8-8 8-8a8 8 0 0 1 10-10l4 4 6-6-4-4Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
      <circle cx="32" cy="32" r="5" fill="none" stroke="currentColor" strokeWidth="3" />
    </svg>
  );
}

function ServicesIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 64 64">
      <path d="M11 46h42M17 46V24l15-9 15 9v22M25 46V33h14v13" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
      <path d="M28 25h8M28 29h8" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="3" />
    </svg>
  );
}

function RepairIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 64 64">
      <path d="m20 14 8 8-6 6-8-8a9 9 0 0 1 1-12l3 6 6-1Zm24 16 8 8-22 22H18V48l22-22Zm-9 7 8 8" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
    </svg>
  );
}

function InspectionIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 64 64">
      <path d="M27 12h22v30H27zM19 18h8M19 28h8M19 38h8M33 20h10M33 28h10M33 36h6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
      <circle cx="45" cy="45" r="8" fill="none" stroke="currentColor" strokeWidth="3" />
      <path d="m51 51 6 6" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="3" />
    </svg>
  );
}

function RentalIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 64 64">
      <path d="M10 43h35l5-8h7l4 8v8h-4a5 5 0 0 0-10 0H24a5 5 0 0 0-10 0h-4V43Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
      <path d="M18 43V26h18" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
      <circle cx="19" cy="51" r="5" fill="none" stroke="currentColor" strokeWidth="3" />
      <circle cx="52" cy="51" r="5" fill="none" stroke="currentColor" strokeWidth="3" />
      <path d="M40 14v12M34 20h12" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="3" />
    </svg>
  );
}

function FinanceIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 64 64">
      <rect x="10" y="18" width="44" height="28" rx="4" fill="none" stroke="currentColor" strokeWidth="3" />
      <path d="M18 28h28M18 36h12M43 33c0 2.761-2.239 5-5 5s-5-2.239-5-5 2.239-5 5-5 5 2.239 5 5Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
      <path d="M24 14v8M40 14v8" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="3" />
    </svg>
  );
}

const browseCards = [
  { label: 'Truck', to: '/marketplace/trucks', Icon: TruckIcon },
  { label: 'Material', to: '/marketplace/construction-material', Icon: MaterialIcon },
  { label: 'Parts', to: '/marketplace/spare-parts', Icon: PartsIcon },
  { label: 'Services', to: '/services/construction-services', Icon: ServicesIcon },
  { label: 'Repair', to: '/services/repair-services', Icon: RepairIcon },
  { label: 'Inspection', to: '/services/inspection-services', Icon: InspectionIcon },
  { label: 'Rental', to: '/rentals/rental-trucks', Icon: RentalIcon },
  { label: 'Finance', to: '/user-dashboard/finance', Icon: FinanceIcon },
];

function MobileBrowseSection() {
  return (
    <section className="bg-white mb-5 mobile-browse-section d-lg-none">
      <div className="container-xl">
        <div>
          <div className="mobile-browse-section__head">
            <h2 className='display-3 fw-bold'>Browse SBC Marketplace</h2>
            <p>Explore every major category in one place.</p>
          </div>

          <div className="mobile-browse-section__tabs" role="tablist" aria-label="Browse options">
            <button className="active" type="button">All Categories</button>
            {/* <button type="button">Popular</button>
            <button type="button">Services</button>
            <button type="button">Cities</button> */}
          </div>

          <div className="row g-2">
            {browseCards.map(({ label, to, Icon }) => (
              <div className="col-3" key={label}>
                <Link className="mobile-browse-card" to={to}>
                  <span className="mobile-browse-card__icon">
                    <Icon />
                  </span>
                  <strong>{label}</strong>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default MobileBrowseSection;
