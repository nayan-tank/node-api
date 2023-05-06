const url = require('url')

const myUrl = new url.URL('https://www.example.com:8080//p/a/t/h?query=String#hash')

console.log(myUrl.hash)
console.log(myUrl.host);
console.log(myUrl.hostname);
console.log(myUrl.pathname);
console.log(myUrl.href);
console.log(myUrl.origin);
console.log(myUrl.port);
console.log(myUrl.protocol);
console.log(myUrl.search);
console.log(myUrl.searchParams);
console.log(myUrl.password);
