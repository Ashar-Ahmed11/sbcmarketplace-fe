import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AppContext from '../../context/appContext';
import ConstructionServiceNegotiationConversation from '../constructionServiceNegotiations/ConstructionServiceNegotiationConversation';
import ConstructionServicePurchaseOrder from '../constructionServiceNegotiations/ConstructionServicePurchaseOrder';
import { getAcceptedConstructionServiceOffer, shouldShowConstructionServicePurchaseOrder } from '../constructionServiceNegotiations/constructionServiceNegotiationUtils';

function AdminConstructionServiceNegotiationDetailPage() {
  const { constructionServiceNegotiationId } = useParams();
  const { basicInfo, getBasicInfo, getConstructionServiceNegotiationById, updateConstructionServiceNegotiationStatus } = useContext(AppContext);
  const [row, setRow] = useState(null);

  useEffect(() => {
    getBasicInfo();
    getConstructionServiceNegotiationById(constructionServiceNegotiationId).then(setRow);
  }, [getBasicInfo, getConstructionServiceNegotiationById, constructionServiceNegotiationId]);

  if (!row) return null;
  const acceptedOffer = getAcceptedConstructionServiceOffer(row);
  const canShowPurchaseOrder = shouldShowConstructionServicePurchaseOrder(row, acceptedOffer);

  return (
    <section className="dashboard-section-card form-card-panel">
      <div className="dashboard-section-head">
        <div>
          <h1>Negotiation Detail</h1>
          <p>{row.constructionService?.title || 'Construction service negotiation'}</p>
        </div>
      </div>
      <div className="truck-figma-details-stack mb-4">
        <section className="truck-figma-specs-card truck-figma-specs-card--compact">
          <h3>Negotiation Summary</h3>
          <div className="truck-figma-specs-table">
            <div className="truck-figma-specs-row">
              <div className="truck-figma-specs-cell"><span>Buyer</span><strong>{row.buyer?.fullName || row.buyer?.username || '—'}</strong></div>
              <div className="truck-figma-specs-cell"><span>Seller</span><strong>{row.seller?.fullName || row.seller?.username || '—'}</strong></div>
            </div>
            <div className="truck-figma-specs-row alt">
              <div className="truck-figma-specs-cell"><span>Buyer City</span><strong>{row.buyerCity || '—'}</strong></div>
              <div className="truck-figma-specs-cell"><span>Purchase Order Date</span><strong>{row.purhcaseOrderDate ? new Date(row.purhcaseOrderDate).toLocaleDateString() : '—'}</strong></div>
            </div>
            <div className="truck-figma-specs-row full">
              <div className="truck-figma-specs-cell"><span>Description</span><strong>{row.constructionServiceDescription || '—'}</strong></div>
            </div>
          </div>
        </section>

        <section className="truck-figma-specs-card truck-figma-specs-card--compact">
          <div className="dashboard-section-head mb-0">
            <div><h3>Conversation</h3></div>
            <button className="dashboard-action-btn" data-bs-target="#adminConstructionServiceNegotiationConversation" data-bs-toggle="collapse" type="button">View Conversation</button>
          </div>
          <div className="collapse mt-3" id="adminConstructionServiceNegotiationConversation">
            <ConstructionServiceNegotiationConversation
              currentUserId={row.seller?._id}
              onAccept={() => {}}
              onOpenCounterOffer={() => {}}
              row={row}
              showActionButtons={false}
              showCounterButton={false}
              title="Construction Service Negotiation Conversation"
            />
          </div>
        </section>

        {acceptedOffer?.milestones?.length ? (
          <section className="truck-figma-specs-card truck-figma-specs-card--compact">
            <div className="dashboard-section-head mb-0">
              <div><h3>Milestones</h3></div>
              <button className="dashboard-action-btn" data-bs-target="#adminConstructionServiceNegotiationMilestones" data-bs-toggle="collapse" type="button">View Milestones</button>
            </div>
            <div className="collapse mt-3" id="adminConstructionServiceNegotiationMilestones">
              <div className="row g-3">
                {acceptedOffer.milestones.map((milestone, index) => (
                  <div className="col-12" key={milestone._id}>
                    <div className="construction-negotiation-milestone-card">
                      <div className="construction-negotiation-milestone-card__head">
                        <div>
                          <span className="construction-negotiation-milestone-card__number">Milestone {index + 1}</span>
                          <h3>Payment Review</h3>
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
                            <strong>{`Rs. ${Number(milestone.charges || 0).toLocaleString()}`}</strong>
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-12">
                          <div className="construction-negotiation-milestone-card__meta">
                            <span>Completion</span>
                            <strong>{milestone.isCompleted ? 'Completed' : 'Pending'}</strong>
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-12">
                          <div className="construction-negotiation-milestone-card__meta">
                            <span>Completed On</span>
                            <strong>{milestone.dateOfCompletion ? new Date(milestone.dateOfCompletion).toLocaleDateString() : '—'}</strong>
                          </div>
                        </div>
                        {milestone.paymentScreenshots?.length ? (
                          <div className="col-12">
                            <div className="upload-preview-grid">
                              {milestone.paymentScreenshots.map((image, imageIndex) => (
                                <div className="upload-preview-card readonly" key={`${image.url}-${imageIndex}`}>
                                  <img alt={`Milestone ${index + 1} payment proof`} src={image.url} />
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : null}
                        <div className="form-field col-md-6 col-12">
                          <label>Payment Status</label>
                          <select
                            onChange={(event) => setRow((current) => ({
                              ...current,
                              negotiation: current.negotiation.map((entry) => (entry.accepted ? {
                                ...entry,
                                milestones: entry.milestones.map((item) => (
                                  String(item._id) === String(milestone._id)
                                    ? { ...item, paymentStatus: event.target.value }
                                    : item
                                )),
                              } : entry)),
                            }))}
                            value={milestone.paymentStatus || 'unpaid'}
                          >
                            <option value="unpaid">Unpaid</option>
                            <option value="pendingApproval">Pending Approval</option>
                            <option value="paid">Paid</option>
                          </select>
                        </div>
                        <div className="form-field col-md-6 col-12">
                          <label>Rejection Reason</label>
                          <input
                            onChange={(event) => setRow((current) => ({
                              ...current,
                              negotiation: current.negotiation.map((entry) => (entry.accepted ? {
                                ...entry,
                                milestones: entry.milestones.map((item) => (
                                  String(item._id) === String(milestone._id)
                                    ? { ...item, paymentStatusRejectionReason: event.target.value }
                                    : item
                                )),
                              } : entry)),
                            }))}
                            type="text"
                            value={milestone.paymentStatusRejectionReason || ''}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {row.advancePaymentScreenshots?.length ? (
          <section className="truck-figma-specs-card truck-figma-specs-card--compact">
            <h3>Advance Payment Proof</h3>
            <div className="upload-preview-grid">
              {row.advancePaymentScreenshots.map((image, index) => (
                <div className="upload-preview-card readonly" key={`${image.url}-${index}`}>
                  <img alt="Advance payment proof" src={image.url} />
                </div>
              ))}
            </div>
            <div className="dashboard-form-grid mt-3">
              <div className="form-field">
                <label>Advance Status</label>
                <select onChange={(event) => setRow((current) => ({ ...current, advanceStatus: event.target.value }))} value={row.advanceStatus}>
                  <option value="unpaid">Unpaid</option>
                  <option value="pendingApproval">Pending Approval</option>
                  <option value="paid">Paid</option>
                </select>
              </div>
              <div className="form-field">
                <label>Advance Rejection Reason</label>
                <input onChange={(event) => setRow((current) => ({ ...current, advanceStatusRejectionReason: event.target.value }))} type="text" value={row.advanceStatusRejectionReason || ''} />
              </div>
            </div>
          </section>
        ) : null}

        {row.finalPaymentScreenshots?.length ? (
          <section className="truck-figma-specs-card truck-figma-specs-card--compact">
            <h3>Final Payment Proof</h3>
            <div className="upload-preview-grid">
              {row.finalPaymentScreenshots.map((image, index) => (
                <div className="upload-preview-card readonly" key={`${image.url}-${index}`}>
                  <img alt="Final payment proof" src={image.url} />
                </div>
              ))}
            </div>
            <div className="dashboard-form-grid mt-3">
              <div className="form-field">
                <label>Final Payment Status</label>
                <select onChange={(event) => setRow((current) => ({ ...current, finalPaymentStatus: event.target.value }))} value={row.finalPaymentStatus}>
                  <option value="unpaid">Unpaid</option>
                  <option value="pendingApproval">Pending Approval</option>
                  <option value="paid">Paid</option>
                </select>
              </div>
              <div className="form-field">
                <label>Final Rejection Reason</label>
                <input onChange={(event) => setRow((current) => ({ ...current, finalPaymentStatusRejectionReason: event.target.value }))} type="text" value={row.finalPaymentStatusRejectionReason || ''} />
              </div>
            </div>
          </section>
        ) : null}

        {acceptedOffer && canShowPurchaseOrder ? <ConstructionServicePurchaseOrder basicInfo={basicInfo} row={row} /> : null}
      </div>
      <div className="dashboard-form-actions">
        <button className="dashboard-action-btn" onClick={async () => setRow(await updateConstructionServiceNegotiationStatus(constructionServiceNegotiationId, {
          advanceStatus: row.advanceStatus,
          finalPaymentStatus: row.finalPaymentStatus,
          advanceStatusRejectionReason: row.advanceStatusRejectionReason || '',
          finalPaymentStatusRejectionReason: row.finalPaymentStatusRejectionReason || '',
          milestones: (row.negotiation || [])
            .find((item) => item.accepted)
            ?.milestones?.map((milestone) => ({
              milestoneId: milestone._id,
              paymentStatus: milestone.paymentStatus || 'unpaid',
              paymentStatusRejectionReason: milestone.paymentStatusRejectionReason || '',
            })) || [],
        }))} type="button">Update</button>
      </div>
    </section>
  );
}

export default AdminConstructionServiceNegotiationDetailPage;
