import crypto, { BinaryLike } from 'crypto';

function verifyReferralCode(code: string, originalData: Buffer): boolean {
  const privateKey : BinaryLike = process.env.PRIVATE_REFERRAL_KEY!;

  // Create a HMAC object using SHA256.
  const hmac = crypto.createHmac('sha256', privateKey);

  // Update the HMAC object with the original data in hexadecimal format.
  hmac.update(originalData.toString('hex'));

  // Calculate the HMAC.
  const hash = hmac.digest('hex');

  // Truncate the hash to the first 10 characters.
  const originalCode = hash.substring(0, 10);

  // Compare the calculated code with the given code.
  return code === originalCode;
}