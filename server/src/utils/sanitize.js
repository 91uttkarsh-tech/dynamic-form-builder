import sanitizeHtml from 'sanitize-html';
export default function sanitize(obj) {
  if (!obj || typeof obj !== 'object') return obj;
  const out = Array.isArray(obj) ? [] : {};
  for (const k of Object.keys(obj)) {
    const val = obj[k];
    if (typeof val === 'string') out[k] = sanitizeHtml(val, { allowedTags: [], allowedAttributes: {} });
    else if (typeof val === 'object') out[k] = sanitize(val);
    else out[k] = val;
  }
  return out;
}
