import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth/auth.controllers';
import { AuthService } from './auth/auth.services';
import { UsersModule } from './users/users.module';
import User from './typeorm/entities/user.entity';
import { Books } from './typeorm/entities/books.entity';
import { RolesModule } from './roles/roles.module';
import { BooksModule } from './books/books.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'jephthah',
    password: 'jeph3000',
    database: 'voompay',
    entities: [User, Books],
    synchronize: true,
    logging: false,
    migrationsTableName: "migrations",
    migrations: ["src/db/migrations/*.ts"],
    }), AuthModule, UsersModule, RolesModule, BooksModule,
  ],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AppModule {}
