# Mailshake Test Automation Framework DEMO

**Table of content**

* [Framework Setup](#framework-setup)
* [Run scenarios and generate reports](#run-scenarios-and-generate-reports)
* [Available npm commands](#available-npm-commands)
* [CI](#ci) 
* [Dashboards](#dashboards)
* [TestRail](#testrail)
* [Aditional scripts](#aditional-scripts)
* [Framework considerations](#framework-considerations)
___

## Framework Setup

* Make sure you have installed node.
* After clonning the repository run:
```bash
npm install
```


## Run scenarios and generate reports

In order to run sceanrios: 
```bash
./script/run_suite.sh
```

**Arguments**:

* `-h/--help`: Shows help

* `-t/--tags`: Runs desired tags (default: not @WIP). Example: -t 'not @ISSUE'

* `-e/--env`: Selects the desired environment (default: stg). Example: -e dev. Available environments: *dev*, *stg* and *pdr*

* `-b/--browser`: Selects the desired browser (default: chrome). Example: -b chrome

**Script behavior**:

* Run suite scenarios according the specified tags, environment and browser.

* Generate a cucumber html report, stored in _report_ folder.

* Generate a new test run in [TestRail: Test Suite](https://xxxxx.testrail.io/index.php?/runs/overview/1)


## Available npm commands 

The available npm commands are defined in [package.json](package.json)

To run any of the commands, execute from a terminal:

```bash 
npm run <command>
```

For example, to run all test suit in chrome, execute:
```bash 
npm run testHeadedChrome
```

The most used commands are:

* `open`: To open cypress
* `test`: To run cypress
* `testDashboardHeadless`: To run tests in headedless and generate cypress dashboard
* `testHeadless`: To run tests in headedless (but not generating cypress dashboard)
* `testHeaded`: To run tests in headed mode (but not generating cypress dashboard)
* `testHeadedChrome`: To run tests in headed mode using chrome browser (but not generating cypress dashboard)

When running any of the commands, the cypress configuration used by default is defined in [cypress.json](cypress.json)

To specify an additional argumet to a command, then run the command followed by "`--`" and then the desired arguments:

```bash 
npm run <command> -- <command_args>
```

For example, to run only test tagged as "@Smoke" and not tagged as "@WIP" in Chrome browser, then execute:

```bash 
npm run testHeadedChrome -- -e TAGS="@Smoke and not @WIP"
```


## CI

To see the CI plan go to: [cb-automation pipelines](https://gitlab.xxxx.co/QA/cb-automation/-/pipelines)


The pipeline behavior can be sum up with the following items:
* Environment setup: cypress & npm packages installation
* Run tests
* Report generation

Default values are:
* TAGS: "(@Smoke or @CashAccountHub) and (not @ISSUE and not @WIP)"
* ENV: stg
* BROWSER: chrome

You can specify other variable values by manually running a new pipeline and defining them in CI/CD settings.

After the pipeline ends you can (depending on the configuration of the plan):
* Download the cucumber html report that is published as each pipeline artifact.
* Go to [Cypress Dashboard](https://dashboard.cypress.io/) page and see the run information.
* Go to [Test Rail - Test Runs & Results](https://xxxxx.testrail.io/index.php?/runs/overview/1)

___
**IMPORTANT**
If you want to add suite result to an already created TestRail Plan/Run then you have to set the corresponding "**TESTRAIL_RUN_ID**".
___


### Behavior every repository modification

Each time there is a repository change, then a CI pipeline is trigered running in PARALLEL, only in chrome browser with the default behavior.

### Schedule behavior

There are 2 scheduled plans:
* Nightly: 
  * It runs every day
  * It runs all "not @ISSUE and not @WIP" test cases
  * All test cases run in chrome, firefox, edge and chrome mobile 
* Weekly - Issues checkpoint:
  * It run one time per week
  * It runs only "@ISSUE" test cases
  * All test cases run in chrome, firefox, edge and chrome mobile 

Note: `Chrome mobile` is a chrome browser with mobile-size screen configuration.

### Possible behavior when running manually

It is possible to manually specify more than one job, clicking on "Run pipeline" and setting different variables according the desired scope.

#### Parallel (default behavior):

**Behavior/results**:
* XML reports are generated as CI artifact
* Cypress dashboard is generated
* No test rail run report is Generated


#### Sequential chrome + defined testRail report:

**Parameters**:
* SEQUENTIAL=true
* REPORT_TESTRAIL=true
* RUN_ID=224

**Behavior/results**:
* One XML report is generated as CI artifact
* Cypress dashboard is generated
* TestRail run report is updated in run ID 224

#### Run all test cases (Nightly scheduled plan)

**Parameters**:
* RUN_ALL=true

**Behavior/results**:
* One XML report is generated per browser as CI artifact
* Cypress dashboard is NOT generated
* TestRail report is NOT generated

#### Run all test cases + TestRail

**Parameters**:
* RUN_ALL=true
* REPORT_TESTRAIL=true
* RUN_ID=220
* FIREFOX_RUN_ID=221
* CHROME_MOBILE_RUN_ID=222
* EDGE_RUN_ID=223

**Behavior/results**:
* One XML report is generated per browser as CI artifact
* Cypress dashboard are generated (sequential dashboards)
* Each TestRail run report is updated


#### Run all test cases (Weekly scheduled plan)

**Parameters**:
* RUN_ISSUE=true

**Behavior/results**:
* One XML report is generated per browser as CI artifact
* Cypress dashboard is generated
* TestRail report is NOT generated



## Dashboards

* Go to [Cypress Dashboard](https://dashboard.cypress.io/)
* Select the "latests created organization" from the upper left menu (probably it is already selected)
* Select the "latest created project" for that organization (probably it is already selected)
* Click on "Latest runs" and select the item you want to see more information (probably the latest item)