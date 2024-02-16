# Install wdio
- `npm init wdio .`

# package.json
- check `type: module`

# tsconfig.json
- check `"module" : "ESNext"`
- check `"resolveJsonModule" : true`
- add `"esModuleInterop" : true`
- change `"strict" : false`

# wdio.conf.ts
- check `project: "./tsconfig.json`
- add `${process.cwd()}/test/features/**/*.feature`
- add `./test/features/step-definitions/*.ts`


# Project Structure / Architecture Steps ::
- Open wdio.conf.ts & check the specs Object where the feature files gets stored, create a folder of test on under select test  and crete features under test.

- Check require Object in 'Cucumber Options' where you can create a steps, select test and create folder uder test of 'step-definitions' 

- Select features under features create a demo folder for debuging purpose.

- Under Test folder select Tesst , create helper folder where you can add generic functions.

- Under Test Folder create page-objects.

- Configure folder on Root with name config i.e. [That have any env specific config file -- running tests qa, preprod, prod, uat env.]

- Create data folder on root to store data of Test Case.

- create debug folder on root for practise purpose.

- create logs folder on root.

- create results folder on root to store execute Test cases results.

- Credential's & secrets don't store directly --> create .env file on root.

- .env example create on root dummy file i.e how its storing data in .env in key & value pairs.

# VsCode Extensions :: 
- VsCode-icons
- Prettier-code formatter
- Path intellisense
- npm intellisense
- JavaScript(ES6) code snippets
- Cucumber(Gherkins) Full Support
- gitIgnore
- DotEnv
- Surround with

# chai Assertion ::
- As it is a external package so search npm on Google and search for chai DT and than install on root :: npm install --save-dev chai.

- After this import it and on importing it will show an error i.e.-->  'chai' is declared but its value is never read.ts(6133)
- To overcome this Try npm i --save-dev @types/chai if it exists or add a new decleration (.d.ts) file containing declared module 'chai'; 

- npm i --save-dev @types/chai this will added the type decleration file you can also see in node_module where the @types folder present under that the chai folder in chai folder index.d.ts should be present now, its exporting all of its terminology all function is present , now you will get the autosuggestion for chai.

