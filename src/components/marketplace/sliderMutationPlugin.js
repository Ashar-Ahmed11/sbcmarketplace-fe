const SliderMutationPlugin = (slider) => {
  const observer = new MutationObserver(() => {
    slider.update();
  });

  slider.on('created', () => {
    observer.observe(slider.container, { childList: true });
  });

  slider.on('destroyed', () => {
    observer.disconnect();
  });
};

export default SliderMutationPlugin;
