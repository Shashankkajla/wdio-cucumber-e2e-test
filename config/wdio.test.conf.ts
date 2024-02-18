import {config as baseConfig} from "../wdio.conf" 
// As we know about config we are making alias as baseConfig coz config is a key which 
//already present in wdio.conf file from where the execution starts.

export const config = Object.assign(baseConfig,{

// env specific key value pair 
 environment : "Test",
 sauseDemoUrl: "https://www.saucedemo.com",
 TestUn: "locked_out_user",
 TestPw: "secret_sauce"

})

// We are assig in same way its in wdioconf.ts , So at run time WDIo understand we have a config file with addiotional two values.