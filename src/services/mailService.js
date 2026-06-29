import axios from "axios";

const DATABASE_URL = import.meta.env.VITE_FIREBASE_DATABASE_URL;

export const sendMail = async (mailData) => {
  const senderKey = mailData.from.replace(/\./g, ",");
  const receiverKey = mailData.to.replace(/\./g, ",");

  await axios.post(
    `${DATABASE_URL}/mailbox/inbox/${receiverKey}.json`,
    mailData
  );

  await axios.post(
    `${DATABASE_URL}/mailbox/sent/${senderKey}.json`,
    mailData
  );
};

export const getInboxMails = async (email) => {
  const userKey = email.replace(/\./g, ",");

  const response = await axios.get(
    `${DATABASE_URL}/mailbox/inbox/${userKey}.json`
  );

  const data = response.data;

  if (!data) return [];

  const mails = [];

  for (const key in data) {
    mails.push({
      id: key,
      ...data[key],
    });
  }

  return mails.reverse();
};
export const getSingleMail = async (email, mailId) => {
  const userKey = email.replace(/\./g, ",");

  const response = await axios.get(
    `${DATABASE_URL}/mailbox/inbox/${userKey}/${mailId}.json`
  );

  return response.data;
};

export const markMailAsRead = async (email, mailId) => {
  const userKey = email.replace(/\./g, ",");

  await axios.patch(
    `${DATABASE_URL}/mailbox/inbox/${userKey}/${mailId}.json`,
    {
      read: true,
    }
  );
};