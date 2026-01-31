-- Create users table
CREATE TABLE IF NOT EXISTS public.users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username varchar(50) UNIQUE NOT NULL,
  telegram_id bigint UNIQUE NOT NULL,
  password_hash varchar(255) NOT NULL,
  is_verified boolean DEFAULT false,
  is_admin boolean DEFAULT false,
  is_blocked boolean DEFAULT false,
  created_at timestamp DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp DEFAULT CURRENT_TIMESTAMP
);

-- Create registration codes table
CREATE TABLE IF NOT EXISTS public.registration_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code varchar(10) UNIQUE NOT NULL,
  username varchar(50),
  telegram_id bigint,
  password_hash varchar(255),
  is_used boolean DEFAULT false,
  verified_by_bot boolean DEFAULT false,
  created_at timestamp DEFAULT CURRENT_TIMESTAMP,
  expires_at timestamp DEFAULT CURRENT_TIMESTAMP + INTERVAL '1 hour'
);
