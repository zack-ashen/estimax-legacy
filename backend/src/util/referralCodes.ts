import crypto, { BinaryLike } from 'crypto';
import { Referral } from '../models/referral';
import { ServerError } from '../middleware/errors';
import { Errors } from '../types';

export const validateReferralCode = async (referral: string): Promise<boolean> => {
  const referralCheck = await Referral.findOne({ referral });
  if (referralCheck) {
    throw new ServerError(Errors.REFERRAL_CODE_USED, 400);
  }

  const privateKey = process.env.REFERRAL_KEY!;

  // The code is the first 7 characters of the string
  const code = referral.substring(0, 7);

  // The bufferCode is the remainder of the string after the first 7 characters
  const bufferCode = referral.substring(7).replace(/_/g, '/').replace(/-/g, '+') + '=';

  // Convert the base64 string back to a buffer
  const buffer = Buffer.from(bufferCode, 'base64');

  // Recreate the hmac object
  const hmac = crypto.createHmac('sha256', privateKey);

  // Update the HMAC object with the buffer
  hmac.update(buffer);

  // Calculate the HMAC
  const hash = hmac.digest('hex');

  // Truncate the hash to the first 10 characters
  const recomputedCode = hash.substring(0, 7);

  // Return true if the recomputed code matches the original code, false otherwise
  return code === recomputedCode;
};