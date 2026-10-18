// Turns a heading or question into a URL fragment: "Does it need the internet?" -> "does-it-need-the-internet".
export function slug(text: string): string {
  return text
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
