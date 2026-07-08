# EmailJS Setup Instructions for Kaarnex Contact Form

This folder contains the EmailJS template files for the Kaarnex website contact form.
Copy and paste these files into your EmailJS dashboard when creating your email template.

## Step 1 - Create an EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for an account.
3. Confirm your email address.

## Step 2 - Add an Email Service

1. In the EmailJS dashboard, go to **Email Services**.
2. Click **Add New Service**.
3. Choose your email provider, such as Gmail or Outlook.
4. Follow the prompts to connect your email account.
5. Give the service a name, for example `kaarnex_contact`.
6. Click **Create Service**.
7. Copy the Service ID for `NEXT_PUBLIC_EMAILJS_SERVICE_ID`.

## Step 3 - Create an Email Template

1. In the EmailJS dashboard, go to **Email Templates**.
2. Click **Create New Template**.
3. Set the **Subject** field from [`contact-template-subject.txt`](./contact-template-subject.txt).
4. Set the **Content/Body** field:
   - Click the source code button (`</>`) in the EmailJS editor toolbar.
   - Copy the full HTML from [`contact-template-body.html`](./contact-template-body.html).
   - Paste it into the EmailJS source code view and click OK.
5. Set **To Email** to `business@kaarnex.com`.
6. Set **From Name** to `Kaarnex Website`.
7. Set **Reply To** to `{{email}}`.
8. Save the template.
9. Copy the Template ID for `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`.

## Step 4 - Get Your Public Key

1. In the EmailJS dashboard, go to **Account** > **General**.
2. Find your Public Key under the API Keys section.
3. Copy the Public Key for `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`.

## Step 5 - Add Environment Variables

Create a `.env.local` file in the project root and add:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id_here
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id_here
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here
```

For GitHub Pages deployment, add the same three names as repository secrets.

## Step 6 - Test

1. Run the dev server: `npm run dev`
2. Navigate to the Contact page.
3. Fill in the form and click **Start Discovery**.
4. Check the inbox configured in EmailJS.
5. Verify all submitted fields appear in the received email.

## Template Variables Reference

The contact form sends these variables to EmailJS:

| Variable | Source | Description |
|---|---|---|
| `{{name}}` | Text input | Contact name, required |
| `{{email}}` | Email input | Work email, required |
| `{{phone}}` | Tel input | Phone number |
| `{{company}}` | Text input | Company name |
| `{{role}}` | Text input | Job title or role |
| `{{region}}` | Text input | Country or region |
| `{{enquiry_type}}` | Select dropdown | Type of enquiry, required |
| `{{preferred_contact}}` | Select dropdown | Preferred contact method |
| `{{timeline}}` | Select dropdown | Timeline or urgency |
| `{{message}}` | Textarea | Program details, required |
| `{{page_url}}` | Hidden input | URL at submission time |
| `{{submitted_at}}` | Hidden input | ISO timestamp of submission |
