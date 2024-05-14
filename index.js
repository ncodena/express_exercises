import express from "express";
const app = express();
import axios from "axios";
import fs from "fs";

import cluster from "cluster";
import http from "http";
import os from "os";

const port = process.env.PORT || 8000;
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Exercise 2
app.get("/", (req, res) => {
  res.send(`
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>Hello</title>
        </head>
        <body>
          How are you?
        </body>
      </html>
    `);
});

//Exercise 3
//We now want that when the user sends a GET request to the home (http://localhost:3000/) it sends back an HTML file with :
app.delete("/", (req, res) => {
  res.json({ good: "yep" });
});

//Exercise 4
//Render this EJS code if the user accesses the URL /test-ejs and render this page with my first title as value of the myTitle variabl
app.get("/test-ejs", (req, res) => {
  res.render("test", { myTitle: "My First Title" });
});

//Exercise 5 Let’s render another page at/test-ejs2 and create an EJS page that uses the forEach method to list each element.
app.get("/test-ejs2", (req, res) => {
  const users = ["Bob", "John", "Jane"];
  res.render("test2", { users });
});

//Exercise 6
// Create a basic HTML form with two input fields for userName and message, and send it back to the user whenever they visit /uploadTweet . The form needs a method of POST  and an action of /showTweet , the route we are submitting the form to.
app.get("/uploadTweet", (req, res) => {
  res.send(`
      <html>
        <head></head>
        <body>
          <form method="POST" action="/showTweet">
            <input type="text" name="userName" placeholder="User Name">
            <input type="text" name="message" placeholder="Message">
            <input type="submit" value="Submit">
          </form>
        </body>
      </html>
    `);
});
//When the user submits the form from the '/uploadTweet' page, it sends a POST request to this path.
app.post("/showTweet", (req, res) => {
  console.log(req.body);
  const { userName, message } = req.body;
  //These lines log the values of 'userName' and 'message' to the server's console for debugging purposes. They will show the submitted data in the server's terminal.
  console.log("User Name:", userName);
  console.log("Message:", message);
  res.send("Tweet submitted successfully");
});

//Exercise 7 Create a basic HTML form with two input fields for search and date, and send it back to the user whenever they visit /searchForm . The form needs a method of GET  and an action of /notGoogleSearch , the route we are submitting the form to.
app.get("/searchForm", (req, res) => {
  res.send(`
      <html>
        <head></head>
        <body>
          <form method="GET" action="/notGoogleSearch">
            <input type="text" name="search" placeholder="Search">
            <input type="text" name="date" placeholder="Date">
            <input type="submit" value="Search">
          </form>
        </body>
      </html>
    `);
});

app.get("/notGoogleSearch", (req, res) => {
  const { search, date } = req.query;
  console.log("Search Query:", search);
  console.log("Date:", date);
  res.send("Search submitted successfully");
});

//Exercise 8
//Create a route of the type /number/1 where the number will be a variable :id and will be displayed on the page. E.g. on the route /number/1337 we will see:
app.get("/number/:id", (req, res) => {
  const { id } = req.params;
  res.send(`The number is ${id}`);
});

//Exercise 9
//Add Axios to your project et create a GET request on http://jsonplaceholder.typicode.com/posts/1 when the user visits http://localhost:3000/postlist.
app.get("/postlist", async (req, res) => {
  try {
    const response = await axios.get(
      "http://jsonplaceholder.typicode.com/posts/1"
    );
    fs.writeFileSync("posts.json", JSON.stringify(response.data, null, 2));
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//Exercise 11

//Install npm install pm2
//Start app with pm2: pm2 start index.js

//Exercise 12: Create a server for your website with 1 cluster.
// const port2 = 3000
// if (cluster.isPrimary) {
//     const numCPUs = os.cpus().length;
//     for (let i = 0; i < numCPUs; i++) {
//         cluster.fork();
//     }
//     cluster.on('exit', (worker, code, signal) => {
//         console.log(`Worker ${worker.process.pid} died`);
//     });
// } else {
//     const server = http.createServer((req, res) => {
//         res.writeHead(200, { 'Content-Type': 'text/plain' });
//         res.end('Hello, World!\n');
//     });

//     server.listen(port2, () => {
//         console.log(`Worker ${process.pid} started on port ${port2}`);
//     });
// }
//Exercise 13: Nodemon

//Exercise 14
//pm2 logs
//pm2 monit

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
