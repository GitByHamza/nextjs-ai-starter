-- Add plan type tracking to profiles table
alter table profiles 
add column if not exists plan_type text default 'free',
add column if not exists lemon_squeezy_subscription_id text;
