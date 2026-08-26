import postgres from 'postgres';

export function connect(url: string, max = 10) {
  return postgres(url, {
    max,
    idle_timeout: 20,
    connect_timeout: 5,
    // Column names are camelized for TypeScript ergonomics; JSONB values are intentionally
    // left byte-for-byte in their stored shape so the hash-chain verifier sees canonical rows.
    transform: { column: { from: postgres.toCamel } },
  });
}

export type Db = ReturnType<typeof connect>;
