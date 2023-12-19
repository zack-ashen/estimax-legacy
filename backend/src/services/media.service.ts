import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import multer from "multer";
import multerS3 from "multer-s3";
import { Media } from "../models/sub-schema/media";

class MediaService {
  private s3: S3Client;
  public upload: multer.Multer;

  constructor() {
    this.s3 = new S3Client({
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY!,
        secretAccessKey: process.env.AWS_ACCESS_SECRET!,
      },
      region: process.env.AWS_REGION!,
    });

    this.upload = multer({
      storage: multerS3({
        s3: this.s3,
        bucket: process.env.AWS_BUCKET_NAME!,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req, file, cb) {
          cb(null, Date.now().toString());
        },
      }),
    });
  }

  public isMedia(object: any): object is Media {
    return object && "accessString" in object;
  }

  public multerToMedia(file: MulterS3File): Media {
    return {
      accessString: file.key,
      size: file.size,
      type: file.mimetype,
      name: file.originalname,
    };
  }

  public multerToMedias(files: MulterS3File[]): Media[] {
    return files.map((file) => this.multerToMedia(file));
  }

  public async generatePresignedUrl(key: string): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: key,
    });

    // The URL will be valid for 60 minutes
    return await getSignedUrl(this.s3, command, { expiresIn: 3600 });
  }

  public async uploadFile(file: Express.Multer.File) {}

  public async deleteFile(key: string) {}

  public async getFile(key: string) {}

  public async getFiles(keys: string[]) {}
}

export interface MulterS3File extends Express.Multer.File {
  key: string; // Add additional properties used by multer-s3
  location: string; // URL of the file
}

export default new MediaService();
