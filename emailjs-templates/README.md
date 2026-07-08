# EmailJS Setup Instructions for Kaarnex Contact Form

This folder contains the EmailJS template files for the Kaarnex website contact form.
Copy and paste the contents of these files into your EmailJS dashboard when creating your email template.

---

## Step 1 — Create an EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a **free account** (200 emails/month)
3. Confirm your email address

---

## Step 2 — Add an Email Service

1. In the EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (e.g., Gmail, Outlook, or any other)
4. Follow the prompts to connect your email account
5. Give the service a name (e.g., `kaarnex_contact`)
6. Click **Create Service**
7. **Copy the Service ID** — you'll need it for `NEXT_PUBLIC_EMAILJS_SERVICE_ID`

---

## Step 3 — Create an Email Template

1. In the EmailJS dashboard, go to **Email Templates**
2. Click **Create New Template**
3. Set the **Subject** field — copy from:
   [`contact-template-subject.txt`](./contact-template-subject.txt)
4. Set the **Content/Body** field:
   - Click the source code button (`</>` icon) on the EmailJS editor toolbar.
   - Copy the entire HTML code from: [`contact-template-body.html`](./contact-template-body.html)
   - Paste it into the source code view window in EmailJS and click OK.
5. Set the **To Email** to: `business@kaarnex.com`
6. Set the **From Name** to: `Kaarnex Website`
7. Set the **Reply To** to: `{{email}}`
8. Click **Save**
9. **Copy the Template ID** — you'll need it for `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`

---

## Step 4 — Get Your Public Key

1. In the EmailJS dashboard, go to **Account** → **General**
2. Find your **Public Key** under the API Keys section
3. **Copy the Public Key** — you'll need it for `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`

---

## Step 5 — Add Environment Variables

Create a `.env.local` file in the project root (if it doesn't exist) and add:

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id_here
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id_here
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here
```

Replace the placeholder values with the IDs you copied from the EmailJS dashboard.

> **Note:** The `NEXT_PUBLIC_` prefix is required by Next.js so these values are available in the browser. This is safe — EmailJS is designed for browser-side use and the public key is not a secret.

---

## Step 6 — Test

1. Run the dev server: `npm run dev`
2. Navigate to the Contact page
3. Fill in the form and click **Start Discovery**
4. Check your inbox (the **To Email** configured in Step 3) for the enquiry email
5. Verify all 12 fields appear correctly in the received email

---

## Template Variables Reference

The following variables are sent from the contact form and available in the EmailJS template:

| Variable             | Source               | Description                        |
|----------------------|----------------------|------------------------------------|
| `{{name}}`           | Text input           | Contact name (required)            |
| `{{email}}`          | Email input          | Work email (required)              |
| `{{phone}}`          | Tel input            | Phone number (optional)            |
| `{{company}}`        | Text input           | Company name (optional)            |
| `{{role}}`           | Text input           | Job title / role (optional)        |
| `{{region}}`         | Text input           | Country or region (optional)       |
| `{{enquiry_type}}`   | Select dropdown      | Type of enquiry (required)         |
| `{{preferred_contact}}` | Select dropdown   | Preferred contact method           |
| `{{timeline}}`       | Select dropdown      | Timeline / urgency                 |
| `{{message}}`        | Textarea             | Program details (required)         |
| `{{page_url}}`       | Hidden (auto-filled) | URL of the page at submission time |
| `{{submitted_at}}`   | Hidden (auto-filled) | ISO timestamp of submission        |

---

## EmailJS Free Plan Limits

- **200 emails per month**
- 2 email templates
- 1 email service
- No credit card required

This is sufficient for the current Kaarnex contact form usage.
