var mysql = require("mysql");
var inquirer = require("inquirer");
var consoletable = require("console.table");
var connection = ("connection.js")

const start = function () {
    inquirer.prompt([
        {    
            type: "list",   
            message: "What would you like to do?",
            name: "main",
            choices: [
                "View All Employees",
                "Add Department",
                "Add Role",
                "Add Employee",
                "View Department",
                "View Role",
                "View Employee",
                "Update Employee Role"]
        },  
    ]).then(answers => {
        console.table(answers);
    
        switch (answers.main) {
            case "View All Employees":
                viewAllEmployees();
                break;

            case "Add Department":
                addDepartment();
                break;

            case "Add Role":
                addRole();
                break;
            
            case "Add Employee":
                addEmployee();
                break;

            case "View Department":
                viewDepartment();
                break;
                
            case "View Role":
                viewRole();
                break;
                
            case "View Employee":
                viewEmployee();
                break;

            case "Update Employee Role":
                updateEmployeeRole();
                break; 
        }
        
    
    })
}

        
function viewAllEmployees() {
  console.log("Selecting all employees...\n");
  connection.query("SELECT * FROM employee", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    connection.end();
  });
}

function addDepartment() {
  inquirer.prompt({
      type: "input",
      message: "Enter Department Name",
      name: "department"
  })
  .then(function(answers) {
      connection.query(
          "INSERT INTO department SET ?",
          {
              name: answers.department
          },
          function(err, answers) {
              if (err) {
                  throw err;
              }
          }
      ),
      console.table(answers);
      start();
  })
}

function addRole() {
    inquirer.prompt({
        type: "input",
        message: "Enter employee title",
        name: "title"
    },
    {
        type: "input",
        message: "Enter employee salary",
        name: "salary"
    },
    {
    type: "input",
    message: "Enter employee department ID",
    name: "departmentid"
    },
    
    )
    .then(function(answers) {
        connection.query(
            "INSERT INTO role SET ?",
            {
                title: answers.title,
                salary: answers.salary,
                department_id: answers.departmentid
            },
            function(err, answers) {
                if (err) {
                    throw err;
                }
            }
        ),
        console.table(answers);
        start();
    })
}

function addEmployee() {
    inquirer.prompt({
        type: "input",
        message: "Enter employee first name",
        name: "firstname"
    },
    {
        type: "input",
        message: "Enter employee last name",
        name: "lastname"
    },
    {
        type: "input",
        message: "Enter employee role ID",
        name: "roleid"
    },
    {
        type: "input",
        message: "Enter employee manager ID",
        name: "managerid"
    },

    )
    .then(function(answers) {
        connection.query(
            "INSERT INTO employee SET ?",
            {
                first_name: answers.firstname,
                last_name: answers.lastname,
                role_id: answers.roleid,
                manager_id: answers.managerid
            },
            function(err, answers) {
                if (err) {
                    throw err;
                }
            }
        ),
        console.table(answers);
        start();
    })
}

function updateEmployee() {
  console.log("Updating employee...\n");
  var query = connection.query(
    "UPDATE products SET ? WHERE ?",
    [
      {
        first_name: ""
      },
      {
        last_name: ""
      }
    ],
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " products updated!\n");
      // Call deleteProduct AFTER the UPDATE completes
      deleteEmployee();
    }
  );

  // logs the actual query being run
  console.log(query.sql);
}

function deleteEmployee() {
  console.log("Deleting employee...\n");
  connection.query(
    "DELETE FROM employee WHERE ?",
    {
      id: 0
    },
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " products deleted!\n");
      // Call readProducts AFTER the DELETE completes
      readEmployee();
    }
  );
}
