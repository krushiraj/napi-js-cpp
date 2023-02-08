const { EvenOdd, helloWorld_Cpp, author } = require("../lib/binding.js");
const assert = require("assert");
//To check if the 
console.log({ EvenOdd, helloWorld_Cpp, author });
assert(helloWorld_Cpp, "The expected function is undefined"); 

assert(author, 'Should be defined');
assert.strictEqual(author, 'TKR', 'Author is not TKR');

function testBasic()
{
    const result =  helloWorld_Cpp("hello");
    assert.strictEqual(result, "world", "Unexpected value returned");
}

assert.doesNotThrow(testBasic, undefined, "testBasic threw an expection");

function testOddEve() {
    const result = EvenOdd(5);
    assert.strictEqual(result, false, '5 is odd');
}

assert.doesNotThrow(testOddEve, undefined, "restOddEve threw an expection");

console.log('AuthorName:', author);
console.log('Is 5 even:', EvenOdd(5));
console.log('Is 100001001 even:', EvenOdd(100001001));
console.log('Is 10000100 even:', EvenOdd(10000100));

console.log("Tests passed- everything looks OK!");