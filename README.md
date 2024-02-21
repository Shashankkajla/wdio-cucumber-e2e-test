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
   Note :: Make the  tags='', empty in cucumberOpts in wdioconf.ts file.


# Running Test in Headless Mode :: 
- I want to run tests in Headless mode , So that i can run tests in background mode and also can run using CI tools incl
Jenkins, GithUb actions.

Configuration to Run Tests in Headless Mode ::

STEPS ::
- Add these Flags as chrome Options, in capabilities section in wdio.ts file
Note :: All these flags need to be add on if you are working on Docker, gitHub Jenkins to run in headless mode
If you want to run locally in headless just need to add --headless only in wdio.ts under capabilities

1. --headless
2. --disbale-dev-shm-usage
3. --no-sandbox
4. --window-size=1920,1080
5. --disable-gpu

- Additional Flag
1. --proxy-server
2. binary
3. --auth-server-whitelist="_"

- Make use of process.env obj to set headless flag
1. Use export for MacOS and set for Windows

- Written in Registor as well


 -- > Previous to Run Normal ::

 capabilities: [
    {
      browserName: "chrome",
      browserVersion: "122.0.6261.39",

      timeouts: { implicit: 15000, pageLoad: 20000, script: 30000 },
               
      },      
  ],

  -->  "scripts": {
    "demo": "export HEADLESS=N && npx wdio wdio.conf.ts --cucumberOpts.tags='@demo'",
    "sanity": "export HEADLESS=Y && npx wdio wdio.conf.ts --cucumberOpts.tags='@sanity'"
  },

  ->To run in Headless via package.json 


