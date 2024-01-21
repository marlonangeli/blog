test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  expect(responseBody.updated_at).toBeDefined();

  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toBe(parsedUpdatedAt);

  const database = responseBody.dependencies.database;

  const postgresVersion = database.postgres_version;
  expect(postgresVersion).toBe("16.0");

  const maxConnections = database.max_connections;
  expect(maxConnections).toBe(process.env.POSTGRES_MAX_CONNECTIONS || 100);

  const activeConnections = database.active_connections;
  expect(activeConnections).toBe(1);
});
