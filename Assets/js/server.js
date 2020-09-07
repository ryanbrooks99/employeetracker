var mysql = require("mysql");
var inquirer = require("inquirer");
var consoletable = require("console.table")

var connection = mysql.createConnection({
    host: "localhost",
  
    // Setting port
    port: 3306,
  
    // username
    user: "root",
  
    // password
    password: "rootroot",
    database: "tracker_db"
  });
   // making connection or throw error
   connection.connect(function(err) {
    if (err) throw err;
    // console.log("connected as id " + connection.threadId);
    afterConnection();
  });

const afterConnection = function () {
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
                "Update Employee Role",
                "Exit"]
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

            case "Exit":
            connection.end();;
            break;
        }
        
    
    })
}
        
function viewAllEmployees() {
  console.log("Selecting all employees...\n");
  connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department_name, role.salary, employee.manager_id FROM department INNER JOIN role ON department.id = role.department_id INNER JOIN employee ON employee.role_id = role.id",
  function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    afterConnection();
  });
}

function addDepartment() {
  inquirer.prompt([
{
      type: "input",
      message: "Enter Department Name",
      name: "department"
  }
])
  .then(function(answers) {
      connection.query(
          "INSERT INTO department SET ?",
          {
              department_name: answers.department
          },
          function(err, answers) {
              if (err) {
                  throw err;
              }
              console.log(answers);
              afterConnection();
          }
      )
      
  })
}

function addRole() {
    inquirer
    .prompt([
      {
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
        message: "Enter employee department id",
        name: "departmentid"
      }
    ])
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
          console.table(answers);
        }
      );
      afterConnection();
    });
}

function addEmployee() {
    inquirer.prompt([
    {
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
])
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
        afterConnection();
    })
}

function viewDepartment() {
    console.log("Selecting all departments...\n");
    connection.query("SELECT * FROM department", function(err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.table(res);
      afterConnection();
    });
}

function viewRole() {
    console.log("Selecting all roles...\n");
    connection.query("SELECT * FROM role", function(err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.table(res);
      afterConnection();
    });
}

function viewEmployee() {
    console.log("Selecting all employees...\n");
    connection.query("SELECT * FROM employee", function(err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.table(res);
      afterConnection();
    });
}

function updateEmployeeRole() {
    let allemp = [];
    connection.query("SELECT * FROM employee", function(err, answers) {
      for (let i = 0; i < answers.length; i++) {
        let employeeString = answers[i].id + " " + answers[i].first_name + " " + answers[i].last_name;
        allemp.push(employeeString);
      }
  
      inquirer.prompt([
          {
            type: "list",
            name: "updateEmpRole",
            message: "Select employee to update role..",
            choices: allemp
          },
          {
            type: "list",
            message: "Select new role..",
            choices: ["Manager", "Employee"],
            name: "newrole"
          }
        ])
        .then(function(answers) {
          console.log("Waiting to update..", answers);
          const idToUpdate = {};
          idToUpdate.employeeId = parseInt(answers.updateEmpRole.split("")[0]);
          if (answers.newrole === "Manager") {
            idToUpdate.role_id = 1;
          } else if (answer.newrole === "Employee") {
            idToUpdate.role_id = 2;
          }
          connection.query(
            "UPDATE employee SET role_id = ? WHERE id = ?",
            [idToUpdate.role_id, idToUpdate.employeeId],
            function(err, data) {
              afterConnection();
            }
          );
        });
    });
}
