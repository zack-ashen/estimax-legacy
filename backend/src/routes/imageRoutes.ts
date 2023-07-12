import express from 'express'
import multer from 'multer';
import { S3Client } from '@aws-sdk/client-s3';
import multerS3 from 'multer-s3';

import { getUrl } from '../controllers/imageController';

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_ACCESS_SECRET!
  },
  region: process.env.AWS_REGION!
});

const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.AWS_BUCKET_NAME!,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      // Generate a unique key using the current date and original file name
      cb(null, `${Date.now().toString()}-${file.originalname}`);
    }, 
    contentType: multerS3.AUTO_CONTENT_TYPE
  }),
});

const router = express.Router();

router.post('/project-images', upload.array('images'), async (req, res, next) => {
  const files = req.files as Express.MulterS3.File[];

  const keys = files.map(file => file.key); // 'location' contains the url of the image in S3

  res.send({ images: keys }); // send the URLs of the images back to the client
});

router.get('/project-image/:key', async (req, res) => {
  const key = req.params.key;

  const url = getUrl(key as string);


  res.send({ url });


})

export default router;