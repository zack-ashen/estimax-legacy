const crypto = require("crypto")
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

function generateSecretKey() {
    // Generate 256 random bits (32 bytes) for use as a secret key.
    const keyBuffer = crypto.randomBytes(32);

    // Convert the key to a hexadecimal string.
    const key = keyBuffer.toString('hex');

    return key;
}

function generateReferralCode() {
  // Generate 10 bytes of random data.
  const buffer = crypto.randomBytes(5);

  const privateKey = process.env.REFERRAL_KEY;

  // Create a HMAC object using SHA256.
  const hmac = crypto.createHmac('sha256', privateKey);

  // Update the HMAC object with the random bytes.
  hmac.update(buffer);

  // Calculate the HMAC.
  const hash = hmac.digest('hex');

  // Truncate the hash to the first 10 characters.
  const code = hash.substring(0, 7);

  // Convert the buffer to a base64-encoded string.
  const bufferCode = buffer.toString('base64').replace(/\//g, '_').replace(/\+/g, '-');

  return code + bufferCode;
}

for (let i = 0; i<20; i++)
  console.log(generateReferralCode());