const express = require('express')
const app = express()
const port = 3000

const crypto = require("crypto");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let User_Token = "";
let isLoggedin = false;

function generate_token(length) {
  User_Token = crypto.randomBytes(length).toString("hex");
  return User_Token;
}

const users = [{
  userid: "1",
  email: "1@gmail.com",
  password: "123456",
  isAdmin: true
}, {
  userid: "2",
  email: "2@gmail.com",
  password: "123456",
  isAdmin: false
}];

const Questions = [
  {
    questionid: "1",
    title: "two states",
    description: "given array, return the max of the array",
    testcases: [{
      input: "[1,2,3,4,5]",
      output: "5"
    }]
  },
  {
    questionid: "2",
    title: "smallest element",
    description: "given array,return the min element of the array",
    testcases: [{
      input: "[1,2,3,4]",
      output: "4"
    }]
  }
];

const submissions = [
  {
    userid: "1",
    questionid: "1",
    code: "",
    status: "accepted"
  },
  {
    userid: "1",
    questionid: "1",
    code: "",
    status: "rejected"
  }];


app.get('/', (req, res) => {
  //return the users submission for this problem
  res.send("Leet Code CLone Backend")
})


app.post('/signup', (req, res) => {
  //logic to decode request body

  //body to have email and password

  //store the email and pass in the users array if the email is absent

  //return 200 status code to client

  const { email, password } = req.body
  const isAdmin = req.body.isAdmin

  const found = users.find((user) => user.email === email)

  if (found) {
    res.status(400).send({ success: false, description: "email already exists" })
  } else {
    const isAdmin1 = isAdmin ? isAdmin : false
    users.push({ email: email, password: password, isAdmin: isAdmin1 })
    res.status(400).send({ success: true, description: "user signed up succesfully!" })
  }


})

app.post('/login', (req, res) => {

  //logic to decode request body

  const { email, password, isAdmin } = req.body

  const found = users.find((i) => i.email === email)

  if (found) {
    const passCheck = users.find((user) => found.email === user.email && found.password === user.password)
    if (passCheck) {
      res.status(200).send({ success: true, description: "user Logged in successfully!", User_Token: generate_token(20) })
    } else {
      res.status(400).send({ success: false, description: "incorrect password!" })
    }
  } else {
    res.status(400).send({ success: false, description: "user doesnt exist" })
  }

  //body to have email and password

  //check if email is present

  //if the password matches send 200 to client else return 400

  //send back token in response if 200 code (random string works for now)

  //check chat gpt on how authentication tokens work and get generated

})

app.get('/questions', (req, res) => {
  //return the user all the questions from Questions array

  res.status(200).send({ success: true, questions: Questions })
})

app.get('/submissions', (req, res) => {
  //return the users submission for this problem
  res.status(200).send({ success: true, submissions: submissions })
})

app.post('/submissions', (req, res) => {
  //let the user submit a solution for a prob, accept or return the solution
  const { userid, questionid, code, status } = req.body
  submissions.push({ userid: userid, questionid: questionid, code: code, status: status })
  res.status(200).send({ success: true, description: "submission added successfully!" })
})

//hard todo
//create a route that lets an admin add a new problem
//ensure the user is an admin before adding the problem

app.post('/addquestion', (req, res) => {
  const {title, description, questionid, testcases } = req.body
  const found = users.find((user) => user.userid === userid && user.isAdmin === true)
  if (found) {
    Questions.push({ questionid: questionid, title: title, description: description, testcases: testcases })
    res.status(200).send({ success: true, description: "question added successfully!" })
  } else {
    res.status(400).send({ success: false, description: "Error adding question , ensure admin rights!" })
  }
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})