-- USE master;
-- GO

-- -- Create a new database named 'YourDatabaseName'
-- CREATE DATABASE mypw;
-- GO


-- Create USER table
USE mypw
GO

CREATE TABLE ACCOUNT (
    username VARCHAR(255) PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    isAdmin BIT
)

CREATE TABLE USERS (
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    username VARCHAR(255) PRIMARY KEY,
    enable BIT,
    country VARCHAR(255),
    firstAccess DATETIME,
    lastAccess DATETIME,
    Avatar VARCHAR(MAX),
    email VARCHAR(255),
    totalAccess INT,

    FOREIGN KEY (username) REFERENCES ACCOUNT(username)
);

-- Create FEEDBACK table
CREATE TABLE FEEDBACK (
    username VARCHAR(255),
    ID INT,
    Description VARCHAR(MAX),
    star INT,
    reply VARCHAR(MAX),
    time DATETIME,
    PRIMARY KEY (username, ID),
    FOREIGN KEY (username) REFERENCES USERS(username)
);

-- Create PASSWORDITEM table
CREATE TABLE PASSWORDITEM (
    username VARCHAR(255),
    dayCreate DATETIME,
    dayExpire DATETIME,
    active BIT,
    password VARCHAR(255),
    url VARCHAR(255),
    lastAccessDay DATETIME,
    FOREIGN KEY (username) REFERENCES USERS(username),
    PRIMARY KEY (username, url)
);

-- Create SYSTEM table
CREATE TABLE SYSTEM (
    contactAddress VARCHAR(MAX),
    contactEmail VARCHAR(255),
    ID INT PRIMARY KEY
);
GO

INSERT INTO ACCOUNT VALUES
('admin', '123', 1),
('user', '123', 0),
('john_doe', 'password123', 1),
('jane_smith', 'pass456', 0),
('default', 'password', 0);

-- Insert data into USER table
INSERT INTO USERS VALUES
('John', 'Doe', 'admin', 1, 'USA', '2023-01-01', '2023-01-05', NULL, 'john.doe@example.com', 10),
('John', 'Doe', 'user', 1, 'USA', '2023-01-01', '2023-01-05', NULL, 'john.doe@example.com', 10),
('John', 'Doe', 'john_doe', 1, 'USA', '2023-01-01', '2023-01-05', NULL, 'john.doe@example.com', 10),
('Jane', 'Smith', 'jane_smith', 1, 'Canada', '2023-01-02', '2023-01-06', NULL, 'jane.smith@example.com', 15),
('SinhVien', 'BachKhoa', 'default', 1, 'VietNam', '2023-01-02', '2023-12-22', NULL, 'someone@hcmut.edu.vn', 31);
-- Insert data into FEEDBACK table
INSERT INTO FEEDBACK VALUES
('john_doe', 1, 'Great product!', 5, NULL, '2023-01-03'),
('jane_smith', 2, 'Excellent service!', 4, NULL, '2023-01-04');

-- Insert data into PASSWORDITEM table
INSERT INTO PASSWORDITEM VALUES
('john_doe', '2023-01-01', '2023-02-01', 1, 'pass123', 'example.com', '2023-01-02'),
('jane_smith', '2023-01-02', '2023-02-02', 1, 'qwerty', 'example.org', '2023-01-03');

-- Insert data into SYSTEM table
INSERT INTO SYSTEM VALUES
('123 Main St, Cityville', 'info@example.com', 1);

INSERT INTO PASSWORDITEM VALUES
('default', '2023-11-01', '2023-12-01', 1, 'password', 'facebook.com', '2023-11-12'),
('default', '2023-11-02', '2023-12-02', 1, 'password', 'example.com', '2023-11-12'),
('default', '2023-11-03', '2023-12-03', 1, 'password', 'google.com', '2023-11-12'),
('default', '2023-11-04', '2023-12-04', 1, 'password', 'gmail.com', '2023-11-12'),
('default', '2023-11-05', '2023-12-05', 1, 'P@ssw0rd', 'drive.google.com', '2023-11-13'),
('default', '2023-11-06', '2023-12-06', 1, 'P@ssw0rd', 'meta.com', '2023-11-15'),
('default', '2023-11-07', '2023-12-07', 1, 'password', 'messenger.com', '2023-11-21');
