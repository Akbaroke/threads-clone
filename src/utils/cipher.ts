import crypto from 'crypto';

const key = process.env.NEXT_PUBLIC_ENCRYPTION_KEY as string;

const encryptData = (data: string): string => {
  try {
    const cipher = crypto.createCipher('aes-256-cbc', key);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  } catch (error) {
    return '';
  }
};

const decryptData = (encryptedData: string): string => {
  try {
    const decipher = crypto.createDecipher('aes-256-cbc', key);
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  } catch (error) {
    return '';
  }
};

export { encryptData, decryptData };
