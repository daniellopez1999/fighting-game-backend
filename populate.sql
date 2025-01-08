CREATE EXTENSION IF NOT EXISTS "pgcrypto";


-- Creación de la tabla 'defense'
CREATE TABLE defense (
  defense_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  defense_type VARCHAR(50) CHECK (defense_type IN ('armor', 'gloves', 'helmet', 'boots')) NOT NULL,
  defense INT NOT NULL,
  agility INT NOT NULL,
  attack_speed INT NOT NULL
);

-- Creación de la tabla 'user'
CREATE TABLE users (
  user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255),
  type VARCHAR(50) CHECK (type IN ('admin', 'user', 'mod')) NOT NULL
);

-- Creación de la tabla 'characters'
CREATE TABLE user_characters (
  character_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  name VARCHAR(255) UNIQUE NOT NULL,
  class VARCHAR(50) CHECK (class IN ('warrior', 'archer', 'mage', 'assassin')) NOT NULL,
  level INT NOT NULL,
  attack INT NOT NULL,
  defense INT NOT NULL,
  health INT NOT NULL,
  attack_speed INT NOT NULL,
  agility INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Insertar algunos datos de ejemplo en la tabla 'defense'
INSERT INTO defense (defense_id, name, defense_type, defense, agility, attack_speed)
VALUES
  ('4dbc3d24-bdee-4a43-b2e5-42556a472e35', 'Iron Armor', 'armor', 50, 0, 0),
  ('8b1c6e7e-b517-496b-bf88-b9f45cf07d98', 'Leather Gloves', 'gloves', 10, 5, 5),
  ('b9b7bc31-76b4-42b7-a612-dc83616b4bb2', 'Steel Helmet', 'helmet', 30, 2, 0),
  ('5fcf95f0-d0ea-46d8-9443-94c9aef2f034', 'Boots of Swiftness', 'boots', 15, 8, 0),
  ('c2a6d4a5-4639-475f-bb3d-5e7c42c22760', 'Golden Armor', 'armor', 60, 1, 0),
  ('7f88d65a-d9e6-4f13-8b4b-620e2d472e93', 'Golden Gloves', 'gloves', 20, 6, 6),
  ('a01bcf9a-bbfa-4a3e-9e1d-e256b4fc5c2c', 'Golden Helmet', 'helmet', 40, 3, 0),
  ('ccd2ecb5-9a56-46de-95d6-c45c56efb46b', 'Golden Boots', 'boots', 25, 9, 1),
  ('7e940f9c-8cf9-4b0c-a28d-df973a64ad9a', 'Diamond Armor', 'armor', 80, 2, 0),
  ('346b7b4a-3f39-4871-82e5-56c8420bfa84', 'Diamond Gloves', 'gloves', 30, 7, 7),
  ('1b1b7003-5d35-4a36-9f8a-2c9ad7cfc6a3', 'Diamond Helmet', 'helmet', 50, 4, 0),
  ('946a2edb-bc3e-4875-bfdb-8c6a320d9173', 'Diamond Boots', 'boots', 35, 10, 2),
  ('af66d8b1-ff65-408f-a431-9a973e1c07e2', 'Golden Shield', 'armor', 70, 2, 0),
  ('71c6f1a5-3a74-4267-94f1-88fa00d73c9b', 'Diamond Shield', 'armor', 90, 3, 0);

-- Creación de la tabla 'attack'
CREATE TABLE attack (
  attack_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  attack_type VARCHAR(50) CHECK (attack_type IN ('sword', 'axe', 'bow', 'dagger')) NOT NULL,
  damage INT NOT NULL,
  agility INT NOT NULL,
  attack_speed INT NOT NULL,
  image VARCHAR(255) NOT NULL
);

INSERT INTO attack (attack_id, name, attack_type, damage, agility, attack_speed, image)
VALUES
('1a2b3c4d-5e6f-7890-abcd-ef1234567890', 'Sword of Flames', 'sword', 50, 5, 10, 'sword.png'),
('2b3c4d5e-6f7a-8901-bcde-f12345678901', 'Axe of Fury', 'axe', 60, 3, 8, 'axe.png'),
('3c4d5e6f-7a8b-9012-cdef-123456789012', 'Bow of Precision', 'bow', 40, 7, 12, 'bow.png'),
('4d5e6f7a-8b9c-0123-def1-234567890123', 'Dagger of Speed', 'dagger', 30, 10, 15, 'dagger.png');


-- Creación de la tabla 'character_equiped'
CREATE TABLE character_equiped (
  character_equiped_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  character_id UUID NOT NULL, -- Añadir esta columna
  defense_id UUID,
  attack_id UUID,
  defense_type VARCHAR(50) CHECK (defense_type IN ('armor', 'gloves', 'helmet', 'boots')) NOT NULL,
  FOREIGN KEY (character_id) REFERENCES user_characters(character_id) ON DELETE CASCADE,
  FOREIGN KEY (defense_id) REFERENCES defense (defense_id) ON DELETE SET NULL,
  FOREIGN KEY (attack_id) REFERENCES attack (attack_id) ON DELETE SET NULL

);



-- Insertar algunos datos de ejemplo en la tabla 'character_equiped'
-- Necesitamos obtener los UUIDs generados para las tablas de usuarios y defensa, así que se hace una consulta para obtenerlos

WITH inserted_defense AS (
  SELECT defense_id FROM defense WHERE name = 'Iron Armor' LIMIT 1
), inserted_user AS (
  SELECT user_id FROM users WHERE username = 'admin1' LIMIT 1
)
INSERT INTO character_equiped (user_id, defense_id)
SELECT inserted_user.user_id, inserted_defense.defense_id
FROM inserted_user, inserted_defense;

WITH inserted_defense AS (
  SELECT defense_id FROM defense WHERE name = 'Leather Gloves' LIMIT 1
), inserted_user AS (
  SELECT user_id FROM users WHERE username = 'user1' LIMIT 1
)
INSERT INTO character_equiped (user_id, defense_id)
SELECT inserted_user.user_id, inserted_defense.defense_id
FROM inserted_user, inserted_defense;

WITH inserted_defense AS (
  SELECT defense_id FROM defense WHERE name = 'Steel Helmet' LIMIT 1
), inserted_user AS (
  SELECT user_id FROM users WHERE username = 'mod1' LIMIT 1
)
INSERT INTO character_equiped (user_id, defense_id)
SELECT inserted_user.user_id, inserted_defense.defense_id
FROM inserted_user, inserted_defense;




-- 1. Tabla de niveles (levels)
CREATE TABLE levels (
  level_id UUID PRIMARY KEY,       -- Identificador único del nivel
  name VARCHAR(255),               -- Nombre del nivel
  difficulty VARCHAR(20),          -- Dificultad del nivel (easy, medium, hard)
  CONSTRAINT difficulty_check CHECK (difficulty IN ('easy', 'medium', 'hard'))
);

-- 2. Tabla de mobs
CREATE TABLE mobs (
  mob_id UUID PRIMARY KEY,         -- Identificador único del mob
  name VARCHAR(255),               -- Nombre del mob
  health INT,                      -- Salud del mob
  damage INT,                      -- Daño del mob
  defense INT,                     -- Defensa del mob
  experience INT,                  -- Experiencia otorgada por el mob
  image VARCHAR(255),              -- Imagen del mob
  gold INT,                        -- Oro otorgado por el mob
  type VARCHAR(50) CHECK (type IN ('normal', 'boss')), -- Tipo de mob
  element VARCHAR(50) CHECK (element IN ('fire', 'water', 'earth', 'wind')) -- Elemento del mob
);


-- 3. Relación entre niveles y mobs (tabla intermedia)
CREATE TABLE level_mobs (
  level_id UUID REFERENCES levels(level_id) ON DELETE CASCADE,
  mob_id UUID REFERENCES mobs(mob_id) ON DELETE CASCADE,
  PRIMARY KEY (level_id, mob_id)
);


-- Insertar niveles
INSERT INTO levels (level_id, name, difficulty)
VALUES
  ('e86b6ed2-c317-47e3-b43b-4bb89c3f3dbb', 'Forest of Beginnings', 'easy'),
  ('a1a1b95f-2ef3-4529-9db5-7d531ed2c5fe', 'Cave of Despair', 'medium'),
  ('c7b740e4-0ff9-4635-bd82-dc45128ed233', 'Dragon Lair', 'hard');

-- Insertar mobs
INSERT INTO mobs (mob_id, name, health, damage, defense, experience, image, gold, type, element)
VALUES
  ('f9db3037-2e0a-4e72-bc8f-fb325ee1d09b', 'Goblin', 30, 5, 2, 10, 'goblin.png', 5, 'normal', 'earth'),
  ('eb92b764-13bb-4199-b5ac-e51d395b2a75', 'Troll', 100, 15, 10, 50, 'troll.png', 20, 'normal', 'earth'),
  ('26ff3c01-bfdd-47a0-bc0a-87096b5435f7', 'Dragon', 500, 50, 25, 200, 'dragon.png', 100, 'boss', 'fire'),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Orc', 80, 10, 5, 40, 'orc.png', 15, 'normal', 'earth'),
  ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'Golem', 200, 20, 15, 100, 'golem.png', 50, 'boss', 'earth'),
  ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'Phoenix', 150, 25, 10, 120, 'phoenix.png', 60, 'boss', 'fire'),
  ('d4e5f6a7-b8c9-0123-def1-234567890123', 'Mermaid', 70, 8, 3, 30, 'mermaid.png', 10, 'normal', 'water'),
  ('e5f6a7b8-c9d0-1234-ef12-345678901234', 'Kraken', 300, 35, 20, 150, 'kraken.png', 80, 'boss', 'water'),
  ('f6a7b8c9-d0e1-2345-f123-456789012345', 'Cyclops', 120, 18, 8, 60, 'cyclops.png', 25, 'normal', 'earth'),
  ('a7b8c9d0-e1f2-3456-1234-567890123456', 'Harpy', 60, 12, 4, 25, 'harpy.png', 12, 'normal', 'wind'),
  ('b8c9d0e1-f2a3-4567-2345-678901234567', 'Griffin', 180, 28, 12, 90, 'griffin.png', 45, 'boss', 'wind'),
  ('c9d0e1f2-a3b4-5678-3456-789012345678', 'Minotaur', 140, 22, 10, 70, 'minotaur.png', 35, 'normal', 'earth'),
  ('d0e1f2a3-b4c5-6789-4567-890123456789', 'Hydra', 250, 40, 18, 180, 'hydra.png', 90, 'boss', 'water'); 

-- Relacionar niveles con mobs
INSERT INTO level_mobs (level_id, mob_id)
VALUES
  ('e86b6ed2-c317-47e3-b43b-4bb89c3f3dbb', 'f9db3037-2e0a-4e72-bc8f-fb325ee1d09b'), -- Goblin en el nivel 'Forest of Beginnings'
  ('a1a1b95f-2ef3-4529-9db5-7d531ed2c5fe', 'f9db3037-2e0a-4e72-bc8f-fb325ee1d09b'), -- Goblin en el nivel 'Cave of Despair'
  ('c7b740e4-0ff9-4635-bd82-dc45128ed233', '26ff3c01-bfdd-47a0-bc0a-87096b5435f7'); -- Dragon en el nivel 'Dragon's Lair'






