-- Añade el campo user_id a la tabla persons
alter table persons
add column user_id uuid not null;

create unique index unique_user_in_group on persons (group_id, user_id);