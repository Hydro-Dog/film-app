// import { join } from 'path'

const { join } = require('path')

//https://github.com/typeorm/typeorm/blob/master/docs/connection-options.md

// module.exports = {
//   type: 'postgres',
//   url: 'postgres://lliiyodvvgybyo:86bc1416beb0c61c1dc594ab2d2024d34598d9a2ea450467b2ed7cad332b0f11@ec2-3-248-87-6.eu-west-1.compute.amazonaws.com:5432/d39rf4e6061ks6?sslmode=no-verify',
//   logging: true,
//   entities: ['dist/**/*.entity{.ts,.js}'],
//   synchronize: false,
//   dropSchema: false,
//   migrations: ['dist/migration/**/*.js'],
//   cli: {
//     migrationsDir: 'src/migration',
//   },
// }

// module.exports = {
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
//   migrations: ['dist/migration/**/*.js'],
//   cli: {
//     migrationsDir: 'src/migration',
//   },
// }

module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'vlad',
  password: 'vlad',
  database: 'vlad_db',
  logging: true,
  entities: [join(__dirname, '/dist/entity/*.entity.js')],
  synchronize: false,
  migrations: [__dirname + '/src/migration/*{.js,.ts}'],
  cli: {
    migrationsDir: 'src/migration',
  },
}

// module.export = {
//   cli: {
//     migrationsDir: 'src/migration',
//   },
//   entities: [__dirname + '/src/entity/*{.js,.ts}'],
//   migrations: [__dirname + '/src/migration/*{.js,.ts}'],
//   migrationsTableName: 'migrations',
//   namingStrategy: new SnakeNamingStrategy(),
//   seeds: ['./src/seeds/*.seed{.js,.ts}'],
// }
