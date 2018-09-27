// To run, first run npm install
// then uncomment either of the last two lines or both of them
// run node index.js

const request = require('request-promise') // This library provides a 'promisified' wrapper around the request library imported below
const req = require('request') // Library to simplify making rest requests to a service

/* 
// Javascript is asynchronous and generally works by handling events with callbacks
// This example uses a 'callback' to handle the request response
// Anything that needs to happen after the request is made needs to be within the callback
// otherwise it will likely fail, because the request is still pending when the next line runs
*/
const callbackRequest = () => {   // (err, res, data) => {...} is the anonymous callback function that gets passed, and subsequently triggered when the request completes 
  req.get('https://reddit.com/.json', (err, res, data) => {
    // within the anonymous callback function now
    if(err) return console.log('There was an error getting the data', err)
    data = JSON.parse(data) // Data gets returned as a string, turn it into JSON
    data.data.children.forEach(posting => {
      console.log(posting.data.title)
    })
  })
}

/* 
// This example uses a 'promise' to handle the callback legibly
// This code will do what the code in the function above does, 
// except it uses a promise to handle the callback.
*/
const promiseRequest = () => {
  request.get('https://reddit.com/.json').then(data => {
  data = JSON.parse(data)
  data.data.children.forEach(posting => {
    console.log(posting.data.title)
  })
  }).catch(err => {
    console.log('There was an error getting the data', err)
  })
}

// Uncomment either, or both, of the lines below to try this out.
// callbackRequest()
// promiseRequest()