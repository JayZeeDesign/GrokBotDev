import postgres from 'postgres';

export function connect(url: string, max = 10) {
  return postgres(url, {
    max,
    idle_timeout: 20,
    connect_timeout: 5,
    transform: postgres.camel,
  });
}

export type Db = ReturnType<typeof connect>;
