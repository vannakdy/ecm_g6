
SQL : DBMS

-- insert

INSERT INTO category (Name,Description,Status) VALUES ('Macbook','Apple product',1);
INSERT INTO category (Name,Description,Status) VALUES ('Microsoft','Microsoft product',1);

-- insert multiple record
INSERT INTO category (Name,Description,Status) 
VALUES 
('Macbook','Apple product',1),
('Asus','Asus product',1),
('Microsoft','Microsoft product',1);

-- select
SELECT * FROM category;
SELECT Name,Description FROM category;

-- Update
UPDATE category SET Name='Macbooks', Description='Macbooks product' WHERE Id = 1

-- DELETE 
DELETE FROM category WHERE Id = 1