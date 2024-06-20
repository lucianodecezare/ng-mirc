# NG mIRC

A simple chat where everyone talks at the same time in the same room, just like a mIRC.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.4.

![ng-mIRC](https://github.com/lucianodecezare/ng-mirc/assets/12416871/f35027fe-21fc-416a-9332-9290a01c9f0c)

## Database

The database used was [Supabase](https://supabase.com/docs)

You'll need to create a project and use the `Project URL` and `API Key` to connect to it!

The authentication was done with Supabase too using Github! [Auth docs here!](https://supabase.com/docs/guides/auth)

## Users

### Table definition

```sql
create table
  public.users (
    id uuid not null,
    full_name text null,
    avatar_url text null,
    constraint users_pkey primary key (id),
    constraint users_id_fkey foreign key (id) references auth.users (id) on delete cascade
  ) tablespace pg_default;
```

### Function definition

```sql
begin insert
into public.users(id, full_name, avatar_url)
values
(
  new.id,
  new.raw_user_meta_data ->> 'full_name'::text,
  new.raw_user_meta_data ->> 'avatar_url'::text
);
return new;
end;
```

## Chat

### Table definition

```sql
create table
  public.chat (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone not null default now(),
    text text not null,
    editable boolean not null default false,
    sender uuid not null default auth.uid (),
    constraint chat_pkey primary key (id),
    constraint chat_sender_fkey foreign key (sender) references users (id) on update cascade on delete cascade
  ) tablespace pg_default;
```
