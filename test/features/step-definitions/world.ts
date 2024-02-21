import { setWorldConstructor } from "@cucumber/cucumber";

// You can add many values according to your requirement.

class CustomWorld {
  testID: string 
  appTitle: string

  constructor() {
    this.appTitle = "",
    this.testID = ""
  }
}

setWorldConstructor(CustomWorld);
