import database from "infra/database";

beforeAll(cleanDatabase);

test("GET to /api/v1/migrations should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  expect(Array.isArray(responseBody)).toBe(true);
  expect(responseBody.length).toBeGreaterThan(0);

  console.log("Migrations:", responseBody);

  for (const migration of responseBody) {
    expect(migration).toHaveProperty("path");
    expect(migration).toHaveProperty("name");
    expect(migration).toHaveProperty("timestamp");
  }
});

async function cleanDatabase() {
  await database.query({
    text: "DROP SCHEMA public CASCADE; CREATE SCHEMA public;",
  });
}
