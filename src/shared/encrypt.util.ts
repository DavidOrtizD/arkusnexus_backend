import * as bc from 'bcrypt';

export const encrypt = async (textToEncrypt: string) => {
  try {
    return await bc.hash(textToEncrypt, 17);
  } catch(e) {
    console.log(e);
  }
}

export const comparePass = async(providedPassword: string, dbPass: string) => {
 return await bc.compare(providedPassword, dbPass);
}


