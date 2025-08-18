# Certificates Folder

This folder contains PDF certificates that will be displayed in the portfolio with preview functionality.

## How to Add Certificates

1. **Add your PDF certificate files** to this folder
2. **Update the portfolio data** in `index.html` to reference your certificates

## Certificate Types Supported

### 1. External Links

For certificates that have online verification links:

```json
{
  "title": "Certificate Name",
  "provider": "Provider Name",
  "description": "Certificate description",
  "year": "2024",
  "icon": "fas fa-certificate",
  "link": "https://example.com/certificate-url"
}
```

### 2. PDF Files with Preview

For certificates stored as PDF files in this folder:

```json
{
  "title": "Certificate Name",
  "provider": "Provider Name",
  "description": "Certificate description",
  "year": "2024",
  "icon": "fas fa-certificate",
  "pdfFile": "certificates/your-certificate.pdf"
}
```

## Features

- **PDF Preview**: Click "Preview" to view certificates in a modal
- **Download**: Direct download links for PDF certificates
- **External Links**: Direct links to online certificates
- **Responsive Design**: Works on all devices

## File Naming Convention

Use descriptive names for your PDF files:

- `google-ads-certification.pdf`
- `hubspot-sales-certificate.pdf`
- `french-delf-b2-certificate.pdf`

## Security Note

Only add certificates that you're comfortable sharing publicly, as they will be accessible through your portfolio website.
