CREATE TABLE people (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255)
);

CREATE TABLE address (
    id SERIAL PRIMARY KEY,
    street_number INTEGER,
    street_name VARCHAR(255),
    suit_type VARCHAR(255),
    number_suit INTEGER,
    zip_code INTEGER,
    person_id INTEGER REFERENCES people(id)
);

CREATE TABLE budget (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    budget MONEY,
    person_id INTEGER REFERENCES people(id)
);

CREATE TABLE transaction (
    id SERIAL PRIMARY KEY,
    date DATE,
    amount MONEY,
    recipient VARCHAR(255),
    sender VARCHAR(255),
    from_id INTEGER REFERENCES people(id),
    to_id INTEGER REFERENCES people(id)
);