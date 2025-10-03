import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://djtrsbnmuzvpfgshvqyt.supabase.co/storage/v1/object/public/images/**')],
  },
   experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
};

export default nextConfig;
