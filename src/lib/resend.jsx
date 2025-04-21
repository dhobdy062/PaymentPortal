import { Resend } from 'resend';

const resend = new Resend(process.env.REACT_APP_RESEND_API_KEY);

export async function sendConfirmationEmail(data) {
  const emailContent = `
    <h2>Payment Confirmation</h2>
    <p>Dear ${data.contact},</p>
    <p>Thank you for your payment. Below are the details:</p>
    <ul>
      <li><strong>Business Name:</strong> ${data.client_business_name}</li>
      <li><strong>Email:</strong> ${data.client_email}</li>
      <li><strong>Payment Amount:</strong> $${data.payment_amount.toFixed(2)}</li>
      <li><strong>Amount After Fees:</strong> $${data.amount_minus_fees.toFixed(2)}</li>
      <li><strong>Transaction ID:</strong> ${data.transaction_id}</li>
      <li><strong>Date of Payment:</strong> ${new Date(data.date_of_payment).toLocaleString()}</li>
      <li><strong>DMG Caller:</strong> ${data.dmg_caller}</li>
      <li><strong>DMG Consultant:</strong> ${data.dmg_consultant}</li>
      <li><strong>Expected Start Date:</strong> ${new Date(data.expected_start_date).toLocaleDateString()}</li>
      <li><strong>Services Provided:</strong> ${data.services_provided}</li>
    </ul>
    <p>We will contact you soon to begin the services.</p>
  `;

  await resend.emails.send({
    from: 'no-reply@marketing.retrospxt.com',
    to: data.client_email,
    subject: 'Payment Confirmation',
    html: emailContent,
  });
}