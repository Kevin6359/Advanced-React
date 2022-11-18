import { createTransport, getTestMessageUrl } from 'nodemailer';

const transport = createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

function makeANiceEmail(text: string) {
  return `
    <div style="
        border: 1px solid black;
        padding: 10px;
        font-family: sans-serif;
        line-height: 2;
        font-size: 20px;
    ">
        <h2>Hello there!</h2>
        <p>${text}</p>
        <p>Kevin Satti</p>
    </div>`;
}

export async function sendPasswordResetEmail(
  resetToken: string,
  to: string
): Promise<void> {
  const info = await transport.sendMail({
    to,
    from: 'test@example.com',
    subject: 'Your password reset link',
    html: makeANiceEmail(`Your Password Reset Link is here
        <a href="${process.env.FRONTEND_URL}/reset?token=${resetToken}">Click here to reset</a>`),
  });
  if (process.env.MAIL_USER.includes('ethereal.email')) {
    console.log(`Message Sent! Get preview at ${getTestMessageUrl(info)}`);
  }
}
