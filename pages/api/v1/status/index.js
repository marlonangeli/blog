import database from "../../../../infra/database.js"

async function status(request, response) {
  const result = await database.query('SELECT 1 as status;')
  console.log(result.rows);
  response.status(200).json({ status: "OK" });
}

export default status;
