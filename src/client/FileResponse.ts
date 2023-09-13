export class FileResponse {
  constructor(
    readonly key: string,
    readonly isDirectory: boolean,
    readonly lastModified: Date,
    readonly size: number,
  ) {}
}
