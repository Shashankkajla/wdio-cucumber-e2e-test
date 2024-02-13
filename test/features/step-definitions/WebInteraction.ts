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

/**
 *  >> DropDown Actions ::
 * 
 * 1. Assert default option is selected
 * 2. Select by attribute , text, idx
 * 3. Get a list of Options
 * 
 */


await browser.pause(4000);
let clickDrpDwn = await $('//a[text()="Dropdown"]')
let valueIs = await clickDrpDwn.getText();
console.log("Element clicked ---> "+" "+valueIs);
//clickDrpDwn.scrollIntoView();
await clickDrpDwn.click();
await browser.pause(4000);


//1. Assert default option is selected
let selAssrtValue =  await $('//select/option[@selected="selected"]')
let val= await selAssrtValue.getText();
console.log("======= Select Option Value =====>   ---> " +val);
chai.expect(val).to.equal('Please select an option');


// 2. Select by attribute , text, idx
let select = await $('//select[@id="dropdown"]')
//select.selectByVisibleText("Option 1") -> working
//select.selectByAttribute('value', 1) -> working
select.selectByIndex(2);
await browser.pause(8000);


// 3. Get a list of Options
let tagIs = await $$('//select/option')

// using forEach

tagIs.forEach(async (e)=>{

   let text = await e.getText();
    console.log(text);

})
// Note -->  this for each would not support async Function with argument e , So bydefault this case would not work out.

// goiing with standard way now ...
let arr= [];
for(let i=0; i<tagIs.length; i++){

   let eleVal= await tagIs[i].getText();
   console.log("Text Value " +eleVal);
   arr.push(eleVal);

    if(eleVal==='Option 1'){

        await tagIs[i].click();
        await browser.pause(6000);
        console.log(">>>>>> Element clicked >>>>>>> " + await tagIs[i].getText());
    }


   // Note :: Whenever Option promise would show than means you missed to add await during getText() and other function.

    }
    console.log("Array Options are ===> " +`await ${arr}`);
    // Array Options are ===> Please select an option,Option 1,Option 2

    if(tagIs.length > 1){
        await browser.back();
        console.log(" ----- DropDown Handling completed ---- Going Back -----");
    }

})


When(/^Perform CheckBox Handling$/, async ()=>{

/**
 * 3. CheckBox ::
 * 
 * 1. Select an Option
 * 2. UnSelect an Option
 * 3. Assert if option are selected
 * 4. Select all Option
 */

// 1. , 2 Select & un Select an Option : same for selected one 

   let checkbox = await $('//a[text()="Checkboxes"]')
   await checkbox.click();
   await (await $('(//input[@type="checkbox"])[1]')).click();
   console.log("CheckBox Clicked 1 === > >> ");
   await (await $('(//input[@type="checkbox"])[2]')).click(); // unselected
   await browser.pause(4000);

  // 4. select all option

   let selectCheckBox= await $$('//input[@type="checkbox"]')

   let checkBoxes = [];
   for(let i=0; i<selectCheckBox.length; i++){

    await selectCheckBox[i].click();
    let s = await selectCheckBox[i].getText();
    console.log("CheckBoxes Values ===>>>>> "+s);
    checkBoxes.push(s);

   }

   console.log("Array Values --->>> "+`${checkBoxes}`);

   let selectedCheckBoxAssertIs = await $('(//input[@type="checkbox"])[2]')

   if(await selectedCheckBoxAssertIs.isSelected()){

    let x = await selectedCheckBoxAssertIs.getText();
    console.log("CheckBox is already Selected with this value ----> "+x);

    await browser.pause(4000);

   }

   for(let j=0; j<selectCheckBox.length; j++){

    if(!(await selectCheckBox[j].isSelected())){

        await selectCheckBox[j].click();
        console.log("All CheckBox Selected !!");
    }
   }

   await browser.pause(6000);

   let sel = await selectedCheckBoxAssertIs.isSelected() // pass in this manner 

 chai.expect(sel).to.be.true // working now 

 await browser.back();


})


When(/^performing Window Handling$/, async ()=>{


    /**
     *  Window Handling ::
     * 1. Open Another window i.e 2 windows
     * 2. Switch to the window based on Title
     * 3. Switch back to the main window
     * 
     *  Method used ::
     * 1. getTitle()
     * 2. getWindowHandle()
     * 3. getWindowHandles()
     * 4. switchToWindow(), switchWindow() // pass url or Title to switch 
     * 5. closeWindow()
     * 
     */

let windowHandlingClick = await $('//a[text()="Multiple Windows"]')
await windowHandlingClick.click();

let clickHere = await $('//a[text()="Click Here"]')
await clickHere.click();
console.log("New Window has Opened >>>>> "+ await clickHere.getText());

//1. Open Another window i.e 2 windows
let elementalSelenium = await $('=Elemental Selenium')
await elementalSelenium.click();

let current_windowTitle = await browser.getTitle()
console.log("Current window Title >>>> "+current_windowTitle);

chai.expect(current_windowTitle).to.equal('The Internet')
await browser.pause(6000);

//2. Switch to the window based on Title

// -->> getWindowHandles() : returns the String array getWindowHandles(): Promise<string[]>

     let parentWindow =await browser.getWindowHandle(); // Holding parent window context

     // To switch On Specific Window 
     let windowContext = await browser.getWindowHandles(); // return the list of Windows which opened 


     for(let i=0; i<windowContext.length; i++){
     
        console.log(windowContext[i]);
        // gives the unique ID' S
        //'49C92708D89D44F74AA09FCF03AC78AF', which is unique everyy time
        //'4A1ED0B0C7D782D519AB338D5D7D0764',
       //'65977E312D2B3B61C0B517138F1617C2'

       await browser.switchToWindow(windowContext[i]);
             let titleIs = await browser.getTitle();

             if(titleIs==='Home | Elemental Selenium'){

                await browser.switchToWindow(windowContext[i]);

                let childText= await $('//*[text()="Elemental Selenium"]')
                let titleChildIs = await childText.getText();
                console.log("Child Window switched Title Is >>>>> "+titleChildIs);
                chai.expect(titleChildIs).to.equal("Elemental Selenium");
                
                await browser.closeWindow();
                await browser.pause(3000);

                break;

             }

             await browser.switchToWindow(parentWindow);
             let titleCheck  = await browser.getTitle();
             console.log(">>>>>>> >>>> "+titleCheck);
             chai.expect(titleCheck).to.equal('The Internet');
             await browser.pause(5000);

     }


           await browser.switchWindow("https://the-internet.herokuapp.com/windows/new"); // pass the url or tilte to switch 
           await browser.closeWindow();

           
           await browser.switchToWindow(parentWindow);
           let titleCheck1  = await browser.getTitle();
            console.log(" Title Check 1 >>>>>>> >>>> "+titleCheck1);
           chai.expect(titleCheck1).to.equal('The Internet');
           await browser.back();
           await browser.pause(4000);

           
})



