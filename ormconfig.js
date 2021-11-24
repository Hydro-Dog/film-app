module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'vlad',
  password: 'vlad',
  database: 'vlad_db',
  url: '',
  logging: true,
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: false,
  dropSchema: false,
  migrations: ['src/migration/**/*.ts'],
  cli: {
    migrationsDir: 'src/migration',
  },
}

// module.exports =  {
//   type: 'postgres',
//   host: 'localhost',
//   port: 5432,
//   username: 'vlad',
//   password: 'vlad',
//   database: 'vlad_db',
//   url: '',
//   logging: true,
//   entities: ['dist/**/*.entity{.ts,.js}'],
//   synchronize: false,
//   dropSchema: false,
//   migrations: ['src/migration/**/*.ts'],
//   cli: {
//     migrationsDir: 'src/migration',
//   },
// }
