import { Client } from "@upstash/workflow";
import config from "@/lib/config";

export const workflowClient = new Client({
  baseUrl: config.env.qstash.url,
  token: config.env.qstash.token,
});
