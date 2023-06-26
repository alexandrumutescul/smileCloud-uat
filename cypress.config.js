const { defineConfig } = require("cypress");

module.exports = defineConfig({
  chromeWebSecurity: false,
  defaultCommandTimeout: 64000,
  experimentalFetchPolyfill: false,
  experimentalInteractiveRunEvents: false,
  experimentalSourceRewriting: false,
  viewportWidth: 1920,
  viewportHeight: 1080,
  requestTimeout: 70000,
  numTestsKeptInMemory: 50,
  responseTimeout: 70000,
  pageLoadTimeout: 30000,
  includeShadowDom: true,
  reporterOptions: {
    charts: true,
    overwrite: false,
    json: true,
    html: false,
    filePrefix: "",
  },
  fixturesFolder: "cypress/fixtures",
  screenshotsFolder: "cypress/reports/screenshots",
  videosFolder: "cypress/reports/videos",
  video: false,
  downloadsFolder: "cypress/downloads",
  trashAssetsBeforeRuns: true,
  retries: {
    runMode: 0,
    openMode: 0,
  },
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require("./cypress/plugins/index.js")(on, config);
    },
    supportFile: 'cypress/support/e2e.js',
    specPattern: "cypress/e2e/features/*.feature"
  },
});
