#! /usr/bin/env node

import pkg from "pg";

const { Client } = pkg;

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR ( 255 ),
  msg_cont TEXT,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO messages (username, msg_cont) 
VALUES
  ('Bertil', 'Hi there!'),
  ('Charles', 'Hello world'),
  ('Xavier', 'Mind freeze!'),
  ('Amando', 'Hello!'),
  ('Xavi', 'Best midfielder'),
  ('Damon', 'Some random msg');
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main().catch((err) => console.error(err));
