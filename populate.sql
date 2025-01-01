CREATE EXTENSION IF NOT EXISTS "pgcrypto";


-- Creación de la tabla 'defense'
CREATE TABLE defense (
  defense_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50) CHECK (type IN ('armor', 'gloves', 'helmet', 'boots')) NOT NULL,
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

-- Creación de la tabla 'user_equiped'
CREATE TABLE user_equiped (
  user_equiped_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  defense_id UUID,
  type VARCHAR(50) CHECK (type IN ('armor', 'gloves', 'helmet', 'boots')) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES "users" (user_id) ON DELETE CASCADE,
  FOREIGN KEY (defense_id) REFERENCES defense (defense_id) ON DELETE SET NULL
);

-- Insertar algunos datos de ejemplo en la tabla 'defense'
INSERT INTO defense (defense_id, name, type, defense, agility, attack_speed)
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



-- Insertar algunos datos de ejemplo en la tabla 'user_equiped'
-- Necesitamos obtener los UUIDs generados para las tablas de usuarios y defensa, así que se hace una consulta para obtenerlos

WITH inserted_defense AS (
  SELECT defense_id FROM defense WHERE name = 'Iron Armor' LIMIT 1
), inserted_user AS (
  SELECT user_id FROM users WHERE username = 'admin1' LIMIT 1
)
INSERT INTO user_equiped (user_id, defense_id)
SELECT inserted_user.user_id, inserted_defense.defense_id
FROM inserted_user, inserted_defense;

WITH inserted_defense AS (
  SELECT defense_id FROM defense WHERE name = 'Leather Gloves' LIMIT 1
), inserted_user AS (
  SELECT user_id FROM users WHERE username = 'user1' LIMIT 1
)
INSERT INTO user_equiped (user_id, defense_id)
SELECT inserted_user.user_id, inserted_defense.defense_id
FROM inserted_user, inserted_defense;

WITH inserted_defense AS (
  SELECT defense_id FROM defense WHERE name = 'Steel Helmet' LIMIT 1
), inserted_user AS (
  SELECT user_id FROM users WHERE username = 'mod1' LIMIT 1
)
INSERT INTO user_equiped (user_id, defense_id)
SELECT inserted_user.user_id, inserted_defense.defense_id
FROM inserted_user, inserted_defense;
