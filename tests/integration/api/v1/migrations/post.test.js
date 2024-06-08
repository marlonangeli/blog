test("POST to /api/v1/migrations should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  expect(response.status).toBe(201);

  const responseBody = await response.json();
  expect(Array.isArray(responseBody)).toBe(true);
  expect(responseBody.length).toBeGreaterThan(0);

  console.log(responseBody);

  for (const migration of responseBody) {
    expect(migration).toHaveProperty("path");
    expect(migration).toHaveProperty("name");
    expect(migration).toHaveProperty("timestamp");
  }

  // After running the migrations, the migrations table should be empty
  const responseAfter = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  expect(responseAfter.status).toBe(200);

  const responseBodyAfter = await responseAfter.json();
  expect(Array.isArray(responseBodyAfter)).toBe(true);
  expect(responseBodyAfter.length).toBe(0);
});
