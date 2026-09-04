// Base64-encoded so plain email/phone text never appears in the server-rendered
// HTML — only decoded client-side once the person clicks "reveal" (see
// ContactMe.tsx). This isn't real security, just enough to defeat naive
// regex-based scrapers that scan raw HTML without executing JS.

export const contactEmailEncoded = "aGVsbG9AcG9yYW4uZGV2";
export const contactPhoneEncoded = "KzkxIDg4MjI1IDg5NDA0";
