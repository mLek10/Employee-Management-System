INSERT INTO department (name)
VALUES
('Management'),
('Sales'),
('Accounting');

INSERT INTO role (title, salary, department_id)
VALUES
('Branch Manager', 85356.71, 1),
('Sales Associate', 56659.32, 2),
('Accountant', 78536.58, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Michael',  'Scott', 1, NULL),
('Dwight', 'Schrute', 2, 1),
('Jim', 'Halpert', 2, 1),
('Andy', 'Bernard', 2, 1),
('Angela', 'Martin', 3, NULL),
('Oscar', 'Martinez', 3, 3),
('Kevin', 'Malone', 3, 3);

