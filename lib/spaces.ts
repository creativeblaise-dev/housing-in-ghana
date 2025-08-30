import { S3Client } from "@aws-sdk/client-s3";
import config from "@/lib/config";

export const spacesClient = new S3Client({
  endpoint: config.env.dospaces.endpoint,
  region: config.env.dospaces.region,
  forcePathStyle: true,
  credentials: {
    accessKeyId: config.env.dospaces.key,
    secretAccessKey: config.env.dospaces.secret,
  },
});
