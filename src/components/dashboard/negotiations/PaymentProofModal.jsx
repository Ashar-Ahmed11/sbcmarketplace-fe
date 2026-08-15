import { useEffect, useRef, useState } from 'react';

const EMPTY_IMAGES = [];

function PaymentProofModal({ existingImages, open, onClose, onSubmit, title, uploadImage }) {
  const [images, setImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  const normalizedExistingImages = existingImages || EMPTY_IMAGES;

  useEffect(() => {
    if (open) {
      setImages(normalizedExistingImages);
    } else {
      setImages([]);
    }
  }, [normalizedExistingImages, open]);

  if (!open) return null;

  const onFileChange = async (event) => {
    const files = Array.from(event.target.files || []);
    setIsUploading(true);
    try {
      const uploaded = await Promise.all(files.map(async (file) => ({ url: await uploadImage(file) })));
      setImages((current) => [...current, ...uploaded]);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="dashboard-modal-backdrop">
      <div className="dashboard-modal truck-negotiation-proof-modal">
        <h2>{title}</h2>
        <p>Upload payment proof screenshots before submitting for admin approval.</p>
        <div className="dashboard-upload-block mt-3">
          <div className="dashboard-upload-head">
            <div>
              <h2>Payment Proof</h2>
            </div>
            <div className="dashboard-upload-actions">
              <button className="dashboard-secondary-btn" onClick={() => fileInputRef.current?.click()} type="button">Upload Image</button>
              <button className="dashboard-secondary-btn" onClick={() => setImages([])} type="button">Remove Images</button>
            </div>
            <input className="d-none" multiple onChange={onFileChange} ref={fileInputRef} type="file" />
          </div>
          <div className="upload-preview-grid">
            {images.map((image, index) => (
              <div className="upload-preview-card" key={`${image.url}-${index}`}>
                <img alt="Payment proof" src={image.url} />
                <button onClick={() => setImages((current) => current.filter((_, itemIndex) => itemIndex !== index))} type="button">×</button>
              </div>
            ))}
          </div>
        </div>
        <div className="dashboard-form-actions mt-3">
          <button className="dashboard-secondary-btn" onClick={() => { setImages([]); onClose(); }} type="button">Cancel</button>
          <button className="dashboard-action-btn" disabled={!images.length || isUploading} onClick={() => { onSubmit(images); setImages([]); }} type="button">
            {isUploading ? 'Uploading...' : 'Submit'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentProofModal;
