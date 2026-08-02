function TruckDetailsPerformance({ truck }) {
  const metricCards = [
    { value: truck?.engineTransmission?.engineHorsepower ? `${truck.engineTransmission.engineHorsepower} HP` : '70 HP', label: 'ENGINE POWER' },
    { value: truck?.capacity?.grossVehicleWeight ? `${truck.capacity.grossVehicleWeight} Tons` : '7.2 Tons', label: 'OPERATING WEIGHT' },
    { value: truck?.capacity?.bodyCapacity ? `${truck.capacity.bodyCapacity} m³` : '1.3 m³', label: 'BUCKET CAPACITY' },
  ];

  return (
    <section className="truck-figma-performance-card">
      <h3>Industrial Performance</h3>
      <p>
        {truck?.description || 'The Komatsu WA100M-8 is a powerhouse for versatile applications. From landscaping to heavy construction sites, its hydrostatic drive and powerful engine ensure smooth operation. This specific unit features a reinforced loader arm and cabin air conditioning, ideal for long shifts in varied climates.'}
      </p>
      <div className="truck-figma-metrics">
        {metricCards.map((card) => (
          <div className="truck-figma-metric" key={card.label}>
            <strong>{card.value}</strong>
            <span>{card.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TruckDetailsPerformance;
