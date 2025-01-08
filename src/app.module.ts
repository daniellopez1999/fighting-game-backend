import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { UsersEntity } from './entities/user.entity';
import * as dotenv from 'dotenv';
import { CharacterEquippedEntity } from './entities/character-equiped.entity';
import { DefenseEntity } from './entities/defense.entity';
import { UsersModule } from './auth/auth.module';
import { CharacterEquipmentModule } from './user-equipment/character-equipment.module';
import { LevelEntity } from './entities/level.entity';
import { MobEntity } from './entities/mob.entity';
import { LevelMob } from './entities/level_has_mobs.entity';
import { CharacterEntity } from './entities/character.entity';
import { AttackEntity } from './entities/attack.entity';
import { CharacterModule } from './character/character.module';
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
      entities: [
        UsersEntity,
        CharacterEquippedEntity,
        DefenseEntity,
        CharacterEntity,
        AttackEntity,
        LevelEntity,
        MobEntity,
        LevelMob,
      ],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([
      UsersEntity,
      CharacterEquippedEntity,
      DefenseEntity,
      LevelEntity,
      MobEntity,
      LevelMob,
      CharacterEntity,
      AttackEntity,
    ]),
    UsersModule,
    CharacterEquipmentModule,
    CharacterModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
