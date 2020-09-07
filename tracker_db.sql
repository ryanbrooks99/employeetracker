DROP DATABASE IF EXISTS tracker_db;

CREATE DATABASE tracker_db;

USE tracker_db;

CREATE table department(
id INTEGER NOT NULL AUTO_INCREMENT,
department_name VARCHAR(50) NOT NULL,
PRIMARY KEY (id)
);

CREATE table role(
id INTEGER NOT NULL AUTO_INCREMENT,
title VARCHAR(50) NOT NULL,
salary DECIMAL NOT NULL,
department_id INTEGER NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY(department_id) REFERENCES department(id)
);

CREATE table employee(
id INTEGER NOT NULL AUTO_INCREMENT,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INTEGER NOT NULL,
manager_id INTEGER NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY (role_id) REFERENCES role(id),
FOREIGN KEY (manager_id) REFERENCES employee(id)
);


SELECT title, salary, department_name
FROM department
INNER JOIN role
ON department.id = role.department_id;

SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department_name, role.salary, employee.manager_id
FROM department
INNER JOIN role
ON department.id = role.department_id
INNER JOIN employee
ON employee.role_id = role.id;

SELECT*FROM employee;

