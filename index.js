let arr = [{
    name : "harsh",
    amount : [{amt : 200, date : "12-9-2024"},{amt : 100 , date : "13-9-2024"},]
}]
const obj = {name : "harsh2", amount : [{amt : 200, date : "12-9-2024"}]} 

let updated = false

arr = arr.map(val => {
   if(val.name == obj.name){
    updated = true
    return { ...val, amount: [...val.amount, ...obj.amount]};
   }
   return val
})

if(!updated){
    arr.push(obj)
}
// console.log(arr)
console.log(Array.isArray([{name:'hjsa'}]))
arr.forEach(obj => {
    
    console.log(obj.name)
    obj.amount.forEach(amts => console.log(amts.amt, amts.date))
})