import { S3Client } from "@aws-sdk/client-s3";

class MediaService {
  private s3: S3Client;

  constructor() {
    this.s3 = new S3Client({
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY!,
        secretAccessKey: process.env.AWS_ACCESS_SECRET!,
      },
      region: process.env.AWS_REGION!,
    });
  }

  public async uploadFile(file: Express.Multer.File) {}

  public async uploadFiles(files: Express.Multer.File[]) {}

  public async deleteFile(key: string) {}

  public async getFile(key: string) {}

  public async getFiles(keys: string[]) {}
}

export default new MediaService();
