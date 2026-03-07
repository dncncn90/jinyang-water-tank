-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. PROFILES (Extends auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  business_name text, -- 상호명 (B2B)
  business_registration_number text, -- 사업자등록번호 (B2B)
  contact_name text, -- 담당자명
  contact_phone text, -- 연락처
  tax_email text, -- 세금계산서 이메일
  default_address text, -- 기본 배송지
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. PRODUCTS
create table public.products (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text,
  price integer not null,
  stock integer default 0,
  category text, -- e.g., 'round', 'square', 'accessory'
  tonnage text, -- e.g., '1톤', '3톤'
  dimensions text, -- e.g., 'Ø1600 x H1750'
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. ORDERS
create table public.orders (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete set null, -- Nullable for Guest
  
  -- Guest Info (If user_id is null)
  guest_name text,
  guest_phone text,
  guest_password text, -- Hashed password for lookup security
  
  -- Order Details
  cancellation_reason text,
  total_amount integer not null,
  status text default 'pending' check (status in ('pending', 'awaiting_deposit', 'paid', 'preparing', 'shipping', 'completed', 'cancelled')),
  
  -- Payment Info (Toss)
  payment_method text, -- 'CARD', 'VIRTUAL_ACCOUNT'
  payment_key text, -- Toss Payment Key
  payment_approved_at timestamp with time zone,
  
  -- Shipping Info
  recipient_name text not null,
  recipient_phone text not null,
  shipping_address text not null,
  shipping_memo text, -- 배송 요청사항
  
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. ORDER ITEMS
create table public.order_items (
  id uuid default uuid_generate_v4() primary key,
  order_id uuid references public.orders(id) on delete cascade not null,
  product_id uuid references public.products(id) on delete set null,
  
  -- Snapshot of product data at time of order
  product_name text not null,
  product_price integer not null,
  quantity integer not null,
  options jsonb, -- e.g., { "fitting": "25mm", "color": "blue" }
  
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Policies (RLS) would be added here for security
alter table public.profiles enable row level security;
alter table public.orders enable row level security;
