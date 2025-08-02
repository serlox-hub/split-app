-- Permitir que user_id en la tabla persons sea null
alter table persons
alter column user_id drop not null;
