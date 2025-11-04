//let arr = [11,21,33,44,50];

// arr.forEach(function printVal(val) { // each val at each index
//     console.log(val);
// })

// arr.forEach((val) => {
//     console.log(val*val);
// })

// let calSqure = (arr) => {
//     console.log(arr*arr);
// }

// arr.forEach((arr) => {
//     console.log(arr*arr);
// })

//arr.forEach(calSqure);

//let arr = [77,1,45];

// let newArr = nums.map((val) => {
//     return val*val;
// })
// console.log(newArr);

// let evenArr = arr.filter((val) => {
//     return val>3;
// })

// const output = arr.reduce((res , curr) => {  // res => previous
//     return res + curr;
// })

//const output = arr.reduce((prev, curr) => {
    // if(prev > curr) {
    //     return prev;
    // }else {
    //     return curr;
    // }
    //return prev > curr ? prev : curr;
//})

//console.log(output);

// let marks = [90,78,93,32,12, 95];

// let toppers  = marks.filter((val) => {
//     return val >= 90;
// })

// console.log(toppers);
let n = prompt("Enter a number : ");

let arr = [];

for(let i=1; i<=n; i++) {
    arr[i-1] = i; 
}
console.log(arr);

// const sum = arr.reduce((prev, curr) => {
//     return prev+curr;
// })
// console.log("sum of 1 to given number : ", sum);

const product = arr.reduce((prev, curr) => {
    return curr * prev;
})

console.log("product of 1 to given number : ", product);
