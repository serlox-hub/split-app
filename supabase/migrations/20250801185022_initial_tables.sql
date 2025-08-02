-- Tabla de grupos
create table groups (
  id uuid primary key default gen_random_uuid(),
  name text,
  created_at timestamp with time zone default now()
);

-- Personas que pertenecen a un grupo
create table persons (
  id uuid primary key default gen_random_uuid(),
  group_id uuid references groups(id) on delete cascade,
  name text not null
);

-- Tabla de gastos
create table expenses (
  id uuid primary key default gen_random_uuid(),
  group_id uuid references groups(id) on delete cascade,
  description text not null,
  amount numeric not null,
  date timestamp with time zone not null default now()
);

-- Quién pagó cada gasto (pueden ser varias personas, con proporción)
create table expense_payers (
  expense_id uuid references expenses(id) on delete cascade,
  person_id uuid references persons(id) on delete cascade,
  amount numeric not null,
  primary key (expense_id, person_id)
);

-- A quién se le repartió el gasto (pueden ser varias personas, con proporción)
create table expense_participants (
  expense_id uuid references expenses(id) on delete cascade,
  person_id uuid references persons(id) on delete cascade,
  share numeric not null, -- proporcional (por ejemplo 1.0 para partes iguales)
  primary key (expense_id, person_id)
);
