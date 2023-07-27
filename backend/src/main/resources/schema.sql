drop table if exists users;
drop table if exists tax_returns;
drop table if exists income_source;



CREATE TABLE users(
	id INT AUTO_INCREMENT PRIMARY KEY,
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
	id INT AUTO_INCREMENT PRIMARY KEY,
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
	id INT AUTO_INCREMENT PRIMARY KEY,
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