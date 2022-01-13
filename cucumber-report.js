const reporter = require('cucumber-html-reporter');
const path = require('path');
const fs = require('fs');

const CYPRESS_DIR = 'cypress';
const CYPRESS_JSON_DIR = path.join(CYPRESS_DIR, 'cucumber-json');
const REPORT_FILE_NAME = 'cucumber_report.html';

const DEFAULT_ENV='stg';
const DEFAULT_BROWSER='chrome';
const DEFAULT_REPORT_DIR = path.join(CYPRESS_DIR, 'reports');

const createEmptyReportDir = (reportDir) => {
  fs.rmdirSync(reportDir, {recursive: true});
  fs.mkdirSync(reportDir);
};


const { argv } = require('yargs')
  .option('env')
  .option('browser')
  .option('reportDir');

const generateReport = (environment, browser, reportDir) => {
  const options = {
    theme: 'hierarchy',
    jsonDir: CYPRESS_JSON_DIR,
    output: path.join(reportDir, REPORT_FILE_NAME),
    reportSuiteAsScenarios: true,
    scenarioTimestamp: true,
    launchReport: true,
    ignoreBadJsonFile: true,
    metadata: {
      "Test Environment": environment,
      "Browser": browser
    }
  };

  reporter.generate(options);
};

const main = () => {
  let {
    env,
    browser,
    reportDir
  } = argv;
  env = (!env) ? DEFAULT_ENV : env;
  browser = (!browser) ? DEFAULT_BROWSER : browser;
  reportDir = (!reportDir) ? DEFAULT_REPORT_DIR : reportDir;
  console.log('**** reportDir: ' + reportDir);
  createEmptyReportDir(reportDir);
  generateReport(env, browser, reportDir);
};

main();
