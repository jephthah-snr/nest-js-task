// import User from "src/typeorm/entities/user.entity";
// import { DataSource } from "typeorm";

// require("dotenv").config();

// export default new DataSource({
//     type: 'postgres',
//     host: 'localhost',
//     port: 5432,
//     username: 'jephthah',
//     password: 'jeph3000',
//     database: 'voompay',
//     entities: [User],
//     synchronize: false,
//     logging: false,
//     migrationsTableName: "migrations",
//     migrations: ["src/db/migrations/*.ts"],

//   // dropSchema: true,
// });