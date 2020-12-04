const checkImageSource = (source) => {
  try {
    // local image 이면
    if (typeof source === 'number') {
      return source;
    }
    if (source) {
      const {uri} = source;
      if (
        uri &&
        (uri.startsWith('http://') ||
          uri.startsWith('https://') ||
          uri.startsWith('data:image/png;base64'))
      ) {
        return source;
      }
    }
  } catch (error) {
    console.error(source);
  }
  return {uri: ''};
};

export {checkImageSource};
