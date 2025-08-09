# Environment Variables

Create a `.env` file in the project root with the following variables:

```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key

# hCaptcha site key (client public key)
VITE_HCAPTCHA_SITEKEY=your_hcaptcha_site_key

# Google Analytics 4
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Notes:
- EmailJS variables are used by the client to submit the form to EmailJS REST API.
- `VITE_HCAPTCHA_SITEKEY` is the client-side site key from hCaptcha dashboard.
- For stronger security, consider adding a small serverless proxy that verifies the hCaptcha token server-side before forwarding to EmailJS. The client already includes the `hcaptcha_token` in `template_params` for that future step.

Analytics:
- If `VITE_GA_MEASUREMENT_ID` is set, GA4 will be initialized and page_view events will be sent on route changes.
