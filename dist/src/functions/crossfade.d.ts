const crossFade = (...images) => {
  /**
   * Blends images using the cross-fade effect.
   * @param {...images} images - An array of image URLs or tuples of image URL and percentage.
   * @returns {string} A CSS function representing the cross-fade of the provided images.
   * @throws {Error} If less than two valid images are provided.
   */
  const validImages = images.filter(image => {
    if (typeof image === 'string' && image.startsWith('url(')) {
      return true;
    }
    const [img, percentage] = image;
    return typeof img === 'string' && img.startsWith('url(') &&
      typeof percentage === 'number' && percentage >= 0 && percentage <= 100;
  });

  if (validImages.length < 2) {
    throw new Error('crossFade function requires at least two images.');
  }

  const crossFadeImages = validImages.map(image => {
    if (typeof image === 'string') {
      return image;
    }
    const [img, percentage] = image;
    return `${img} ${percentage}%`;
  }).join(', ');

  return `cross-fade(${crossFadeImages})`;
};

export { crossFade, crossFade as default };
