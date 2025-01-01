import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { UsersEntity } from './entities/user.entity';
import * as dotenv from 'dotenv';
import { UserEquippedEntity } from './entities/user-equiped.entity';
import { DefenseEntity } from './entities/defense.entity';
import { UsersModule } from './auth/auth.module';
import { UserEquipmentModule } from './user-equipment/user-equipment.module';
dotenv.config();
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
      entities: [UsersEntity, UserEquippedEntity, DefenseEntity],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([UsersEntity, UserEquippedEntity, DefenseEntity]),
    UsersModule,
    UserEquipmentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
