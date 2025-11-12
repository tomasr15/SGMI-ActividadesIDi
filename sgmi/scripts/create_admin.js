#!/usr/bin/env node
const { Pool } = require('pg');
const bcrypt = require('bcrypt');

// usage: node scripts/create_admin.js --email admin@example.com --password secret --name Admin

function argvParse() {
  const args = process.argv.slice(2);
  const out = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith('--')) {
      const key = args[i].slice(2);
      out[key] = args[i+1];
      i++;
    }
  }
  return out;
}

(async function main() {
  const { email, password, name } = argvParse();
  if (!email || !password) {
    console.error('Usage: node scripts/create_admin.js --email admin@example.com --password secret --name Admin');
    process.exit(1);
  }

  const pool = new Pool({
    user: process.env.POSTGRES_USER || 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    database: process.env.POSTGRES_DB || 'sgmi',
    password: process.env.POSTGRES_PASSWORD || '',
    port: parseInt(process.env.POSTGRES_PORT || '5432'),
  });

  try {
    const hashed = await bcrypt.hash(password, 10);
    const client = await pool.connect();
    try {
      // If a user with email exists, update role to admin and password
      const res = await client.query('SELECT id FROM usuarios WHERE email = $1 LIMIT 1', [email]);
      if (res.rows.length) {
        await client.query('UPDATE usuarios SET password = $1, role = $2, nombre = COALESCE(nombre,$3) WHERE email = $4', [hashed, 'admin', name || 'Admin', email]);
        console.log('Updated existing user to admin:', email);
      } else {
        await client.query('INSERT INTO usuarios (nombre, email, password, role) VALUES ($1,$2,$3,$4)', [name || 'Admin', email, hashed, 'admin']);
        console.log('Created admin user:', email);
      }
    } finally {
      client.release();
    }
  } catch (err) {
    console.error('Error creating admin user:', err.message || err);
  } finally {
    await pool.end();
  }
})();
