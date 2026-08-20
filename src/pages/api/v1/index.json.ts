export const prerender = true;

export function GET() {
  return new Response(
    JSON.stringify({
      generated_at: new Date().toISOString(),
      count: 0,
      items: [],
      links: {
        plugins: '/api/v1/plugins.json',
        use_cases: '/api/v1/use-cases.json',
        collections: '/api/v1/collections.json',
      },
    }, null, 2),
    { headers: { 'Content-Type': 'application/json; charset=utf-8' } },
  );
}
