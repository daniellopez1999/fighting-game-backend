import { CharacterClass } from 'src/entities/character.entity';

export interface CharacterStats {
  agility: number;
  attack: number;
  attack_speed: number;
  defense: number;
  health: number;
}

const characterStatsMap: Record<CharacterClass, CharacterStats> = {
  [CharacterClass.Warrior]: {
    agility: 10,
    attack: 20,
    attack_speed: 5,
    defense: 15,
    health: 100,
  },
  [CharacterClass.Mage]: {
    agility: 15,
    attack: 25,
    attack_speed: 10,
    defense: 5,
    health: 80,
  },
  [CharacterClass.Archer]: {
    agility: 20,
    attack: 15,
    attack_speed: 15,
    defense: 10,
    health: 90,
  },
  [CharacterClass.Assassin]: {
    agility: 25,
    attack: 30,
    attack_speed: 20,
    defense: 5,
    health: 70,
  },
};

export function getCharacterStats(
  characterClass: CharacterClass,
): CharacterStats {
  return characterStatsMap[characterClass];
}
