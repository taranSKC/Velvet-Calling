import { handlers } from "../../../../lib/auth";
export const { GET, POST } = handlers;
export const runtime = "edge"; // Make it run at the Edge on Cloudflare/Vercel for maximum performance!
