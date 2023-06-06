import crypto, { BinaryLike } from 'crypto';
import { Referral } from '../models/referral';
import { ServerError } from '../middleware/errors';
import { Errors } from '../types';

export const validateReferralCode = async (referral: String): Promise<boolean> => {
  const referralCheck = await Referral.findOne({ referral });
  if (referralCheck)
    throw new ServerError(Errors.REFERRAL_CODE_USED, 400)

  const code : string = referral.substring(0,7);
  const originalData : Buffer = Buffer.from(referral.substring(7,).concat("="));

  const privateKey : BinaryLike = process.env.REFERRAL_KEY!;

  // Create a HMAC object using SHA256.
  const hmac = crypto.createHmac('sha256', privateKey);

  // Update the HMAC object with the original data in hexadecimal format.
  hmac.update(originalData.toString('hex'));

  // Calculate the HMAC.
  const hash = hmac.digest('hex');

  // Truncate the hash to the first 10 characters.
  const originalCode = hash.substring(0, 7);

  // Compare the calculated code with the given code.
  return code === originalCode;
}