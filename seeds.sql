INSERT INTO department(id, department_name)
VALUES (001, 'Warehouse'),
      (002, 'Finance'),
      (003, 'Sales'),
      (004, 'Corporate');

INSERT INTO role(id, title, salary, department_id)
VALUES (001, 'Salesperson', 55000, 003),
      (002, 'Accountant', 45000, 002),
      (003, 'Quality Control', 40000, 004),
      (004, 'Customer Service', 35000, 004),
      (005, 'Human Resources', 50000, 004),
      (006, 'Warehouse Foreman', 30000, 001),
      (007, 'Warehouse Worker', 20000, 001),
      (008, 'Assistant to the Manager', 55000, 003);

insert into employee(id, first_name, last_name, role_id, manager_id)
values (001, 'Michael', 'Scott', 001, NULL),
      (002, 'Dwight', 'Schrute', 008, 002),
      (003, 'Jim', 'Halpert', 001, 002),
      (004, 'Stanley', 'Hudson', 001, 002),
      (005, 'Phyllis', 'Lapin', 001, 002),
      (006, 'Angela', 'Martin', 002, 001),
      (007, 'Oscar', 'Gutierrez', 002, 006),
      (008, 'Kevin', 'Malone', 002, 006),
      (009, 'Kelley', 'Kapoor', 004, NULL),
      (010, 'Andy', 'Bernard', 001, 002),
      (011, 'Toby', 'Flenderson', 005, NULL),
      (012, 'Gabe', 'Lewis', 005, NULL),
      (013, 'Meredith', 'Palmer', 004, 009),
      (014, 'Ryan', 'Howard', 004, 009),
      (015, 'Darryl', 'Philbin', 006, NULL),
      (016, 'Roy', 'Anderson', 007, 015);