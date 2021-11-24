const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_NAME
const DB_URL = process.env.DB_URL
const ENVIRONMENT = process.env.ENVIRONMENT

module.exports =
  ENVIRONMENT === 'dev'
    ? {
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME,
        logging: true,
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: false,
        dropSchema: false,
        migrations: ['src/migration/**/*.ts'],
        cli: {
          migrationsDir: 'src/migration',
        },
      }
    : {
        type: 'postgres',
        url: DB_URL,
        logging: true,
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: false,
        dropSchema: false,
        migrations: ['src/migration/**/*.ts'],
        cli: {
          migrationsDir: 'src/migration',
        },
      }
