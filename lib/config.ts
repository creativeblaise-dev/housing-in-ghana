const config = {
  env: {
    apiEndpoint: process.env.NEXT_PUBLIC_API_ENDPOINT!,
    prodApiEndpoint: process.env.NEXT_PUBLIC_PROD_API_ENDPOINT!,
    imagekit: {
      publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
      urlEndpoit: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
      privateKey: process.env.NEXT_PUBLIC_IMAGEKIT_PRIVATE_KEY!,
    },
    databaseUrl: process.env.DATABASE_URL!,
    // authSecret: process.env.AUTH_SECRET!,
    betterAuthSecret: process.env.BETTER_AUTH_SECRET!,
    betterAuthURL: process.env.BETTER_AUTH_URL!,
    resendApiKey: process.env.RESEND_API_KEY!,
    upstash: {
      redisUrl: process.env.UPSTASH_REDIS_URL!,
      redisToken: process.env.UPSTASH_REDIS_TOKEN!,
    },
    dospaces: {
      key: process.env.DO_SPACES_KEY!,
      secret: process.env.DO_SPACES_SECRET!,
      endpoint: process.env.DO_SPACES_ENDPOINT!,
      region: process.env.DO_SPACES_REGION!,
      bucket: process.env.DO_SPACES_BUCKET!,
      cdnEndpoint: process.env.DO_SPACES_CDN_ENDPOINT!,
    },
    qstash: {
      url: process.env.QSTASH_URL!,
      token: process.env.QSTASH_TOKEN!,
      currentSigningKey: process.env.QSTASH_CURRENT_SIGNING_KEY!,
      nextSigningKey: process.env.QSTASH_NEXT_SIGNING_KEY!,
    },
  },
};

export default config;
