// just write this line for commit change testing
import inquirer from "inquirer"
// currency converter API link
let linkApi = " https://v6.exchangerate-api.com/v6/387011d4f04bfe327a3ccc62/latest/PKR"
// fetching data
let func = async (data:any)=>{
    let func = await fetch(data)
    let res = await func.json()
    return res.conversion_rates;
}
let data = await func(linkApi)
// console.log(data)
// through predefine function we will make array of countries list as fetch data through API in object form  
let countries = Object.keys(data);
// console.log(countries)
//getting input from user
let firstCountry = await inquirer.prompt({
    type:"list",
    name:"name",
    message:"Converting From",
    choices:countries
})
// console.log(`Converting from ${firstCountry.name}`)
// getting first country money
let userMoney = await inquirer.prompt({
    type:"number",
    name:"currency",
    message:`Please enter the amount in ${firstCountry.name}`
})
// console.log(userMoney.currency)
// convert country
let secondCountry = await inquirer.prompt({
    type:"list",
    name:"name",
    message:"Converting To",
    choices:countries
})

// conversion rates
// change the link from "" to backtick / through API need changes in link by documentation of API link
let cnv = `https://v6.exchangerate-api.com/v6/387011d4f04bfe327a3ccc62/pair/${firstCountry.name}/${secondCountry.name}`;
// console.log(cnv)
// fetching data from conversion rate
let cnvData = async (data:any)=>{
    let cnvData = await fetch(data)
    let resp = await cnvData.json()
    return resp.conversion_rate
}
let conversion = await cnvData(cnv)
// console.log(conversion)
let convertedTo = userMoney.currency * conversion
console.log(convertedTo)
