import { createEnv } from "@t3-oss/env-nextjs";
import { z } from 'zod';
 
export const env = createEnv({
  server: {
    CLERK_SECRET_KEY: z.string()
  },
  client: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string()
  },
  // If you're using Next.js < 13.4.4, you'll need to specify the runtimeEnv manually
  runtimeEnv: {
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  },
  // For Next.js >= 13.4.4, you only need to destructure client variables:
  // experimental__runtimeEnv: {
  //   NEXT_PUBLIC_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY,
  // }
});