import { Given, When } from "@wdio/cucumber-framework";
import * as chai from "chai";



Given(/^A web Page is opened (.*)$/, async (urlIs)=>{

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


When(/^Perform WebInteraction$/, async ()=>{

let ele = await $('//a[text()="Inputs"]')
await ele.click();
await browser.pause(4000);

/** 
 * 1. Input Box -> SendKeys Operation
 * Actions ::
 * > Type into input Box
 * > Clear the field and type or just addvalue
 * > Click
*/

// > Type into input Box : Need to do 1. click and 2. Type here -> setValue() : clear value before entering it by default.
let sendKey = await $(`input[type=number]`);
await sendKey.click();
await browser.pause(4000);
await sendKey.setValue("123456");
//await browser.pause(4000);
let expectedValue =await sendKey.getAttribute('type'); // number
console.log("Expected Value is "+expectedValue) // Expected Value is number
chai.expect(expectedValue).to.equal("number"); // After entring value need to be confirmed is the same value inserted

//await browser.debug() //->will wait dont close here the session,manually you need to enter .exit in console now session closed

// addValue() : don't clear the field it will enter the value. also used to upload file.
// setvalue() : clear value before entering it by default.
// ele.scrollIntoView() : scroll to the particular element
// ele.moveToElement() : move to the particular element

//let num "1234"; --> Convert number to string
//let strNum= num.toString();

await browser.back(); // One step back 


})

When(/^Perform action to Handle DropDown$/, async ()=>{




})