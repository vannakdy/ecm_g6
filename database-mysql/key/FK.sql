-- add FK 
ALTER TABLE Orders
ADD FOREIGN KEY (PersonID) REFERENCES Persons(PersonID);

-- List FK in a database
SELECT 
    TABLE_SCHEMA, 
    TABLE_NAME, 
    COLUMN_NAME, 
    CONSTRAINT_NAME
FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
WHERE REFERENCED_TABLE_SCHEMA IS NOT NULL
AND TABLE_SCHEMA = 'coffee_sys_db'

-- DROP FOREIGN KEY
ALTER TABLE Orders
DROP FOREIGN KEY FK_PersonOrder


-- add index
CREATE INDEX email_idx ON users (email);
-- add unique
ALTER TABLE Persons ADD UNIQUE (ID);
