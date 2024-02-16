import { When } from "@wdio/cucumber-framework";
import * as chai from "chai";

When(/^weight and timeout in whenTs section$/, async () => {
  /**
   *
   *  > useful for browser obj & ele object
   *    JSON.stringfy(${browser}) -> give the array of objects useful to understand taht can be used in execution
   *    JSON.stringfy(${ele}) -> -> give the array of objects useful to understand taht can be used in execution
   *  */

  await browser.url("https://www.amazon.com/");
  console.log(`${JSON.stringify(browser)}`);

  await browser.url("https://www.amazon.com/");
  let ele = await $(`//a[text()="Registry"]`);

  console.log(`${JSON.stringify(ele)}`);
});

When(/^use wait until dynamic waits$/, async () => {
  /**
   *  isDisplayed()
   *  isEnabled()
   *  isClickable()
   *
   * i.e : wait until, browser ele state changed, until title loads, until field text value has loads
   *  >> Access for both browser and element.
   *
   *
   * >> syntax :: $(selector).waitUntil(condition, { timeout, timeoutMsg, interval})
   *
   * >> condition will return boolean , interval after how many sec will check again if the ele available or not
   *  */

  await browser.navigateTo("https://www.google.com/");
  await browser.navigateTo("https://webdriver.io/");

  let titleIs = await browser.getTitle();
  let flag = await browser.waitUntil(
    async () => {
      // That function should return a boolean
      return (
        titleIs ===
        "WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO"
      );
    },
    {
      timeout: 8000,
      interval: 2000,
      timeoutMsg: `Failed loading wDIoWebPage >> :  ${titleIs}`,
    }
  );
  // This wait command is your universal weapon if you want to wait on something. It expects a condition and waits until that
  // condition is fulfilled with a truthy value to be returned.
  // {timeout: 8000, interval: 2000, timeoutMsg: `Failed loading wDIoWebPage >> :  ${titleIs}`} : object taht need to be pass in function.

  console.log("Holding truthy Value >>>> " + flag);

  if (flag) {
    console.log("Hello World !!");
  }
  // Holding truthy Value >>>> true
  // [0-0] Hello World !!
  // Or write loop inside it with this ele to check refresh back again etc.

  let text = "Blog";

  let testWait = await $(
    `//a[text()='${text}' and @class='navbar__item navbar__link']`
  );

  let value = await browser.waitUntil(
    async () => {
      return await testWait.isDisplayed();
    },
    {
      timeout: 15000,
      interval: 4000,
      timeoutMsg: `Element is >>> not Present --->>> ${testWait}`,
    }
  );

  console.log("element checking " + value);

  if (value) {
    await testWait.click();
  }
});


When(/^Navigation test$/, async ()=>{

     /**
   *
   *  await browser.back();
   *  await browser.forward();
   *  await browser.refresh();
   * 
   * 
   * Reload() : Multiuser workflow base application where there is no way to sign out
   * Refresh(): form filling and failing at once due to falkiness, retry by refreshing
   * Back(): scenario where we need to go back/forward.
   *
   * reloadsession(): spin up a new session and login back again to from other user 
   *  */

   await browser.navigateTo("https://www.saucedemo.com/");

   let un = await $('#user-name')
   let pw = await $(`#password`)
   let loginBtn = await $(`#login-button`)

   // Standard User Login :: 
   await un.addValue("standard_user");
   await pw.addValue("secret_sauce");
   await loginBtn.click();

   await browser.pause(4000);

  // visual User login ::
  /** await browser.reloadSession(); // start a new session from login url where need to enter another user detail to log in
  await browser.navigateTo("https://www.saucedemo.com/");
  await un.addValue("visual_user");
  await pw.addValue("secret_sauce");
  await loginBtn.click();

  await browser.pause(4000);
  */


  
});


