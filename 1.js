const getType = require('./out/getType').default
const { isSameScheme } = require('./out/getType')
const t = getType(`{a:100,b:[10,'ww'],c:'100'}`);
// const t = getType(`[1,'222,',[[133], '123',], { a: [123,{aaa:['www',1]}] }]`);
console.log(t);
// console.log(isSameScheme([1,{ c: 22,d:[null] },3], [2,{c: 1 ,d:[null]},1]));
