import { Given, When } from "@wdio/cucumber-framework";
import * as chai from "chai";


  
Given(/^user provides saucelab url$/, async ()=>{

    await browser.maximizeWindow();
    await browser.deleteAllCookies();
    await browser.setTimeout({implicit: 12000, pageLoad: 15000});
    await browser.url("https://www.saucedemo.com/");

//    loggers.log('error', 'hello', { message: 'world' });

   
});


When(/^user logged in (as|a) (.*).$/, async (typ ,untype, dataTable)=>{
   
    // Note :: The dataTable must be the last argument of the function.

    console.log(">>>>> "+ `${typ}`); // as
    console.log(">>>>> "+ `${untype}`); // standard user

     let val = await dataTable.hashes(); // it will return an array 
     console.log(`>>>>>---- ${val.constructor}`); // function Array() { [native code] }
     console.log(`Object Arr value is >>> : ${JSON.stringify(val)}`);
     // Output is in Data Table.json stored
    
     let un = await $(`#user-name`)

     await un.addValue(val[1].UserName); // locked_out_user

});

// https://regexr.com/ --> Check the regular expression here 
// here two r.expression given means function is containing two arguments

When(/^user logged in (.*) and (.*)$/, async function(un, pw){

console.log(`UserName Is :: >>>> ${un}`);
console.log(`Password Is :: >>>> ${pw}`);

let user = await $(`#user-name`)
let pass = $(`//input[@id="password"]`)

await user.addValue(un);
await pass.addValue(pw);
await browser.pause(5000);


});


When(/^setUp the Header on the login Page$/, async function(){

let eleIs = await $(`//div[text()="Swag Labs"]`)

let valueIS = await eleIs.getText(); // this: IWorld<any>
console.log(`${valueIS}`);

this.appTitle = valueIS;  // -- >> It is not working but written the concept 
console.log(`Header value Stored for this feature >>> ${this.appTitle}`);

});


When(/^call that header in another step here$/, async ()=>{

//console.log(`Header value Stored for this feature in another Step >>> ${this.appTitle}`); 
//-- >> It is not working but written the concept 


});

When(/^user get the id$/, async ()=>{

    //console.log(`Header value Stored for this feature in another Step >>> ${this.appTitle}`); 
    //-- >> It is not working but written the concept 
    
    
    });
    


