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