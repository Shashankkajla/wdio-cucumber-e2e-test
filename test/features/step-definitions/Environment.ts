import { Given, When, Then } from "@wdio/cucumber-framework";
import * as chai  from "chai";



Given(/^user provides url to be launched$/, async function(){

console.log(`environment url Is >>> ${process.env.ENV_URL}`);
await browser.url(process.env.ENV_URL);
await browser.setTimeout({implicit: 12000, pageLoad: 10000})
await browser.deleteAllCookies();
await browser.maximizeWindow();


})

When(/^user enters username and password$/, async ()=>{

    let un = await $(`#user-name`)
    let pw = await $(`//input[@id="password"]`)

    await un.addValue(process.env.User_Name1);
    await pw.addValue(process.env.Password1);
    await browser.pause(5000);

})

Then(/^user click on Login button$/, async ()=>{

(await $(`#login-button`)).click();

})


Given(/^user provides url from testEnv$/, async function(){

    //@ts-ignore
    console.log(`environment url Is >>> ${baseConfig.sauseDemoUrl}`);
    //@ts-ignore
    await browser.url(baseConfig.sauseDemoUrl);
    await browser.setTimeout({implicit: 12000, pageLoad: 10000})
    await browser.deleteAllCookies();
    await browser.maximizeWindow();
    
    
    })
    
    When(/^user enters username and password for testEnv$/, async ()=>{
    
        let un = await $(`#user-name`)
        let pw = await $(`//input[@id="password"]`)
        //@ts-ignore
        await un.addValue(baseConfig.TestUn);
        //@ts-ignore
        await pw.addValue(baseConfig.TestPw);
        await browser.pause(5000);
    
    })