When(/^performing AlertPop Handling$/, async function(){


/**
 *   Handling Alerts & Browser Authentication & Prompt Alert where we need to type something
 * 
 *  1. isAlertOpen()
 *  2. acceptAlert()
 *  3. dismissAlert()
 *  4. getAlertText()
 *  5. sendAlertText()
 * 
 */

    let openAlrt = await $('//a[text()="JavaScript Alerts"]')
        await openAlrt.click();
        await browser.pause(3000);

        // 2. acceptAlert()
        let clickJsAlertBtn= await $('//button[text()="Click for JS Alert"]')
        console.log("Get Text Of Click Alert ---> "+await clickJsAlertBtn.getText());
        await clickJsAlertBtn.click();
        await browser.pause(3000);

        await browser.acceptAlert();
        
        // 3. dismissAlert()
        let clickJsDismissBtn = await $('//button[text()="Click for JS Confirm"]') 
        await clickJsDismissBtn.click();

        await browser.dismissAlert();
        await browser.pause(3000);

        await clickJsDismissBtn.click();

        // 1. isAlertOpen(), 4. getAlertText()
        if(await browser.isAlertOpen()){
        
        let alertText = await browser.getAlertText();
        console.log(">>>>> Alert Text Is " +alertText);
        chai.expect(alertText).to.equal("I am a JS Confirm");

        await browser.dismissAlert();
        console.log("Alert Dismissed from if Block");
        await browser.pause(3000);

        }

       // 5. sendAlertText()
        let promptAlert = await $('//button[text()="Click for JS Prompt"]')
        await promptAlert.click();
        await browser.sendAlertText("Hello");
        await browser.pause(3000);

        // Browser Authentication ::
        // https://admin:admin@the-internet.herokuapp.com/
        // admin : un & admin : pw --> need to pass in url for this 

        await browser.back();
        await browser.pause(3000);
    
})

   When(/^performing File Uploads$/, async ()=>{

    (await $('//a[text()="File Upload"]')).click();
    // As input tag present than its easy to upload file

    console.log(`${process.cwd()}`);  // is a method tha will give you the current working directory
    (await $('//input[@type="file" and @name="file"]')).addValue(`${process.cwd()}/data/PandPhoto.jpeg`);

    // Generally to find path within the Framework use ../ -> ist for the parent ../ -> it takes to further level
    // .addValue("../../../data/PandPhoto.jpeg");

    await browser.pause(2000);
    (await $('//input[@value="Upload"]')).click();
    await browser.pause(6000);

    // use relative path : ${process.cwd()}
    await browser.back();
    await browser.back();
    await browser.pause(3000);

   })

   When(/^performing Frames Handling$/, async ()=>{

   /**
    * 1. switchToFrame()
    * 2. switchToParentFrame()
    */

    // Note : When frame present element wasn't found error will occur
    (await $('//a[text()="Frames"]')).click();
    await browser.pause(2000);
    (await $('//a[text()="iFrame"]')).click();

    // Generally start with <iFrame> tag 
    await browser.pause(9000);
    let frame = await $('//iframe[@title="Rich Text Area"]');

    console.log("Is Frame Present ?? ----> "+await frame.isDisplayed());
   
    if(await frame.isDisplayed()){
   
    await browser.switchToFrame(frame);
    console.log("Frame switched ====>>>>>" +await frame.getText());
    let type= await $('//body[@aria-label="Rich Text Area. Press ALT-0 for help."]')
    await type.setValue(">>>> Hello Frame >>> ");
    await browser.pause(4000);

      await browser.switchToParentFrame();
      console.log("Switched Back to parent");
      let text = await $('//h3[text()="An iFrame containing the TinyMCE WYSIWYG Editor"]');

     let mnc = await text.getText();
     chai.expect(mnc).to.equal("An iFrame containing the TinyMCE WYSIWYG Editor");
    
     }


   })

   When(/^performing keyPress and scrolling$/, async function(){

    //     await browser.keys("Enter");
    //     await browser.keys([Key.Ctrl, 'a'])

    /**
     * Basic Scrolling ::
     * 1. scrollIntoView() : accept boolean by default it will be true , if change flag to false the ele come to see in bottom.
     * 
     *   await ele.scrollIntoView();
     * 
     */

   })

   