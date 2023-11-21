const express = require("express");
const cors = require("cors"); // Require the CORS package
const app = express();
const port = 3000;

// const crypto = require("crypto");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//web token
var jwt = require("jsonwebtoken");
const JWT_SECRET = "secret";
const { auth } = require("./middleware");

// Enable CORS for all routes and origins
app.use(cors());

let User_Token = "";
let isLoggedin = false;
let USER_ID_COUNTER = 1;

// function generate_token(length) {
//   User_Token = crypto.randomBytes(length).toString("hex");
//   return User_Token;
// }

const users = [];

const Problems = [
  {
    probid: "1",
    title: "Eliminate Maximum Number of Monsters",
    acceptance: "45%",
    difficulty: "Medium",
    description: `
    You are playing a video game where you are defending your city from a group of n monsters.
    You are given a 0-indexed integer array dist of size n, where dist[i] is the initial distance
    in kilometers of the ith monster from the city.

    The monsters walk toward the city at a constant speed. The speed of each monster is given to
    you in an integer array speed of size n, where speed[i] is the speed of the ith monster in
    kilometers per minute.`,
    testcases: [
      {
        Input: "dist = [1,3,4], speed = [1,1,1]",
        Output: "5",
        Explaination:
          "In the beginning, the distances of the monsters are [1,3,4]. You eliminate the first monster.After a minute, the distances of the monsters are [X,2,3]. You eliminate the second monster.",
      },
      {
        Input: "dist = [1,1,2,3], speed = [1,1,1,1]",
        Output: "1",
        Explaination:
          "In the beginning, the distances of the monsters are [1,1,2,3]. You eliminate the first monster.After a minute, the distances of the monsters are [X,0,1,2], so you lose.You can only eliminate 1 monster.",
      },
      {
        Input: "dist = [3,2,4], speed = [5,3,2]",
        Output: "1",
        Explaination:
          "In the beginning, the distances of the monsters are [1,3,4]. You eliminate the first monster.After a minute, the distances of the monsters are [X,2,3]. You eliminate the second monster.",
      },
    ],
  },
  {
    probid: "2",
    title: "smallest element vidyadhar",
    difficulty: "Easy",
    acceptance: "60%",
    description: "given array,return the min element of the array",
    testcases: [
      {
        Input: "dist = [3,2,4], speed = [5,3,2]",
        Output: "1",
        Explaination:
          "In the beginning, the distances of the monsters are [1,3,4]. You eliminate the first monster.After a minute, the distances of the monsters are [X,2,3]. You eliminate the second monster.",
      },
    ],
  },
  {
    probid: "3",
    title: "New problem element",
    difficulty: "Hard",
    acceptance: "28%",
    description: "given array,return the min element of the array",
    testcases: [
      {
        input: "[1,2,3,4]",
        output: "4",
      },
    ],
  },
];

const submissions = [
  // {
  //   userid: "1",
  //   questionid: "1",
  //   code: "",
  //   status: "accepted",
  // },
  // {
  //   userid: "1",
  //   questionid: "1",
  //   code: "",
  //   status: "rejected",
  // },
];

app.get("/", (req, res) => {
  //return the users submission for this problem
  res.send("Leet Code CLone Backend");
});

app.get("/problems", (req, res) => {
  //return the user all the questions from Questions array

  const filteredProblems = Problems.map((x) => ({
    title: x.title,
    acceptance: x.acceptance,
    difficulty: x.difficulty,
    probid:x.probid
  }));

  res.status(200).send({ success: true, problems: filteredProblems });
});

app.get("/problem/:id", (req, res) => {
  //return the user all the questions from Questions array
  const probid = req.params.id;

  const problem = Problems.find((x) => {
    return probid === x.probid;
  });

  if (!problem) {
    res.status(411).send({ success: true, problem: {} });
  } else {
    res.status(200).send({ success: true, problem: problem });
  }
});

app.get("/me/:userid",auth,(req, res) => {
  const user = users.find((x) => x.id === req.params.userid);
  res.json({ email: user.email, id: user.id });
});

app.get("/users", (req, res) => {
  return res.json({ users });
});

app.post("/signup", (req, res) => {
  console.log(req.body)
  const email = req.body.email;
  const password = req.body.password;
  if (users.find((x) => x.email === email)) {
    return res.status(403).json({ msg: "Email already exists" });
  }

  users.push({
    email,
    password,
    id: (USER_ID_COUNTER++).toString(),
  });

  return res.json({
    msg: "Success",
  });
});

app.post("/login", (req, res) => {
  //logic to decode request body



  const { email, password } = req.body;
  const user = users.find((i) => i.email === email);


  if (user) {
    const passCheck = users.find(
      (user) => email === user.email && password === user.password
    );
    if (passCheck) {
      const token = jwt.sign(
        {
          id: user.id,
        },
        JWT_SECRET
      );
      return res.json({ token,userid:user.id });
    } else {
      res
        .status(400)
        .send({ success: false, description: "incorrect password!" });
    }
  } else {
    res.status(400).send({ success: false, description: "user doesnt exist" });
  }
});

app.get("/submissions/:problemId", (req, res) => {
  //return the users submission for this problem
  const probid = req.params.problemId;
  // console.log(submissions)
  const submissionsf = submissions.filter(
    (x) => x.problemId === probid && x.userid === req.userid
  );
  res.status(200).send({ success: true, submissions: submissionsf });
});

app.post("/submissions", auth, (req, res) => {
  const isCorrect = Math.random() < 0.5;
  const problemId = req.body.problemId;
  const submission = req.body.submission;
  const userid = req.body.userid;

  console.log(submissions)

  if (isCorrect) {
    submissions.push({
      submission,
      problemId,
      userId: userid,
      status: "AC",
    });
    return res.json({
      status: "AC",
    });
  } else {
    submissions.push({
      submission,
      problemId,
      userId: userid,
      status: "WA",
    });
    return res.json({
      status: "WA",
    });
  }
});

app.get("/submissions", (req, res) => {
  return res.json({ submissions });
});

// app.post("/addquestion", (req, res) => {
//   const { title, description, questionid, testcases } = req.body;
//   const found = users.find(
//     (user) => user.userid === userid && user.isAdmin === true
//   );
//   if (found) {
//     Questions.push({
//       questionid: questionid,
//       title: title,
//       description: description,
//       testcases: testcases,
//     });
//     res
//       .status(200)
//       .send({ success: true, description: "question added successfully!" });
//   } else {
//     res.status(400).send({
//       success: false,
//       description: "Error adding question , ensure admin rights!",
//     });
//   }
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
