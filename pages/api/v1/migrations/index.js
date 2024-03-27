import { NextApiRequest, NextApiResponse } from "next";

import { join } from "node:path";
import migrationHandler from "node-pg-migrate";

/**
 *
 * @param {NextApiRequest} request
 * @param {NextApiResponse} response
 */
export default async function migrations(request, response) {
  const migrations = await migrationHandler({
    direction: "up",
    dir: join("infra", "migrations"),
    databaseUrl: process.env.DATABASE_URL,
    migrationsTable: "pgmigrations",
    dryRun: request.method === "GET" ? true : false,
    verbose: true,
    noLock: true,
  });

  response.status(200).json(migrations);
}
