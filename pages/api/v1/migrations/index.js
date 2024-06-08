import { NextApiRequest, NextApiResponse } from "next";

import { join } from "node:path";
import migrationHandler from "node-pg-migrate";

/**
 *
 * @param {NextApiRequest} request
 * @param {NextApiResponse} response
 */
export default async function migrations(request, response) {
  const migrationsOptions = {
    direction: "up",
    dir: join("infra", "migrations"),
    databaseUrl: process.env.DATABASE_URL,
    migrationsTable: "pgmigrations",
    dryRun: true,
    verbose: true,
    noLock: true,
  };

  if (request.method === "POST") {
    const migratedMigrations = await migrationHandler({
      ...migrationsOptions,
      dryRun: false,
    });

    return response
      .status(migratedMigrations.length === 0 ? 200 : 201)
      .json(migratedMigrations);
  } else if (request.method === "GET") {
    const pendingMigrations = await migrationHandler({
      ...migrationsOptions,
    });

    return response.status(200).json(pendingMigrations);
  }
}
