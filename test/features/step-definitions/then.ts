import { Then } from "@wdio/cucumber-framework";
import * as chai from "chai";

Then(/^Inventory page should list (.*)$/, async function (numbList) {
  if (!numbList) throw Error(`Invalid number:  ${numbList}`);
  // Falsy assertion to check wheather feature file have some value or not

  // Normal Way ::
  let productList = await $$('//div[@class="inventory_item_description"]');

  if (productList.length > 0) {
    let prodLengthIs = productList.length;
    console.log(">>>>>>" + prodLengthIs);
    chai.expect(prodLengthIs).to.equal(parseInt(numbList));

    /* Note :: --> just The equal() in chai operation it will compare === , its typeOf and value.
                      but here in Feature file the data alwaz come in string format So assertion fails here due to this.
                      to Overcome this convert the string to number  using --> parseInt(numbList)

   /**  let productsizeIs;
        for(let i=0; i<productList.length; i++){

        let productsizeIs = await productList[i].getSize();
        console.log(">>>>>>"+productsizeIs); [object Promise] : use await before await productList[i]
        --> >>>>> >>>> >>> >>> This is not working
      }
     console.log(" >> The size of a product is >>>> "+`${productsizeIs}`); 
     --> >>>>> >>>> >>> >>> This is not working     
      */
  }
});

Then(/^Validate all product have valid price$/, async function () {
  /* > Fetch prices and store it into an array.
   > got the price list in New Array 
   > Convert this string to number using map() and remove $ with help of array function remove()
   > Assert if any value is less <=0 
*/

  let priceArray = [];

  let priceList = await $$(".inventory_item_price");

  if (priceList.length > 0) {
    for (let i = 0; i < priceList.length; i++) {
      let itemValue = await priceList[i].getText();
      console.log(itemValue);
      priceArray.push(itemValue);

      /**
       * let valueInt = parseInt(value); 
         console.log("-------- "+valueInt); --> Its giving NaaN
        chai.expect(valueInt).to.be.greaterThan(1);
      */
    }
    console.log(priceArray);

    /** -> Convert this string to number  & replacing dollar '$'
        > map will iterate all the array memeber and provide condintion according to you and than it will provide modefied array.
        > The map method will calls the callback function one time for each element of array. // 3 args take value , idx ,array 
   */

    let priceNumAray = priceArray.map((ele) => +ele.replace("$", ""));
    // + -> uniary plus convert string to number and not change any value
    console.log(">>> price in number >>> " + priceNumAray);

    // Assert if any value is less <=0
    let inValidArray = priceArray.filter((value) => value <= 0);
    /**
       If there is anything lesser than or equal to 0 in value than invalidArray having that value
       If return array i.e inValidArray is null than we are having the write value for every element.
       The length should be 0 for this ele array i.e inValidArray
    */
    chai.expect(inValidArray.length).to.equal(0);
  }
});

Then(
  /^Handle the WebTable as per given mentioned scenarios$/,
  async function () {
    await browser.navigateTo("https://the-internet.herokuapp.com/tables");
    await browser.pause(4000);

    /**
 * 1. Check Number of rows count & cols count 
 * 2. Get whole Table data
 * 3. Get single row based data on condition
 * 4. get single cell value [based on another condition]

*/

    // 2. Get whole Table data
    let wholeTableData = await $$('//table[@id="table1"]/tbody/tr');

    let arraydataIs = [];
    for (let i = 0; i < wholeTableData.length; i++) {
      let dataIs = await wholeTableData[i].getText();
      console.log("Table Data in Loop >> " + dataIs);
      arraydataIs.push(dataIs);

      /** if(dataIs ==='Bach'){ -> will not work 
    console.log(" >>>> 3. in If only - Single Row Based Data On Condition >>> "+dataIs);
    }
    */
    }
    console.log("Table Data stored in Array >> " + arraydataIs);

    // other way for single row based data using filter
    /**   arraydataIs.filter((f)=>{
    
    if(f=== 'Doe'){
        console.log(" >>>> Fetching data using filter >>> "+f);
    }
    */

    // 1. Check Number of rows count & cols count
    let colsCount = await $$('//table[@id="table1"]/thead/tr/th');
    console.log("Cols 1 Length Count is >>> " + colsCount.length);
    // | Last Name | First Name | Email | Due | WebSite | Action

    let rowCount = await $$('//table[@id="table1"]//tbody//tr');
    console.log("Row Count in table >>> " + rowCount.length);

    // 3. Get single row based data on condition - Other way to get Get whole Table data

    // -> //table[@id='table1']//tbody//tr[2]//td -> To fetch data for a specific cell
    // --> This will check further to get the data
    // -> //table[@id='table1']//tbody//tr[2]//td[4] -> To fetch a single value from row

    // -->>> iterate through every single row & col

    let objDataArray = [];

    for (let i = 0; i < rowCount.length; i++) {
      // Its looping Row so creating Obj which have all the keys::
      // Row cols name which storing the data

      let personObject = {
        lastname: "",
        firstname: "",
        email: "",
        due: "",
        web: "",
      };

      for (let j = 0; j < colsCount.length; j++) {
        /** 
                 * Replace row with i and col with j 
                   Now j & i start with 0 than its not gona math it shoud be a whole no. than inc i+1 & j+1.
                   Store it in structured data , to to it in strucured way in Data Structure to perform further action 
                   Note :: use `` sign in locators storing alwz with $(``)
                */

        let valueIs = await $(
          `//table[@id="table1"]/tbody/tr[${i + 1}]/td[${j + 1}]`
        ).getText();
        console.log(`>>> Cell Value is >> : ${valueIs}`);

        // Assign every single values to each object key ::
        if (j === 0) personObject.lastname = valueIs;
        if (j === 1) personObject.firstname = valueIs;
        if (j === 2) personObject.email = valueIs;
        if (j === 3) personObject.due = valueIs;
        if (j === 4) personObject.web = valueIs;
      }

      objDataArray.push(personObject);
    }
    console.log(`whole Table: ${JSON.stringify(objDataArray)}`);
    // Note :: Converts a JavaScript value to a JavaScript Object Notation (JSON) string. -> for objects
    //   "JSON Array containing all the Objects " in demo Folder dynamicTableDataStore Json

    /**
     *
     * Now i need to store these values in obj with key value pair i.e
     * Last Name : Smith , First Name : john with every row data So key remain same and value keep incrementing.
     *
     *
     */
  }
);

