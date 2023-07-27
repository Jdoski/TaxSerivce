INSERT INTO users(first_name, last_name, ssn, email, password, date_of_birth, filing_status, street_primary, city, state, zip_code)
Values('John', 'Smith', 123456789, 'john@gmail.com', 'test', '1776-01-01', 'single', '123 Boogy Way', 'Dallas', 'Tx', 16837);
INSERT INTO users(first_name, last_name, ssn, email, password, date_of_birth, filing_status, street_primary, city, state, zip_code)
Values('Dana', 'Wallace', 987654321, 'dana@gmail.com', 'test', '1776-01-02', 'single', '125 Boogy Way', 'Dallas', 'Tx', 16837);

INSERT INTO tax_returns(tax_year, filing_status, user_id) Values(2023, 'single', 1);
INSERT INTO tax_returns(tax_year, filing_status, user_id) Values(2023, 'single', 2);

INSERT INTO income_source(type, income, withheld, employer, employer_id, tax_id, user_id) VALUES('W2', 20000, 500, 'Disney', '0004', 1, 1);
INSERT INTO income_source(type, income, withheld, employer, employer_id, tax_id, user_id) VALUES('1099', 30000, 0, 'ATT', '0005', 2, 2);