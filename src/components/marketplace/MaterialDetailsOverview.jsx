import { useState } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import TruckDetailsSidebarCards from './TruckDetailsSidebarCards';
import MaterialDetailsInfoSections from './MaterialDetailsInfoSections';
import MaterialDetailsSpecsCard from './MaterialDetailsSpecsCard';
import SliderMutationPlugin from './sliderMutationPlugin';
import SliderResizePlugin from './sliderResizePlugin';
import SliderThumbnailPlugin from './sliderThumbnailPlugin';

function MaterialDetailsOverview({ material }) {
  const galleryItems = [...(material?.images || [])].filter((item) => item?.url);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider({ initial: 0 }, [SliderResizePlugin]);
  const [thumbnailRef] = useKeenSlider({
    initial: 0,
    slides: { origin: 'center', perView: 4, spacing: 10 },
  }, [SliderThumbnailPlugin(instanceRef), SliderResizePlugin, SliderMutationPlugin]);

  return (
    <section className="truck-details-section truck-details-figma-section">
      <div className="container-xl">
        <div className="truck-figma-main-grid">
          <div className="truck-figma-left-column">
            {galleryItems.length ? (
              <div className="truck-figma-gallery-block">
                <style>{`
                  .truck-figma-thumbnail .keen-slider__slide img { border: 2px solid transparent; border-radius: 8px; }
                  .truck-figma-thumbnail .keen-slider__slide.active img { border-color: #ff7a21; }
                `}</style>
                <div className="truck-figma-gallery-main">
                  <div ref={sliderRef} className="keen-slider" style={{ display: 'flex', alignItems: 'center' }}>
                    {galleryItems.map((asset, index) => (
                      <div className="keen-slider__slide number-slide" key={`${asset.url}-${index}`}>
                        <div className="truck-figma-gallery-frame">
                          {!imageLoaded ? <div className="truck-figma-gallery-loader"><div className="spinner-border text-warning" role="status" /></div> : null}
                          <img alt={`${material?.title || 'Material'} ${index + 1}`} onLoad={() => setImageLoaded(true)} src={asset.url} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {galleryItems.length > 1 ? (
                  <div ref={thumbnailRef} className="keen-slider truck-figma-thumbnail mt-3">
                    {galleryItems.map((asset, index) => (
                      <div className="keen-slider__slide number-slide d-flex align-items-center" key={`${asset.url}-thumb-${index}`}>
                        <img alt={`${material?.title || 'Material'} thumbnail ${index + 1}`} className="w-100" src={asset.url} />
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : null}
            <MaterialDetailsSpecsCard material={material} />
            <MaterialDetailsInfoSections material={material} />
          </div>
          <TruckDetailsSidebarCards truck={{ ...material, condition: material?.grade, quantity: material?.quantity }} />
        </div>
      </div>
    </section>
  );
}

export default MaterialDetailsOverview;
