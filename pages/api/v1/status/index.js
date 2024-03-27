import { NextApiRequest, NextApiResponse } from "next";

import database from "infra/database.js";

/**
 *
 * @param {NextApiRequest} request
 * @param {NextApiResponse} response
 */
async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const queryPostgresVersion = await database.query("SHOW server_version;");
  const postgresVersion = queryPostgresVersion.rows[0].server_version;

  const queryMaxConnections = await database.query("SHOW max_connections;");
  const maxConnections = parseInt(queryMaxConnections.rows[0].max_connections);

  const databaseName = process.env.POSTGRES_DB;

  const queryActiveConnections = await database.query({
    text: `
      SELECT COUNT(*)::int FROM pg_stat_activity
      WHERE datname = $1;
    `,
    values: [databaseName],
  });

  const activeConnections = queryActiveConnections.rows[0].count;

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        postgres_version: postgresVersion,
        max_connections: maxConnections,
        active_connections: activeConnections,
      },
    },
  });
}

export default status;
