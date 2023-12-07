import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_KEY!);

const DEV_ENV = process.env.ENV === 'dev';


export const sendSignUpEmail = (email: string) => {
  const msg = {
    to: email, // Change to your recipient
    from: "andrew@estimax.us", // Change to your verified sender
    templateId: process.env.SENDGRID_SIGN_UP!,
  };
  if (!DEV_ENV) {
    sgMail
      .send(msg)
      .then(() => {
        console.log("Email sent");
      })
      .catch((error) => {
        console.error(error);
      });
  }
};