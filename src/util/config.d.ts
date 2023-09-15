export interface AppConfig {
  env: string,
  aws: AwsSecret;
}

interface AwsSecret {
  accessKey: string;
  secretKey: string;
  region: string;
  bucketName: string;
}
