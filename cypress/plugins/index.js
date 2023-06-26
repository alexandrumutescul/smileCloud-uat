/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

const path = require('path');
const cucumber = require("cypress-cucumber-preprocessor").default;

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  const downloadDirectory = path.join(__dirname, "..", "fixtures");

  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  on("before:browser:launch", (browser = {}, launchOptions) => {
    if (browser.family === "chromium" && browser.name !== "electron") {
      launchOptions.args.push("--disable-dev-shm-usage");
      launchOptions.args.push("--disable-gpu");
      launchOptions.args.push("--blink-settings=primaryPointerType=4");
      launchOptions.preferences.default["download"] = {
        default_directory: downloadDirectory,
      };
      launchOptions.preferences.default.intl = { accept_languages: "en" };
    } else if (browser.family === "chrome") {
      launchOptions.args.push("--disable-dev-shm-usage");
      launchOptions.args.push("--disable-gpu");
    } else if (browser.family === "firefox") {
      launchOptions.preferences["browser.download.dir"] = downloadDirectory;
      launchOptions.preferences["browser.download.folderList"] = 2;

      // needed to prevent download prompt for text/csv files.
      launchOptions.preferences["browser.helperApps.neverAsk.saveToDisk"] = "*";
    }

    if (browser.name === "chrome" && browser.isHeadless) {
      launchOptions.args.push("--auto-open-devtools-for-tabs");
      launchOptions.args.push("--blink-settings=primaryPointerType=4");
    }

    return launchOptions;
  });

  on("file:preprocessor", cucumber());
};
