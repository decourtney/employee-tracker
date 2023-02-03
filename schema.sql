-- Remove DROP DATABASE once testing is done
DROP DATABASE IF EXISTS workforce_db;
CREATE DATABASE workforce_db;

use workforce_db;

CREATE TABLE department(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(30) NOT NULL,
);

CREATE TABLE role(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  department_id INT,
  FOREIGN KEY (department_id)
  REFERENCES department(id)
  ON DELETE SET NULL
);

CREATE TABLE employee(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT,
  FOREIGN KEY (role_id)
  REFERENCES role(id)
  ON DELETE SET NULL,
  FOREIGN KEY (manager_id)
  REFERENCES employee(id)
  ON DELETE SET NULL
);

INSERT INTO department(id, department_name)
VALUES (001, 'Warehouse'),
      (002, 'Finance'),
      (003, 'Sales');
      -- Extra department to create for testing
      -- (004, 'Corporate');

INSERT INTO role(id, title, salary, department_id)
VALUES (001, 'Salesperson', 55000, 003),
      (002, 'Accountant', 45000, 002),
      (003, 'Quality Control', 40000, NULL),
      (004, 'Customer Service', 35000, NULL),
      (005, 'Human Resources', 50000, NULL);
      -- Extra role to create for testing
      -- (006, 'Warehouse Foreman', 30000, 001);

insert into employee(id, first_name, last_name, role_id, manager_id)
values (001, 'Michael', 'Scott', 001, NULL),
      (002, 'Dwight', 'Schrute', 001, 001),
      (003, 'Jim', 'Halpert', 001, 002),
      (004, 'Stanley', 'Hudson', 001, 002),
      (005, 'Phyllis', 'Lapin', 001, 002),
      (006, 'Angela', 'Martin', 002, 001),
      (007, 'Oscar', 'Gutierrez', 002, 006),
      (008, 'Kevin', 'Malone', 002, 006),
      (009, 'Meredith', 'Palmer', 004, NULL);
      -- Extra employees to create for testing
      -- (010, 'Andy', 'Bernard'),
      -- (011, 'Toby', 'Flenderson'),
      -- (012, 'Gabe', 'Lewis'),
      -- (013, 'Kelley', 'Kapoor'),
      -- (014, 'Ryan', 'Howard'),