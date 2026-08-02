const SliderResizePlugin = (slider) => {
  const observer = new ResizeObserver(() => {
    slider.update();
  });

  slider.on('created', () => {
    observer.observe(slider.container);
  });

  slider.on('destroyed', () => {
    observer.unobserve(slider.container);
  });
};

export default SliderResizePlugin;
