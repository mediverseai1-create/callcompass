-- CallCompass schema. Run in the Supabase SQL editor.
create extension if not exists "pgcrypto";

create table organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  plan text not null default 'free' check (plan in ('free','starter','growth')),
  subscription_status text not null default 'none' check (subscription_status in ('none','active','past_due','canceled')),
  created_at timestamptz not null default now()
);
create table memberships (
  org_id uuid not null references organizations on delete cascade,
  user_id uuid not null references auth.users on delete cascade,
  role text not null default 'owner' check (role in ('owner','member')),
  primary key (org_id, user_id)
);
create table deals (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references organizations on delete cascade,
  owner_id uuid references auth.users,
  name text not null,
  company text not null,
  amount numeric not null default 0 check (amount >= 0),
  stage text not null default 'discovery' check (stage in ('discovery','evaluation','proposal','negotiation','won','lost')),
  close_date date,
  has_champion boolean not null default false,
  has_next_step boolean not null default false,
  created_at timestamptz not null default now()
);
create table calls (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references organizations on delete cascade,
  user_id uuid not null references auth.users,
  deal_id uuid references deals on delete set null,
  title text not null,
  rep_name text not null,
  call_date date not null default current_date,
  transcript text not null,
  metrics jsonb not null default '{}',
  ai_analysis jsonb,
  ai_status text not null default 'skipped' check (ai_status in ('done','failed','skipped')),
  created_at timestamptz not null default now()
);
create table usage_events (
  id bigserial primary key,
  org_id uuid not null references organizations on delete cascade,
  kind text not null,
  created_at timestamptz not null default now()
);
create index on calls (org_id, created_at desc);
create index on deals (org_id);
create index on usage_events (org_id, created_at);

create or replace function is_member(o uuid) returns boolean
language sql security definer stable set search_path = public as
$$ select exists (select 1 from memberships where org_id = o and user_id = auth.uid()) $$;

alter table organizations enable row level security;
alter table memberships enable row level security;
alter table deals enable row level security;
alter table calls enable row level security;
alter table usage_events enable row level security;

create policy org_read on organizations for select using (is_member(id));
create policy org_rename on organizations for update using (is_member(id)) with check (is_member(id));
create policy mem_read on memberships for select using (user_id = auth.uid());
create policy deals_all on deals for all using (is_member(org_id)) with check (is_member(org_id));
create policy calls_all on calls for all using (is_member(org_id)) with check (is_member(org_id) and user_id = auth.uid());
create policy usage_read on usage_events for select using (is_member(org_id));
create policy usage_insert on usage_events for insert with check (is_member(org_id));

-- plan / subscription_status can only be changed by the service role (billing webhook).
create or replace function protect_billing() returns trigger language plpgsql as $$
begin
  if auth.role() <> 'service_role' and (new.plan <> old.plan or new.subscription_status <> old.subscription_status) then
    raise exception 'billing fields are read-only';
  end if;
  return new;
end $$;
create trigger protect_billing_t before update on organizations for each row execute function protect_billing();

-- On signup: create an organization and an owner membership.
create or replace function handle_new_user() returns trigger language plpgsql security definer set search_path = public as $$
declare o uuid;
begin
  insert into organizations(name) values (split_part(new.email,'@',1) || ' team') returning id into o;
  insert into memberships(org_id,user_id,role) values (o,new.id,'owner');
  return new;
end $$;
create trigger on_auth_user_created after insert on auth.users for each row execute function handle_new_user();
