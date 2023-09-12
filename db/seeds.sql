INSERT INTO department (name)
VALUES
('Management'),
('Sales'),
('Accounting');

INSERT INTO role (title, salary, department_id)
VALUES
('Branch Manager', 85356.71, 1),
('Branch Co-Manager', 70520.73, 1),
('Assistant to the Manager', 69623.52, 1),
('Accounting', 78536.58, 3),
('Salesman', 56659.32, 2),
('Receptionist', 50654.12, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Michael',  'Scott', 1),
('Jim', 'Halpert', 2),
('Dwight', 'Schrute', 1),
('Angela', 'Martin', 3),
('Andy', 'Bernard', 2),
('Pam', 'Beesly', 2);

