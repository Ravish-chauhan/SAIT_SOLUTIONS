/**
 * Triggers on-demand cache revalidation on the main website.
 * Called after every product/category create, update, or delete in admin panel.
 */
export async function triggerRevalidation(tags: string[] = ['products', 'categories']) {
  const mainSiteUrl = process.env.MAIN_SITE_URL;
  const secret = process.env.REVALIDATION_SECRET;

  if (!mainSiteUrl || !secret) {
    console.warn('[Revalidation] MAIN_SITE_URL or REVALIDATION_SECRET not set. Skipping cache revalidation.');
    return;
  }

  try {
    const res = await fetch(`${mainSiteUrl}/api/revalidate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret, tags }),
    });

    const data = await res.json();
    if (data.success) {
      console.log(`[Revalidation] Cache busted for tags: ${tags.join(', ')}`);
    } else {
      console.error('[Revalidation] Failed:', data.error);
    }
  } catch (error) {
    console.error('[Revalidation] Error calling main site:', error);
  }
}
