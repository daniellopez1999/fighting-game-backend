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
  FOREIGN KEY (user_id) REFERENCES "users" (user_id) ON DELETE CASCADE,
  FOREIGN KEY (defense_id) REFERENCES defense (defense_id) ON DELETE SET NULL
);

-- Insertar algunos datos de ejemplo en la tabla 'defense'
INSERT INTO defense (name, type, defense, agility, attack_speed)
VALUES
  ('Iron Armor', 'armor', 50, 0, 0),
  ('Leather Gloves', 'gloves', 10, 5, 5),
  ('Steel Helmet', 'helmet', 30, 2, 0),
  ('Boots of Swiftness', 'boots', 15, 8, 0);

-- Insertar algunos datos de ejemplo en la tabla 'user'
INSERT INTO users (username, email, password, type)
VALUES
  ('admin1', 'admin1@example.com', 'password123', 'admin'),
  ('user1', 'user1@example.com', 'password123', 'user'),
  ('mod1', 'mod1@example.com', 'password123', 'mod');

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
