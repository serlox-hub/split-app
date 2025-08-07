-- 1- Create M:N intermediate table between persons and groups
create table group_members (
  group_id uuid references public.groups(id) on delete cascade,
  person_id uuid references public.persons(id) on delete cascade,
  joined_at timestamp with time zone default now(),
  primary key (group_id, person_id)
);

-- 2. Migrate existing data from persons.group_id to group_members
insert into group_members (group_id, person_id)
select group_id, id
from persons
where group_id is not null;

-- 3. Drop the group_id column from persons
alter table persons drop constraint persons_group_id_fkey;
alter table persons drop column group_id;
