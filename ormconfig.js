module.exports = {
  type: 'postgres',
  url: 'postgres://lliiyodvvgybyo:86bc1416beb0c61c1dc594ab2d2024d34598d9a2ea450467b2ed7cad332b0f11@ec2-3-248-87-6.eu-west-1.compute.amazonaws.com:5432/d39rf4e6061ks6',
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
