const express = require('express')
const app = express()
const port = 3000

const users = [];

const Questions = [
  {
    title: "two states",
    description: "given array, return the max of the array",
    testcases: [{
      input: "[1,2,3,4,5]",
      output: "5"
    }]
  }
];

const submissions = [
  {
    userid:"1",
    questionid:"1",
    code:"",
    status:"accepted"
  }, 
  {
    userid:"1",
    questionid:"1",
    code:"",
    status:"rejected"
  }];


app.post('/signup', (req, res) => {
  //logic to decode request body

  //body to have email and password

  //store the email and pass in the users array if the email is absent

  //return 200 status code to client

  res.send('sign up route')
})

app.post('/login', (req, res) => {

  //logic to decode request body

  //body to have email and password

  //check if email is present

  //if the password matches send 200 to client else return 400

  //send back token in response if 200 code (random string works for now)

  //check chat gpt on how authentication tokens work and get generated

  res.send('login route')
})

app.get('/questions', (req, res) => {
  //return the user all the questions from Questions array

  res.send('<html><body><h1>questions route</h1></body></html>')
})

app.get('/submissions', (req, res) => {
  //return the users submission for this problem
  res.send('submissions route')
})

app.post('/submissions', (req, res) => {
  //let the user submit a solution for a prob, accept or return the solution
  res.send('submissions route')
})

//hard todo
//create a route that lets an admin add a new problem
//ensure the user is an admin before adding the problem


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})