- Other problem is , module chai can only be default imported using the 'esModuleInterop' flag to true if its already present
- Add this flag to ts config file in compilerOptions Object [It won't require if this flag not found in auto suggestion]

- chai error :: [0-0]  Error:  The requested module 'chai' does not provide an export named 'default' solution is in next line
- import * as chai from "chai";
- import *: This means import all exports from the module.
- as chai: This renames the imported module to "chai" in the current scope.
- import all exports from the "chai" module and assign them to a single variable (chai in this case).


# Short Cuts ::
- Ctrl + BackTick : directly Open Terminal
- Cmd + Shift + P : Suggestions
- Install code command in PATH - Than Open Project from Terminal using code . command
- Cmd + A , Shift +Option + F for code formatting


# About Chrome browser ::
- After chrome v115 we don't need to add anything in services, if you need to test something in lower or higher chrome version
  specifically than provide it in wdio.conf.ts file under capabilities array i.e ,

  capabilities: [{
        browserName: 'chrome',
        browserVersion: '122.0.6261.39'
    }],

 - https://googlechromelabs.github.io/chrome-for-testing/#stable -> To check stable version of chrome 
 - If do't provide it tahn it will pick the latest binary file and download it and launch the chrome here i am providing it      because  v121 is having an issue to download it.


 # About setting up npm project :: 
 - you can run npm install to update the packages.
 - if in case you find some issue open package.json file and hover it on key's i.e, So here you can update it by giving cmd 
    npm -i @types/chai@latest @wdio/cli@latest @wdio/local-runner@latest in that way for all dependencies.
 - On hovering keys it will automatically tell you the which updated version is going on.
 - Before installing delete packages using rm -rf package-lock.json node_modules once delete it than download latest package so  that the vulnerabilities chances are less to occur.
 - if it occur run npm audit fix to fix it but save your data in branch first.
 - npm audit will check the status of vulnerability on the version which you have installed. 

 "devDependencies": {
    "@types/chai": "^4.3.11",
    "@wdio/allure-reporter": "^8.31.1",
    "@wdio/cli": "^8.32.0",
    "@wdio/cucumber-framework": "^8.31.1",
    "@wdio/local-runner": "^8.32.0",
    "@wdio/spec-reporter": "^8.31.1",
    "chai": "^5.0.3",
    "ts-node": "^10.9.2",
    "typescript": "^5.3.3"
  }


  # TimeOuts ::
  - Go to wdio.ts here you search timeout the default timeout is present for 10sec furthur go to wdio on website-> guide
    under guide you can see the timeouts at project level i.e ,
    // Default timeout for all waitFor* commands. --> * is a wildcard means for all cmds of wdio
    waitforTimeout: 10000,

    // if browser driver or grid doesn't send response
    connectionRetryTimeout: 120000,

    - // <number> timeout for step definitions
        timeout: 60000, -> we can increase it for any of test run in background on running in headless mode 
        we need to setup higher timeout to complete the step definition in coming session.

    - timeouts: { implicit: 15000, pageLoad: 20000, script: 30000 }, updated inside wdioconf.ts under capabilities array object.
      // Every script should be competed in 30sec 
      // Taken from ChromeBrowserCapabilities & Element Capabilities in Data Folder

    - await browser.url("https://www.amazon.com/");
     console.log(`${JSON.stringify(browser)}`);  // print the data of an array of Objects

     - // <number> timeout for step definitions, the promise has not resolved within this given seconds
    timeout: 300000, its in cucumberOptions in within that time frame the step gets completed.



  # Log Level ::
  - In wdioconf.ts we have log level object i.e, 
  // Level of logging verbosity: trace | debug | info | warn | error | silent , use error logs will provide the errors only
  logLevel: "info",
  
  # Debugger ::
  - await browser.debug(); 
  It will wait there of certain time in logs we can check the data or further we can copy xpath and paste it console to check the
  how system behaves with this input after that press enter to continue further execution .
  - Or you can create a script at the sme time using debugger.
  - We can see furthur at Framework level.

  # REPL :: Way to Control browser through command line 
  - What is REPL ?
  Read- evaluate - print loop

  - When do we use it ?
  You need to spin up a browser instance and start debugging at any level

  - How do i open ?
  Move to the root where wdio package.json exit
  npx wdio repl chrome 

  >>> $(`//div[text()="Sauce Labs Backpack"]`).click() , will handle the browser instance and perform action on elements at same time by providing commands of wdio in console


# W3C WebDriver Protocol ::
- https://www.w3.org/TR/webdriver2/ --> A protocol of Webdriver wdio implement this protocol so that any kind of browser
challange can be handle with this . So we have mny browser Object keys ase we seen under data folder.
- Go to the capabilities section you can see hover that if not understand.
- Depending on project need add in capabilities object under wdioconf.ts file.
- skip the ssl certification 
- chromium cmd line option :: you can see number of flags to control the chrome :: https://peter.sh/experiments/chromium-command-line-switches/

- It is a trial and error 


capabilities: [{

   args :{

    browserame: "chrome",
    "google.chromeOptions":{

      args: ["--disable-web-security"]
    }
   }

}]


# git Changes Check ::
- Click on git icon on right side and see the changes before after on the same file you did Red Flag for removing and green for adding in same file.
- git checkout master - git commit -m "pushing changes" - git merge -m "comment" local branch | Local to Master Merge locally.



# Running test case from Package.json File ::
- npm run TagName which provided under script Tag.

Before 
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "wdio": "wdio run ./wdio.conf.ts"
  },

 Alteration in Package.json 
- "test": "npx wdio wdio.conf.ts --cucumberOpts.tags='@demo'"
   "smoke": "npx wdio wdio.conf.ts --cucumberOpts.tags='@smoke'"

   Now in Command line write >>> npm run smoke, So the tag which is containing either scenario or feature will start running it.
   Note :: Make the  tags='', empty in cucumberOpts in wdioconf.ts file
 