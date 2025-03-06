#! /usr/bin/env node

const { argv } = require('node:process');
const { Client } = require("pg");

const SQL = `
DROP TABLE IF EXISTS items CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS itemscategories CASCADE;

CREATE TABLE IF NOT EXISTS items (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title VARCHAR ( 255 ) NOT NULL,
  description VARCHAR ( 255 ),
  price REAL
);

CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title VARCHAR ( 255 ) NOT NULL
);

create TABLE IF NOT EXISTS itemscategories (
  item_id INT REFERENCES items(id),
  category_id INT REFERENCES categories(id)
);

INSERT INTO items (title, description, price) 
VALUES
  ('Male Jeans', 'Jeans for men', 20),
  ('Female Jeans', 'Jeans for women', 30),
  ('SSD Disk', '1Tb ssd disk', 120);

INSERT INTO categories (title) 
VALUES
  ('Male'),
  ('Female'),
  ('Clothes'),
  ('Electronics');
  
INSERT INTO itemscategories (item_id, category_id) 
VALUES
  (1, 1),
  (1, 3),
  (2, 2),
  (2, 3),
  (3, 4); 
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: argv[2],
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
