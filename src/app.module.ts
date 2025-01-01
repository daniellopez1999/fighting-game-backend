import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { UserEntity } from './entities/user.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: `${process.env.DB_PG_HOST}`,
      port: parseInt(`${process.env.DB_PG_PORT}`),
      username: `${process.env.DB_PG_USERNAME}`,
      password: `${process.env.DB_PG_PASSWORD}`,
      database: `${process.env.DB_PG_DATABASE_NAME}`,
      entities: [UserEntity],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([UserEntity]),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
