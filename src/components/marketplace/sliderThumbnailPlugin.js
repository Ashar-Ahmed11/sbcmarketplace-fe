function SliderThumbnailPlugin(mainRef) {
  return (slider) => {
    const removeActive = () => {
      slider.slides.forEach((slide) => slide.classList.remove('active'));
    };

    const addActive = (idx) => {
      if (slider.slides[idx]) {
        slider.slides[idx].classList.add('active');
      }
    };

    const addClickEvents = () => {
      slider.slides.forEach((slide, idx) => {
        slide.addEventListener('click', () => {
          if (mainRef.current) {
            mainRef.current.moveToIdx(idx);
          }
        });
      });
    };

    slider.on('created', () => {
      if (!mainRef.current) return;
      addActive(slider.track.details.rel);
      addClickEvents();
      mainRef.current.on('animationStarted', (main) => {
        removeActive();
        const next = main.animator.targetIdx || 0;
        addActive(main.track.absToRel(next));
        slider.moveToIdx(Math.min(slider.track.details.maxIdx, next));
      });
    });
  };
}

export default SliderThumbnailPlugin;
