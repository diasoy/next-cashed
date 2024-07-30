const bcrypt = require("bcrypt");
const mysql = require("mysql2/promise");

async function seedUsers() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "next_cashed",
  });

  const email = "user@example.com";
  const name = "User";
  const plainPassword = "123456";
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  const query =
    "INSERT INTO user (email, name, password, createdAt) VALUES (?, ?, ?, NOW())";
  await connection.execute(query, [email, name, hashedPassword]);

  console.log("User seeded successfully");
  await connection.end();
}

async function seedCategories() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "next_cashed",
  });

  const name = "Makanan";
  const active = 1;
  const query =
    "INSERT INTO category (name, active, createdAt) VALUES (?, ?, NOW())";
  await connection.execute(query, [name, active]);

  console.log("Category seeded successfully");
  await connection.end();
}

seedCategories().catch(console.error);
seedUsers().catch(console.error);
