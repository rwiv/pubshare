export interface AppConfig {
  aws: AwsSecret;
}

interface AwsSecret {
  accessKey: string;
  secretKey: string;
  region: string;
  bucketName: string;
}
