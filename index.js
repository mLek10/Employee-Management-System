// Import and require mysql2
// const mysql = require('mysql2');

const inquirer = require('inquirer');
const mysql = require('mysql2/promise');

// Create a connection to the MySQL database
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Gizmosue1!', // Add your MySQL password if you have one
  database: 'employee_db',
  waitForConnections: true,
  connectionLimit: 10, // Adjust this as needed
  queueLimit: 0,
});

async function executeQuery(query, values = []) {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.execute(query, values);
    return rows;
  } finally {
    connection.release();
  }
}

// Function to view all departments
async function viewDepartments() {
  const [rows] = await executeQuery('SELECT * FROM department');
  console.table(rows);
  mainMenu();
}

// Function to view all roles
async function viewRoles() {
  const [rows] = await executeQuery('SELECT * FROM role');
  console.table(rows);
  mainMenu();
}

// Function to view all employees
async function viewEmployees() {
  const [rows] = await executeQuery('SELECT * FROM employee');
  console.table(rows);
  mainMenu();
}

// Function to add a department
async function addDepartment() {
  const { name } = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Enter the name of the department:',
    },
  ]);
  
  await executeQuery('INSERT INTO department (name) VALUES (?)', [name]);
  console.log(`Department "${name}" added successfully.`);
  mainMenu();
}

// Function to add a role
async function addRole() {
  const departments = await executeQuery('SELECT * FROM department');
  const departmentChoices = departments[0].map((department) => ({
    name: department.name,
    value: department.id,
  }));

  const { title, salary, departmentId } = await inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Enter the title of the role:',
    },
    {
      type: 'number',
      name: 'salary',
      message: 'Enter the salary for the role:',
    },
    {
      type: 'list',
      name: 'departmentId',
      message: 'Select the department for the role:',
      choices: departmentChoices,
    },
  ]);

  await executeQuery('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [
    title,
    salary,
    departmentId,
  ]);
  console.log(`Role "${title}" added successfully.`);
  mainMenu();
}

// Function to start the application
async function mainMenu() {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'Select an action:',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Quit',
      ],
    },
  ]);

  switch (action) {
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
    case 'Quit':
      connection.end();
      console.log('Goodbye!');
      break;
  }
}

// Start the application
mainMenu();
