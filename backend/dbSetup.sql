CREATE TABLE users(
	id SERIAL PRIMARY KEY,
	first_name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50) NOT NULL,
	ssn INT UNIQUE NOT NULL,
	email VARCHAR(50) UNIQUE NOT NULL,
	password VARCHAR NOT NULL,
	date_of_birth DATE NOT NULL,
	filing_status VARCHAR(50) NOT NULL,
	street_primary VARCHAR NOT NULL,
	street_secondary VARCHAR,
	city VARCHAR NOT NULL,
	state VARCHAR NOT NULL,
	zip_code INT NOT NULL
);


CREATE TABLE tax_returns(
	id SERIAL PRIMARY KEY,
	tax_year INT NOT NULL,
	income INT DEFAULT 0,
	taxes_withheld INT DEFAULT 0,
	deduction INT DEFAULT 0,
	filing_status VARCHAR(50) NOT NULL,
	taxable_income INT DEFAULT 0,
	total_tax INT DEFAULT 0,
	tax_bill INT DEFAULT 0,
	user_id INT NOT NULL,
	FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE income_source(
	id SERIAL PRIMARY KEY,
	type VARCHAR NOT NULL,
	income INT DEFAULT 0,
	withheld INT DEFAULT 0,
	employer VARCHAR(50),
	employer_id VARCHAR,
	tax_id INT NOT NULL,
	user_id INT NOT NULL,
	FOREIGN KEY(tax_id) REFERENCES tax_returns(id),
	FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);

DROP TABLE income_source;
DROP TABLE tax_returns;
DROP TABLE users;

SELECT * FROM users;
SELECT * FROM tax_returns;
SELECT * FROM income_source;

INSERT INTO users(first_name, last_name, ssn, email, password, date_of_birth, filing_status, street_primary, city, state, zip_code)
Values('John', 'Smith', 123456789, 'john@gmail.com', 'test', '1776-01-01', 'single', '123 Boogy Way', 'Dallas', 'Tx', 16837);
INSERT INTO users(first_name, last_name, ssn, email, password, date_of_birth, filing_status, street_primary, city, state, zip_code)
Values('Dana', 'Wallace', 987654321, 'dana@gmail.com', 'test', '1776-01-02', 'single', '125 Boogy Way', 'Dallas', 'Tx', 16837);

INSERT INTO tax_returns(tax_year, filing_status, user_id)
Values(2023, 'single', 1);
INSERT INTO tax_returns(tax_year, filing_status, user_id)
Values(2023, 'single', 2);

INSERT INTO income_source(type, income, withheld, employer, employer_id, tax_id, user_id)
VALUES('W2', 20000, 500, 'Disney', '0004', 1, 1);
INSERT INTO income_source(type, income, withheld, employer, employer_id, tax_id, user_id)
VALUES('1099', 30000, 0, 'ATT', '0005', 2, 2);

