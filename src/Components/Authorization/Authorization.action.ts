import * as crypto from 'crypto';

export const encryptPassword = (passwordIn: any) => {
  // Here we need to encrypt prior sending via https
  // to store not password but hashes,
  // but for this exercise I am just returning the string
  return passwordIn;
};
