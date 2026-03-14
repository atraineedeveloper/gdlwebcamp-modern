import 'dotenv/config';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { Pool } from 'pg';

async function init() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL ?? 'postgres://gdl_user:gdl_pass@localhost:5433/gdlwebcamp'
  });

  const schema = readFileSync(join(__dirname, 'sql', 'schema.sql'), 'utf8');
  const seed = readFileSync(join(__dirname, 'sql', 'seed.sql'), 'utf8');

  await pool.query(schema);
  await pool.query(seed);
  await pool.end();
  console.log('Database initialized');
}

init().catch((err) => {
  console.error(err);
  process.exit(1);
});
