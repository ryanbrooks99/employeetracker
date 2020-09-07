USE tracker_db;

INSERT INTO department (name)
VALUES ("Sales"), ("Engineering"), ("Finance"), ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1), ("Engineer", 110000, 2), ("Accountant", 90000, 3),
("Lawyer", 150000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Smith", 1, 1), ("Jane", "Doe", 2, 2), ("Lucas", "Brooks", 3, 3);