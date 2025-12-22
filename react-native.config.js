
   module.exports = {
  project: {
    ios: {
      assets: ['./assets/fonts']// No assets here → iOS will be untouched
    },
    android: {
      assets: ['./assets/fonts'] // Only Android uses these
    }
  }
};
