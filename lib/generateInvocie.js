import { customAlphabet } from "nanoid";

const uniqueNumb = customAlphabet("QWERTYUIOPASDFGHJKLZXCVBNM1234567890", 10);

const generateInvoice = function () {
  let invoice = `INV-${uniqueNumb()}`;
  return invoice;
};

export default generateInvoice;
