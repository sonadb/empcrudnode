const express = require("express");

const mysql = require("mysql");

const db = mysql.createConnection({

  host: "localhost",

  user: "root",

  password: "root",

  database: "employee2",

});

db.connect((err) => {

  if (err) {

    throw err;

  }

  console.log("MySql Connected");

});

const app = express();

app.get("/createdb", (req, res) => {

  let sql = "CREATE DATABASE nodemysql";

  db.query(sql, (err) => {

    if (err) {

      throw err;

    }

    res.send("Database created");

  });

});

app.get("/createemployee", (req, res) => {

  let sql =
   db.query(sql, (err) => {

    if (err) {

      throw err;

    }

    res.send("Employee table created");

  });

});

app.get("/employee1", (req, res) => {

  let post = { name: "Jake Smith", designation: "Chief Executive Officer" };

  let sql = "INSERT INTO employee SET ?";

  let query = db.query(sql, post, (err) => {

    if (err) {

      throw err;

    }

    res.send("Employee 1 added");

  });

});

app.get("/updateemployee/:id", (req, res) => {

  let newName = "Updated name";

  let sql = `UPDATE employee SET name = '${newName}' WHERE id = ${req.params.id}`;

  let query = db.query(sql, (err) => {

    if (err) {

      throw err;

    }

    res.send("Post updated...");

  });

});

app.get("/deleteemployee/:id", (req, res) => {

  let sql = `DELETE FROM employee WHERE id = ${req.params.id}`;

  let query = db.query(sql, (err) => {

    if (err) {

      throw err;

    }

    res.send("Employee deleted");

  });

});

 

app.listen("3000", () => {

  console.log("Server started on port 3000");

});