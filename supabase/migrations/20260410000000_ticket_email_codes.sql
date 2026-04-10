create table if not exists ticket_email_codes (
  id         bigint generated always as identity primary key,
  email      text        not null,
  code       text        not null,
  expires_at timestamptz not null,
  attempts   int         not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists ticket_email_codes_email_created_idx
  on ticket_email_codes (email, created_at desc);

alter table ticket_email_codes enable row level security;
