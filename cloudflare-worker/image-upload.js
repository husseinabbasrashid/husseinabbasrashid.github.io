const ALLOWED_ORIGIN = 'https://husseinabbasrashid.github.io';
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

function json(body, status, origin = ALLOWED_ORIGIN) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Vary': 'Origin'
    }
  });
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin');
    if (origin !== ALLOWED_ORIGIN) return json({ error: 'Origin not allowed.' }, 403);

    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': origin,
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Max-Age': '86400',
          'Vary': 'Origin'
        }
      });
    }
    if (request.method !== 'POST') return json({ error: 'Use POST to upload an image.' }, 405, origin);
    if (!env.IMGBB_API_KEY) return json({ error: 'Image service is not configured.' }, 503, origin);

    try {
      const form = await request.formData();
      const image = form.get('image');
      if (!(image instanceof File)) return json({ error: 'Choose an image file.' }, 400, origin);
      if (!image.type.startsWith('image/')) return json({ error: 'Only image files are allowed.' }, 415, origin);
      if (image.size > MAX_IMAGE_SIZE) return json({ error: 'Image must be 5 MB or smaller.' }, 413, origin);

      const uploadForm = new FormData();
      uploadForm.append('image', image, image.name);
      const uploadUrl = new URL('https://api.imgbb.com/1/upload');
      uploadUrl.searchParams.set('key', env.IMGBB_API_KEY);

      const upstream = await fetch(uploadUrl, { method: 'POST', body: uploadForm });
      const result = await upstream.json();
      const imageUrl = result?.data?.url;
      if (!upstream.ok || !imageUrl || !imageUrl.startsWith('https://')) {
        return json({ error: result?.error?.message || 'The image host rejected this upload.' }, 502, origin);
      }

      return json({ url: imageUrl }, 200, origin);
    } catch {
      return json({ error: 'Could not upload this image. Please try again.' }, 400, origin);
    }
  }
};
