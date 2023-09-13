INSERT INTO department (name)
VALUES
('Management'),
('Sales'),
('HR');

INSERT INTO role (title, salary, department_id)
VALUES
('Branch Manager', 85356.71, 1),
('Branch Co-Manager', 70520.73, 1),
('Assistant to the Regional Manager', 69623.52, 2),
('Accounting', 78536.58, 2),
('Salesman', 56659.32, 3),
('Receptionist', 50654.12, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Michael',  'Scott', 1, NULL),
('Jim', 'Halpert', 2, NULL),
('Dwight', 'Schrute', 3, 1),
('Angela', 'Martin', 4, 1),
('Andy', 'Bernard', 5, 2),
('Pam', 'Beesly', 6, 2);

