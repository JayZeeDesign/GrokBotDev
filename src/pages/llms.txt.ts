export const prerender = true;

export function GET() {
  return new Response('grokbot.dev machine-readable scaffold\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