->Add in wdioconf.ts
let headless = process.env.HEADLESS
console.log(`${headless}`);
  capabilities: [
    {
      browserName: "chrome",
      browserVersion: "122.0.6261.39",

      timeouts: { implicit: 15000, pageLoad: 20000, script: 30000 },
      
    "goog:chromeOptions":{
    args: headless.toUpperCase() ==="Y" ? ["--disable-web-security", "--headless", "--disbale-dev-shm-usage", "--no-sandbox", "--window-size=1920,1080"] : []
          
      },


  # Running in Parallel Mode :: 
  -------------------------------

  - WDIO runner starts, it looks for the number of feature specific file to run
  - The run scpe changes only to feature file that matches the tag
  - Noe : A feature file has to execute for every capability 
  - Use 'exclude' option to exclude specific feature file from specific capability.

  - wdio.ts capability : Each feature has been asign to each worker., The valid tag of the worker will be executed and remaining will not do aything.

  - Capabilityies in wdio.ts: Need to add other brow
  - Its outside capability -> maxInstance: 10; --> maximum 10 instances to be run 
  - Its withing cpability-> maxInstance : 5; --> Suppose you given 10 Feature file to run it will run 5 feature file once that it completes than run 
  remaining 5.

  - Run in parallel out of 3 workers 2 workers have assigned 


# Setted up the .env File ::
--------------------------------
 
- I want to store all creds[secrets] in seprate file
- So that, I can store things securely and don't expose credentials.
- Search in npm and install same way as we installed chai  -> npm i --save-dev dotenv
- Go to website , make sure you are on root to install it or it will install it in some other directory.
- Create file .env file in the root [if not exist already]
- Install dotenv package from npm 
- Add these two lines in wdio.conf.ts  

>>import dotenv from "dotenv"
>> dotenv.config()

Once we are running as we know wdioconf.ts is a file that will load first while runing suite , So that we are importiing the configuration of .env on to the top so once  dotenv.config() runs it will connect with the .env key pairs which are available 
in the file so that at run time we can use it accordingly .

# 1. WDIO Version 8 changes IMP ::
1. Usefull file extension when importing project file.
Optionally enable "typescript.preference.importMpduleSpecifierEncoding": "js", in VSCode setting.json, Click on setting gear icon open from top rectengale file click on it and add it under typescript object after adding it it will automatically import 
suggestion will give you i.e pageObject folder file or helper file it will give you the suggestion for custom import.
- using version  "@wdio/cli": "^8.32.0",

2. `browser.config` -> `browser.option` i.e in wdio.conf.ts i.e testid
When merging env specific conf file , add all the keys to `before`hook to make the key available to `browser.options` object


# 2. Manage/ Create and merge d/f environment configuration file ::
------------------------------------------------------------
- Lets say write ow you just hardcoded this env url in real time you have multiple environment uat, prod, sit others, So how are we manage those env specific information and how can we run same test in across environment.

- As an Automation Testr I store urls and environment related data in a seperate config file, So that I run test across
different environment without any changes.

>> Steps ::
- Create d/f env files (e.g test, uat, prod)
- Merge with wdio conf file (using Object.assign)
- Update package.json file with new config path
- Access the property with browser.config.<key>, update and run test


Creation Steps ::
- Go under the config folder and create a file i.e wdio.test.conf.ts
- add another one file under same folder wdio.uat.conf.ts or you can add multiple accg to you env's.
- Now we have to merge these two files with the wdio.conf.ts file in that file config: is key where wdio knows that inside this config which is i need to execute.

>> Merging same example in debug folder added,,,
- let objA = {
 a: 1

}

let objB = {

b : 2
}

// Now how can i merge these two values , So that i can get an obj like a :1 and b: 2 ?
// use ... spread operator or assign .

objA = Object.assign(objA, objB); // Merging these values to option A i.e Merging objB value to objA.

console.log(objA);
// op :: a : 1 & b : 2 Here's how we performed merge.


>>>>> >>> under config folder >>> 

import {config as baseConfig} from "../wdio.conf" 
// As we know about config we are making alias as baseConfig coz config is a key which 
//already present in wdio.conf file from where the execution starts.

export const config= Object.assign(baseConfig,{

// env specific key value pair 
 environment : "Test",
 sauseDemoUrl: "https://www.saucedemo.com"

})

// We are assig in same way its in wdioconf.ts , So at run time WDIo understand we have a config file with addiotional two values.
// Due to some changes this won't work



# Log Level ::
------------- 
let debug = process.env.debug --> the flag need to put same way for headless mode one 
  logLevel: debug.toUpperCase() ==="Y" ?  'info': 'error',

   >> "demo": "export debug=N && HEADLESS=N && npx wdio wdio.conf.ts --cucumberOpts.tags='@demo'",



  # Advance Cucumber Hooks Integration & Regular Expression ::
  ----------------------------------------------------------------
  - https://regexr.com/ : website to validate the regular expression
  - The dattable must be the last passing argument of a function most of things added in AdvanceCucumber.feature and cucumber .ts
  stepdefinition.
  - ${JSON.stringfy(obj)} : provide the objects print the argument of hooks which you are using stored it into debug folder
  and use it accordingly ex: @AfterStep : takescreenshot.

  - SetUp world obj , A way to exchange data b/w steps ::
  - Failed Screenshot will show in allure-result folder


# SetUpWorld Object ::
------------------------
- As an automation testerI want to set a value at one step , So that i can access the same at d/f steps at my feature file.

Steps::
- create a world.ts file under step-definition folder
- import setWorld constructor
- create a customWorld class & set the number of argument to setWorldConstructor i.e that can be accessed by steps for that scenario where it will require in other steps i.e appId, caseId , unique identifier etc.

Note >> :: The values are accessible only per scenario/Iteration and values are reset at every new scenario/ iteration.

- Concept done but its not working see it in AdvanceCucumber.feature


# SettingUp TestId Globally ::
-------------------------------
- same declared in global object
- BeforeScenarionworldObject :: 

TestID Objects :: 
>> gherkinDocument
>> pickle  -->  "name": "<TestID_1234> : Testing the id", Inside pickle Array we have name object so make the condition
>> testCaseStartedId

Check BeforeScenarion

Eg: Scenario: <TestID_1234> : Testing the id --> Geiven TestID for Scenarion


Scenario Outline: Run First Demo Feature --> given TestId for Scenario Outline
        Given Google Page is opened
        When Search with <SearchItems>
        Then URL should match <ExpectedURL>

        Examples:
            | TestCaseID  | SearchItems | ExpectedURL           |
            | Demo_TC_001 | WDIO        | https://webdriver.io/ |

--> Its not working , but check the split funcn in jS :)
            beforeScenario: function (world, context) {

    //console.log(`World Is >>>>> ${JSON.stringify(world)}`);
     console.log(`Context Is >>>>> ${JSON.stringify(context)}`);
   // Extraction the TestID
     let arr = world.pickle.name.split(/:/) // split if find any colon : in name object and return str[]
     
     if(arr.length > 0){
      context= arr[0]
     }
     if(!context)  throw Error(`Err Getting TestID for current Scenario${world.pickle.name}`)

  },


# Setting up the Logger so that i can store the logs in o/p for actions and events::
-------------------------------------------------------------------------------------
- Not working need to learn in this to setup in npm 


# Allure report SetUp ::
--------------------------
- As we know allure is already install during Framework setup so inside allure result folder you can see the 
results in json format 

- Steps : 
- Go to np website :: 
- run in cmd sudo npm install -g allure-commandline , use sudo for permission grants level, recommanded to run on root level
where wido.conf.ts is present.
- which allure shoul retunr the path where it installed
- Run Test case 
- Run allure serve to generate reports.

Tips :: >>
Set these two Flags to buitify the Allure results in specs object in wdio.conf.ts
>> disableWebDriverStepsReporting: true,
>> useCucumberStepReporter: true

- It also takes the fail Screenshots and the Assertion errors if there is in Failure.

>> Note :: Go to npm_modules - @wdio - allure-reports - build - type.d.ts (will see all allure reporter options)
>> Also, youc can check for any Technologies i.e CLI cmmonds in same way .

- Add the other details after importing allure in wdio.ts in AfterFeature annotation i.e, environment , tags etc.. as per the requirement will check in this furthur..

- allure-results folder should be present to get the result 

- run, allure serve after that to generate the test case result.


# Exceptions JS ::
> Standard JS Exception :: 
1.Refrence Error : Variable dosent declare above and you are printing the var
2. Syntax error 
3.typeError


try{

}

catch(err){

 clg(err.name); // provide the refrence error 
 clg(err.message); // It will print the error message help to debug
 clg(typeOf err); // object type 

}

---> Control the test Step pass Fail, retry status using catch Block 

try{


} catch(err){

  clg(err.message);
  throw err;  // Will fail the execution when error occured and dosen't handled by catch

}


try{

}
catch{
  logger.error(err) ; willl not sto execution it will capture the log and proceed

}

try{

  catch(){
    // retry 
  }
}

# PageObject Model ::
----------------------
> PDCA : Plan Do Act Check : Alwaz write the cahi assertions to find out the bugs..