Then(/^get Single row based data as third condition$/, async function () {
  // 3. Get single row based data on condition
  // Ex : I will get the row if person Firstname will be : John

  let colDetails = await $$(`//table[@id="table1"]/thead/tr/th`);

  let rowCount = await $$(`//table[@id="table1"]/tbody/tr`);

  //table[@id='table1']/tbody/tr[1]/td[3]

  let objectSingleData = [];

  let rowData = 2;
  for (let i = 0; i < rowCount.length; i++) {
    let personObject = {
      lastname: "",
      firstname: "",
      email: "",
      due: "",
      web: "",
    };

    for (let j = 0; j < colDetails.length; j++) {
      let value = await (
        await $(`//table[@id="table1"]/tbody/tr[${i + 1}]/td[${j + 1}]`)
      ).getText();
      let firstName = await (
        await $(`//table[@id="table1"]/tbody/tr[${i + 1}]/td[${rowData}]`)
      ).getText();

      console.log("values are >>>> " + value);
      console.log("firstName are >>>> " + firstName);

      if (firstName === "Jason") {
        // Assign every single values to each object key ::
        if (j === 0) personObject.lastname = value;
        if (j === 1) personObject.firstname = value;
        if (j === 2) personObject.email = value;
        if (j === 3) personObject.due = value;
        if (j === 4) personObject.web = value;

        // break; --> It willl work for single data let say tomorrow you have to pick multiple data as per condn
        // than in that case use if condn again
        console.log("  >>>>>>>>>  Hello  >>>> ");
      }
    }

    // 1 valid data it will hold rest of the 3 obj will be empty
    if (personObject.firstname) {
      // Only push the data if person object has a valid data in it
      objectSingleData.push(personObject);
    }
  }

  console.log(`Whole Table >>> ${JSON.stringify(objectSingleData)}`);
});

Then(/^get single cell value$/, async () => {
  // 4. get single cell value [based on another condition]

  let arr = [];

  let rowCount = await $$(`//table[@id="table1"]/tbody/tr`);

  for (let i = 0; i < rowCount.length; i++) {
    let cellCount = await $(
      `//table[@id="table1"]/tbody/tr[${i + 1}]/td[4]`
    ).getText();

    arr.push(cellCount);
  }

  console.log(` 4th column >>> ${arr}`);

  // Now filer the data due more than > $ 50
});

Then(/^get the single cell value based on another cell$/, async function () {
  // Now filer the data due more than > $ 50
  //let colDetails = await $$(`//table[@id="table1"]/thead/tr/th`);

  let rowCount = await $$(`//table[@id="table1"]/tbody/tr`);

  let arr = [];

  for (let i = 0; i < rowCount.length; i++) {
    let price = await $(
      `//table[@id="table1"]/tbody/tr[${i + 1}]/td[4]`
    ).getText();
    let firstName = await $(
      `//table[@id="table1"]/tbody/tr[${i + 1}]/td[2]`
    ).getText();

    // price > 50
    if (+price.replace("$", "") > 50) {
      arr.push(firstName);
    }
  }
  // Need to use filter as above for practise furthur // --> o/p :: Single Col Name >>>   Frank,Jason
  console.log(`Single Col Name >>>   ${arr}`);
});

Then(/^learn on how to do Advance scrolling$/, async () => {
  /**
   * SCROLLING ::
   *
   * VISIBLE PORTION ::
   * windows object ::
   * 1. scrollBy
   * Y-> [-]window.innerheight
   *
   *   */

  /**
   * * INVISIBLE PORTION ::
   * windows object ::
   * 1. scrollBy
   * Y-> document.body.scrollTop[scrollHeight]
   * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
   *  Search WebApi in google --> Search Window Object open it -> scroll present -> All method scroll present
   *  https://developer.mozilla.org/en-US/docs/Web/API/Window/scroll
   *  We can enject the JS code also they are async method code using browser.execute() function same as in JS executer in selenium.
   *
   * >> Press cmd + shift + 4 on mac to see the x & y coordinates top x and down y
   * 0 -> x horizontal
   * y -> vertical
   * > On going Top to Bottom changing the y coordinates not x coordinates
   *  */

  await browser.navigateTo("https://www.amazon.com/");
  await browser.pause(3000);

  // scroll Down
  await browser.execute(() => {
    window.scrollBy(0, window.innerHeight);
  });

  await browser.pause(4000);

  // scroll up, () accept another function as an argument
  await browser.execute(() => {
    window.scrollBy(0, -window.innerHeight);
  });

  await browser.pause(4000);

  // For Invisible Portion
  // Scroll Down
  await browser.execute(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });

  await browser.pause(4000);

  await browser.execute(() => {
    window.scrollTo(0, document.body.scrollTop);
  });

  await browser.pause(4000);
});
