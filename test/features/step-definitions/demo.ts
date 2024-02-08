import { Given, When, Then } from "@wdio/cucumber-framework";
import * as chai from "chai";

Given(/^Google Page is opened$/, async function () {
  console.log("Browser Launched");
  await browser.url("https://google.com");
  //browser.debug();
  // TimeOut Hard Wait
  await browser.pause(8000);
  console.log("Browser Launched Done");
});

When(/^Search with (.*)$/, async function (searchItems) {
  console.log("Search value >>> " + `${searchItems}`);
  await browser.pause(7000);
  let ele = await $(`//*[@title="Search"]`);
  await ele.setValue(searchItems);
  browser.keys("Enter");
});

Then(/^click on the first search result$/, async function () {
  await browser.pause(6000);
  (
    await $(
      '//h3[text()="WebdriverIO · Next-gen browser and mobile automation test ..."]'
    )
  ).click();
});

// --> This execution till here is good after this we have issue in step So recheck it and ebug it from console i checked.

Then(/^URL should match (.*)$/, async function(urlIs){

await browser.pause(4000);

if(urlIs=== 'https://webdriver.io/'){
  console.log("URL is >>>>> " +urlIs); 
}
 
let url = await browser.getUrl();
chai.expect(url).to.equal(urlIs);

})

//AssertionError
 //   + expected - actual

 //   -https://webdriver.io/ --> actual
 //   +https://webdriver.io  --> expected