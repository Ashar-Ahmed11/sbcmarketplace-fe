const safetyItems = [
  {
    title: 'Only Verified Listings',
    text: 'Every machine, contractor, and supplier is admin-reviewed before it goes live filter by category, city and budget with confidence.',
  },
  {
    title: 'Never Get Lowballed or Scammed',
    text: 'All bargaining happens through structured offers no phone numbers, no pressure tactics, no fake sellers. Identities stay hidden until the deal closes.',
  },
  {
    title: 'Your Money Is Protected',
    text: 'An admin-held advance payment locks the deal for both sides before anything changes hands to uplift trust on your end.',
  },
  {
    title: 'Walk Away With a Real Contract',
    text: 'A binding agreement is generated automatically the moment payment clears, not a WhatsApp promise.',
  },
];

function MarketplaceSafety() {
  return (
    <section className="marketplace-safety">
      <div className="container-xl marketplace-safety-grid">
        <div className="marketplace-safety-panel">
          <h2>Buying heavy machinery shouldn&apos;t feel risky. Here&apos;s how SBC keeps every deal safe.</h2>
          <p>Same protection on every deal: Equipment Sale, Rental, Financing, Contractors, Materials &amp; Spare Parts.</p>
        </div>
        <div className="marketplace-safety-list">
          {safetyItems.map((item) => (
            <article className="marketplace-safety-card" key={item.title}>
              <span><i className="fa fa-shield" aria-hidden="true" /></span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default MarketplaceSafety;
