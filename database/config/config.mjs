

export const options = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  dialect: "postgres",

  // logging
  logging: process.env.NODE_ENV === "development" ? console.log : null,

  // migrations
  migrationStorageTableName: "migrations"
}


export default {
  development: options,
  test: options,
  production: options
}