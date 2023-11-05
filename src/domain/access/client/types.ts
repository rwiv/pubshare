export interface S3File {
  key: string;
  isDirectory: boolean;
  lastModified: Date;
  size: number;
}
