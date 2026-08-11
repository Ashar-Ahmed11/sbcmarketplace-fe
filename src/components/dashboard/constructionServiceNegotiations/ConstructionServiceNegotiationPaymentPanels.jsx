import { getConstructionServiceNegotiationTotals, getConstructionServiceProgress, getPendingConstructionServiceMilestone } from './constructionServiceNegotiationUtils';

function formatCurrency(value) {
  return `Rs. ${Number(value || 0).toLocaleString()}`;
}

function MilestoneProgressLabels({ milestones = [] }) {
  if (!milestones.length) return null;

  const totalMilestones = milestones.length;
  const completedMilestones = milestones.filter((milestone) => milestone?.isCompleted).length;
  const allCompleted = completedMilestones === totalMilestones;
  const lastCompletedIndex = milestones.reduce((latestIndex, milestone, index) => (
    milestone?.isCompleted ? index : latestIndex
  ), -1);
  const progressWidth = totalMilestones <= 1
    ? (allCompleted ? 100 : 0)
    : allCompleted
      ? 100
      : lastCompletedIndex < 0
        ? 0
        : ((lastCompletedIndex + 0.5) / totalMilestones) * 100;

  return (
    <div className="construction-negotiation-progress-stepper">
      <div
        aria-hidden="true"
        className="construction-negotiation-progress-stepper__fill"
        style={{ width: `${Math.max(0, Math.min(progressWidth, 100))}%` }}
      />
      {milestones.map((milestone, index) => {
        const isCompleted = Boolean(milestone?.isCompleted);
        const isActive = !isCompleted && index === completedMilestones && completedMilestones < totalMilestones;

        return (
          <div className="construction-negotiation-progress-step" key={`progress-label-${index}`}>
            <div
              className={[
                'construction-negotiation-progress-step__node',
                isCompleted ? 'is-completed' : '',
                isActive ? 'is-active' : '',
              ].filter(Boolean).join(' ')}
            >
              {isCompleted ? '✓' : index + 1}
            </div>
            <span className="construction-negotiation-progress-step__label">
              Milestone {index + 1}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function PaymentRow({ label, value }) {
  return (
    <div className="truck-negotiation-payment__row">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function ConstructionServiceNegotiationPaymentPanels({
  acceptedOffer,
  basicInfo,
  currentUserId,
  onOpenAdvanceProof,
  onOpenFinalProof,
  onUpdateMilestone,
  row,
}) {
  if (!acceptedOffer) return null;

  const totals = getConstructionServiceNegotiationTotals(acceptedOffer, basicInfo);
  const pendingMilestone = getPendingConstructionServiceMilestone(acceptedOffer);
  const progress = getConstructionServiceProgress(acceptedOffer);
  const isSeller = String(row?.seller?._id) === String(currentUserId);
  const isBuyer = String(row?.buyer?._id) === String(currentUserId);

  if (row.advanceStatus !== 'paid') {
    return (
      <section className="dashboard-section-card truck-negotiation-payment">
        <div className="truck-negotiation-payment__head">
          <div>
            <h1>Deal Status: Offer Accepted</h1>
            <p>Pay advance fee to move this deal forward.</p>
          </div>
          <span className={`status-badge ${row.advanceStatus}`}>{row.advanceStatus}</span>
        </div>
        <div className="truck-negotiation-payment__card">
          <h2>Pay Advance Fee</h2>
          <PaymentRow label="Construction Service Cost" value={formatCurrency(totals.labourCharges)} />
          <PaymentRow label="Delivery Cost" value={formatCurrency(totals.deliveryCost)} />
          <PaymentRow label={`Advance Fee (${basicInfo.advancePercentage}%)`} value={formatCurrency(totals.advanceFee)} />
          <PaymentRow label={`Platform Fee (${basicInfo.platformFeePercentage}%)`} value={formatCurrency(totals.advancePlatformFee)} />
          <PaymentRow label="Total Amount to be Paid" value={formatCurrency(totals.advanceTotalToPay)} />
          {isBuyer ? (
            <div className="truck-negotiation-payment__actions">
              <button className="dashboard-action-btn" onClick={onOpenAdvanceProof} type="button">Upload Payment Proof</button>
              <button className="dashboard-secondary-btn" type="button">Pay Online</button>
            </div>
          ) : null}
        </div>
      </section>
    );
  }

  if (row.finalPaymentStatus !== 'paid' || (acceptedOffer.milestones?.length && pendingMilestone)) {
    return (
      <section className="dashboard-section-card truck-negotiation-payment">
        <div className="truck-negotiation-payment__head">
          <div>
            <h1>Final Payment</h1>
            <p>Advance fee has been approved. Final payment is now due.</p>
          </div>
          <span className={`status-badge ${row.finalPaymentStatus}`}>{row.finalPaymentStatus}</span>
        </div>

        {acceptedOffer.milestones?.length ? (
          <div className="truck-negotiation-payment__card mb-3">
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
              <h2 className="mb-0">Milestones</h2>
              <span className="construction-negotiation-progress-percent">{progress}% Complete</span>
            </div>
            <MilestoneProgressLabels milestones={acceptedOffer.milestones} />
            <div className="row g-3">
              {acceptedOffer.milestones.map((milestone, index) => (
                <div className="col-12" key={milestone._id}>
                  <div className="construction-negotiation-milestone-card">
                    <div className="construction-negotiation-milestone-card__head">
                      <div>
                        <span className="construction-negotiation-milestone-card__number">Milestone {index + 1}</span>
                        <h3>Project Payment Stage</h3>
                      </div>
                      <span className={`status-badge ${milestone.paymentStatus}`}>{milestone.paymentStatus}</span>
                    </div>

                    <div className="row g-3">
                      <div className="col-lg-3 col-md-6 col-12">
                        <div className="construction-negotiation-milestone-card__meta">
                          <span>Due Date</span>
                          <strong>{milestone.dueDate ? new Date(milestone.dueDate).toLocaleDateString() : '—'}</strong>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-6 col-12">
                        <div className="construction-negotiation-milestone-card__meta">
                          <span>Charges</span>
                          <strong>{formatCurrency(milestone.charges)}</strong>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-6 col-12">
                        <div className="construction-negotiation-milestone-card__meta">
                          <span>Completion Status</span>
                          <strong>{milestone.isCompleted ? 'Completed' : 'Pending'}</strong>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-6 col-12">
                        <div className="construction-negotiation-milestone-card__meta">
                          <span>Payment Status</span>
                          <strong>{milestone.paymentStatus}</strong>
                        </div>
                      </div>
                    </div>

                    {milestone.paymentStatusRejectionReason ? (
                      <div className="construction-negotiation-milestone-card__note">
                        <span>Rejection Reason</span>
                        <strong>{milestone.paymentStatusRejectionReason}</strong>
                      </div>
                    ) : null}

                    {milestone.paymentScreenshots?.length ? (
                      <div className="upload-preview-grid mt-3">
                        {milestone.paymentScreenshots.map((image, imageIndex) => (
                          <div className="upload-preview-card readonly" key={`${image.url}-${imageIndex}`}>
                            <img alt={`Milestone ${index + 1} payment proof`} src={image.url} />
                          </div>
                        ))}
                      </div>
                    ) : null}

                    {isSeller ? (
                      <div className="truck-negotiation-payment__actions">
                        <button className="dashboard-action-btn" onClick={() => onUpdateMilestone(milestone)} type="button">Update</button>
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <div className="truck-negotiation-payment__card">
          <h2>Pay Full Amount</h2>
          <PaymentRow label="Agreed Construction Service Cost" value={formatCurrency(pendingMilestone ? totals.milestoneCharge : totals.labourCharges)} />
          <PaymentRow label="Agreed Total Cost" value={formatCurrency(pendingMilestone ? totals.milestoneCharge : totals.agreedTotal)} />
          {!pendingMilestone ? <PaymentRow label="Advance Fee Paid" value="Yes" /> : null}
          {!pendingMilestone ? <PaymentRow label="Advance Fee Amount" value={formatCurrency(totals.advanceFee)} /> : null}
          <PaymentRow label="Platform Fee" value={formatCurrency(totals.finalPlatformFee)} />
          <PaymentRow label="Amount to be Paid" value={formatCurrency(totals.finalAmountToPay)} />
          {isBuyer ? (
            <div className="truck-negotiation-payment__actions">
              <button className="dashboard-action-btn" onClick={onOpenFinalProof} type="button">Upload Payment Proof</button>
              <button className="dashboard-secondary-btn" type="button">Pay Online</button>
            </div>
          ) : null}
        </div>
      </section>
    );
  }

  return (
    <section className="dashboard-section-card truck-negotiation-payment">
      <div className="truck-negotiation-payment__head">
        <div>
          <h1>Negotiation Successful</h1>
          <p>Final payment has been approved and the purchase order is now available.</p>
        </div>
        <span className="status-badge approved">paid</span>
      </div>
    </section>
  );
}

export default ConstructionServiceNegotiationPaymentPanels;
