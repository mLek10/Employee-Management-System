const inquirer = require('inquirer');
const mysql = require('mysql');

// Create a connection to the MySQL database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Gizmosue1!',
  database: 'employee_db',
});

// Connect to the database
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database');
  startApp();
});

// Function to start the application
function startApp() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          'Add a department',
          'Add a role',
          'Add an employee',
          'Update an employee role',
          'Exit',
        ],
      },
    ])
    .then((answer) => {
      switch (answer.action) {
        case 'View all departments':
          viewDepartments();
          break;
        case 'View all roles':
          viewRoles();
          break;
        case 'View all employees':
          viewEmployees();
          break;
        case 'Add a department':
          addDepartment();
          break;
        case 'Add a role':
          addRole();
          break;
        case 'Add an employee':
          addEmployee();
          break;
        case 'Update an employee role':
          updateEmployeeRole();
          break;
        case 'Exit':
          connection.end();
          break;
      }
    });
}
// Function to view all departments
function viewDepartments() {
  const query = 'SELECT * FROM department';
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    startApp();
  });
}
// Function to view all roles
function viewRoles() {
  const query = 'SELECT * FROM role';
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    startApp();
  });
}
// Function to view all employees
function viewEmployees() {
  const query = 'SELECT * FROM employee';
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    startApp();
  });
}
// Function to add a department
function addDepartment() { 
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'department',
        message: 'Enter the name of the department:',
      },
    ])
    .then((answer) => {
      const query = 'INSERT INTO department SET ?';
      connection.query(query, { name: answer.department }, (err, res) => {
        if (err) throw err;
        console.log('Department added successfully!');
        startApp();
      });
    });
}
// Function to add a role
function addRole() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'title',
        message: 'Enter the title of the role?',
      },
      {
        type: 'input',
        name: 'salary',
        message: 'Enter the salary of the role?',
      },
      {
        type: 'input',
        name: 'department_id',
        message: 'Enter the department id of the role?',
      },
    ])
    .then((answer) => {
      const query = 'INSERT INTO role SET ?';
      connection.query(query, answer, (err, res) => {
        if (err) throw err;
        console.log('Role added successfully!');
        startApp();
      });
    }
    );
}

// Function to add an employee
function addEmployee() {
  inquirer
  .prompt([
    {
      type: 'input',
      name: 'first_name',
      message: 'Enter the first name of the employee:',
    },
    {
      type: 'input',
      name: 'last_name',
      message: 'Enter the last name of the employee:',
    },
    {
      type: 'input',
      name: 'role_id',
      message: 'Enter the role id of the employee:',
    },
    {
      type: 'input',
      name: 'manager_id',
      message: 'Enter the manager id of the employee:',
    },
  ])
.then((answer) => {
  const query = 'INSERT INTO employee SET ?';
  connection.query(query, answer, (err, res) => {
    if (err) throw err;
    console.log('Employee added successfully!');
    startApp();
  });
});
}
// Function to update an employee role
function updateEmployeeRole() {
  inquirer
  .prompt([
    {
      type: 'input',
      name: 'employee_id',
      message: 'Enter the id of the employee you would like to update:',
    },
    {
      type: 'input',
      name: 'role_id',
      message: 'Enter the role id of the employee:',
    },
  ])  
  .then((answer) => {
    const query = 'UPDATE employee SET role_id = ? WHERE id = ?';
    connection.query(query, [answer.role_id, answer.employee_id], (err, res) => {
      if (err) throw err;
      console.log('Employee role updated successfully!');
      startApp();
    });
  });
}
