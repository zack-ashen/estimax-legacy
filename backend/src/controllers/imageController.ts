import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_ACCESS_SECRET,
  region: process.env.AWS_REGION
});
const s3 = new AWS.S3();

export function addImage(image: any): string {

  return '';
}




export function getUrl(imageKey: string): string {
  console.log(imageKey)

  const url = s3.getSignedUrl('getObject', {
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: imageKey, // replace with your image key
    Expires: 60 * 60 * 24 // URL expires in 1 hour
  });


  return url;
}