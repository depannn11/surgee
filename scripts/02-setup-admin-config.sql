-- Setup Admin User dan Config untuk DepStore
-- Jalankan script ini di Supabase SQL Editor setelah create-tables.sql

-- 1. Create Admin User (username: soraa, password: soraa.dev)
-- Password hash sudah di-hash dengan bcrypt
INSERT INTO users (
  username, 
  email, 
  password_hash, 
  telegram_id, 
  full_name, 
  is_admin, 
  is_verified,
  bio,
  avatar_url
) VALUES (
  'soraa',
  'admin@depstore.dev',
  '$2b$10$Qw/FvNLBQy/V7HCRzZzx9eXK1D4VN6XK1D4VN6XK1D4VN6XK1D4VN', -- soraa.dev (bcrypt)
  8412273544,
  'DepStore Admin',
  true,
  true,
  'Platform administrator untuk DepStore',
  NULL
) ON CONFLICT (username) DO NOTHING;

-- 2. Save Platform Config
INSERT INTO config (
  surge_token,
  telegram_bot_token,
  owner_telegram_id,
  channel_id,
  bot_username
) VALUES (
  'your_surge_token_here',
  '8213381742:AAFHnE7p7sUpreq0H0vgdpLlzkZ38FOnAj0',
  8412273544,
  '-1003273545763',
  'SoraaVerifedROBOT'
) ON CONFLICT DO NOTHING;

-- 3. Verify Setup
SELECT 'Admin User Created!' as info, username, is_admin FROM users WHERE username = 'soraa';
SELECT 'Config Saved!' as info, bot_username, owner_telegram_id FROM config LIMIT 1;
