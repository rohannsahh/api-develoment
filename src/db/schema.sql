USE defaultdb;
CREATE TABLE schools(
  id integer PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  address VARCHAR(255) NOT NULL,
  latitude FLOAT NOT NULL,
  longitude FLOAT NOT NULL

);
-- //example data insert
INSERT INTO schools(name , address)
VALUES 
('rohan', 'delhi','0','0'),
('rahul', 'mumbai','0','0');