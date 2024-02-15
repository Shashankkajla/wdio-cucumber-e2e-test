import { Given } from "@wdio/cucumber-framework";
import * as chai  from "chai";



Given(/^Login to inventory web Page$/, async function(){

    await browser.url("https://www.saucedemo.com/");
    await browser.setTimeout({ implicit: 20000, pageLoad: 20000});
    await browser.maximizeWindow();
    await browser.deleteAllCookies();

    // Login Details :: 
    let un= await $('#user-name')
    un.setValue("standard_user");

    let pw = await $('//input[@id="password"]')
    pw.addValue("secret_sauce");

    (await $('#login-button')).click();
    await browser.pause(4000);
})