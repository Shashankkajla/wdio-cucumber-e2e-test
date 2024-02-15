import { Given, When } from "@wdio/cucumber-framework";
import * as chai from "chai";


/**Given(/^A web Page is opened (.*)$/, async (urlIs)=>{

    console.log("URL IS --> " +urlIs);
    
    await browser.setTimeout({implicit: 20000, pageLoad: 15000}); // Session level waits 
    await browser.maximizeWindow();
    await browser.deleteAllCookies();
    await browser.url(urlIs);
    
    //await browser.url(""); -> if directly picking from baseUrlKey which is in wdioconf.ts
    // append url as well using '/' /input fwd slash.
    
    let actual = await browser.getUrl();
    chai.expect(urlIs).to.equal(actual);
    
    })

    */
   // Note : Whenever you need to work on some feature or new work you need to create a branch locally and work on it, instead 
   // of working master local., once work completed than you merge it with master or main.

When(/^Iterating over the list$/, async ()=>{



})    