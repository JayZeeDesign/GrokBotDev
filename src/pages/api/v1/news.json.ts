// Lightweight news list for bots and readers that only need fresh announcements, deals,
// releases and updates. Full body lives at each item's detail_url.
import type { APIRoute } from 'astro';
import { allNews, newsEnvelope } from '../../../lib/news';
import { jsonResponse } from '../../../lib/api';

export const GET: APIRoute = async () => jsonResponse(newsEnvelope(await allNews()));
