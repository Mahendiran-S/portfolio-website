import type { NextRequest } from 'next/server';
import { revalidatePath } from 'next/cache';

/**
 * Webhook handler for Sanity on-demand revalidation.
 *
 * Configure this in Sanity Studio:
 *   Datasets → Production → Webhooks → Add Webhook
 *     URL:    https://your-portfolio.vercel.app/api/revalidate
 *     Secret: (set SANITY_REVALIDATE_SECRET env var)
 *     Filter: *[_type in ["profile","experience","project","certificate","skill","education","achievement","resume","hackathon","testimonial","service","workshop","publication","socialLink"]]
 *     Trigger on: Create, Update, Delete
 */
export async function POST(req: NextRequest) {
  const secret = req.headers.get('x-sanity-secret');

  // Validate webhook secret (prevents unauthorized revalidation)
  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return new Response(JSON.stringify({ message: 'Invalid secret' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const documentType: string = body._type ?? '';

    // Revalidate all cache tags associated with the changed content type
    const tagMap: Record<string, string[]> = {
      profile: ['profile', 'hero', 'about', 'contact', 'footer'],
      experience: ['experience'],
      project: ['projects'],
      certificate: ['certificates'],
      skill: ['skills'],
      education: ['education'],
      achievement: ['achievements'],
      resume: ['resume'],
      hackathon: ['hackathons'],
      testimonial: ['testimonials'],
      service: ['services'],
      workshop: ['workshops'],
      publication: ['publications'],
      socialLink: ['social'],
    };

    // Revalidate by path — triggers fresh fetch for all tagged pages
    const tagsToRevalidate = tagMap[documentType] ?? ['portfolio'];
    console.log(`[Revalidate] Type: ${documentType}, Tags: ${tagsToRevalidate.join(', ')}`);

    // Revalidate the home page which contains all portfolio sections
    revalidatePath('/', 'page');

    return new Response(
      JSON.stringify({
        revalidated: true,
        documentType,
        tags: tagsToRevalidate,
        now: new Date().toISOString(),
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('[Revalidate] Error:', err);
    return new Response(
      JSON.stringify({ message: 'Revalidation failed', error: String(err) }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
