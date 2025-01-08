import { ShortUserResponse } from 'src/auth/utils/user';

export class Character {
  character_id: string;
  user?: ShortUserResponse;
  name: string;
  class: 'warrior' | 'archer' | 'mage' | 'assassin';
  level: number;
  attack: number;
  defense: number;
  health: number;
  attack_speed: number;
  agility: number;

  constructor(data: Character) {
    this.character_id = data.character_id;
    this.user = data.user;
    this.name = data.name;
    this.class = data.class;
    this.level = data.level;
    this.attack = data.attack;
    this.defense = data.defense;
    this.health = data.health;
    this.attack_speed = data.attack_speed;
    this.agility = data.agility;
  }
}
