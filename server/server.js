const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const port = Number(process.env.PORT || 5001);
const generatedDir = path.join(__dirname, 'generated');

fs.mkdirSync(generatedDir, { recursive: true });

app.use(cors());
app.use(express.json({ limit: '10mb' }));

const companyDetails = {
  name: 'Kadapa Appliance Care',
  tagLine: 'Professional Appliance Repair & Installation',
  phone: '+91 63037 15808',
  email: 'kadapaappliancecare@gmail.com',
  website: 'https://kadapaappliancecare.com',
  address: 'Kadapa, Andhra Pradesh',
};

function generateOrderId() {
  return `KAC${Date.now()}${Math.floor(Math.random() * 900 + 100)}`;
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

function buildBookingMessage(booking) {
  const lineBreak = '\n';
  return [
    '✅ Booking Received',
    `Order ID: ${booking.orderId}`,
    `Customer: ${booking.name}`,
    `Mobile: ${booking.mobile}`,
    `Service: ${booking.serviceType}`,
    `Address: ${booking.address}`,
    booking.landmark ? `Landmark: ${booking.landmark}` : '',
    booking.issueDescription ? `Issue: ${booking.issueDescription}` : '',
    'We will contact you shortly.',
    'Kadapa Appliance Care',
  ].filter(Boolean).join(lineBreak);
}

function createBookingPdf(booking) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: 'A4', margin: 45 });
    const buffers = [];

    doc.on('data', (chunk) => buffers.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(buffers)));
    doc.on('error', reject);

    const primaryBlue = '#1d4ed8';
    const dark = '#111827';
    const muted = '#475569';
    const light = '#f8fafc';
    const accent = '#f59e0b';

    doc.rect(0, 0, 595.28, 100).fill(primaryBlue);
    doc.fillColor('#ffffff');
    doc.fontSize(24).font('Helvetica-Bold').text(companyDetails.name, 50, 30);
    doc.fontSize(10).font('Helvetica').text(companyDetails.tagLine, 50, 62);

    doc.fillColor('#1f2937');
    doc.fontSize(9).text(`Phone: ${companyDetails.phone}`, 380, 30);
    doc.text(`Email: ${companyDetails.email}`, 380, 45);
    doc.text(`Location: ${companyDetails.address}`, 380, 60);

    doc.moveTo(40, 110).lineTo(555, 110).strokeColor('#cbd5e1').stroke();
    doc.fillColor(dark).fontSize(22).font('Helvetica-Bold').text('SERVICE BOOKING CONFIRMATION', 40, 130);
    doc.fillColor('#0f766e').fontSize(11).font('Helvetica-Bold').text('BOOKING RECEIVED', 420, 136);

    const topY = 185;
    const labelX = 50;
    const valueX = 220;

    doc.fillColor(muted).fontSize(11).font('Helvetica-Bold').text('Order ID', labelX, topY);
    doc.fillColor(primaryBlue).fontSize(12).font('Helvetica-Bold').text(booking.orderId, valueX, topY);

    doc.fillColor(muted).fontSize(11).font('Helvetica-Bold').text('Booking Date', labelX, topY + 28);
    doc.fillColor(dark).fontSize(11).font('Helvetica').text(formatDate(booking.submittedAt || new Date().toISOString()), valueX, topY + 28);

    doc.fillColor(muted).fontSize(11).font('Helvetica-Bold').text('Status', labelX, topY + 56);
    doc.fillColor('#15803d').fontSize(11).font('Helvetica-Bold').text('Received', valueX, topY + 56);

    doc.moveTo(40, 260).lineTo(555, 260).strokeColor('#e2e8f0').stroke();

    doc.fillColor(dark).fontSize(16).font('Helvetica-Bold').text('Customer Details', 40, 280);
    doc.fillColor(muted).fontSize(11).font('Helvetica-Bold').text('Name', 50, 315);
    doc.fillColor(dark).fontSize(11).font('Helvetica').text(booking.name || 'N/A', 220, 315);
    doc.fillColor(muted).fontSize(11).font('Helvetica-Bold').text('Mobile', 50, 340);
    doc.fillColor(dark).fontSize(11).font('Helvetica').text(booking.mobile || 'N/A', 220, 340);
    doc.fillColor(muted).fontSize(11).font('Helvetica-Bold').text('Email', 50, 365);
    doc.fillColor(dark).fontSize(11).font('Helvetica').text(booking.email || 'Not provided', 220, 365);

    doc.fillColor(dark).fontSize(16).font('Helvetica-Bold').text('Service Information', 40, 405);
    doc.fillColor(muted).fontSize(11).font('Helvetica-Bold').text('Service Type', 50, 440);
    doc.fillColor(dark).fontSize(11).font('Helvetica').text(booking.serviceType || 'General Service', 220, 440);
    doc.fillColor(muted).fontSize(11).font('Helvetica-Bold').text('Preferred Date', 50, 465);
    doc.fillColor(dark).fontSize(11).font('Helvetica').text(booking.preferredDate || 'To be confirmed', 220, 465);
    doc.fillColor(muted).fontSize(11).font('Helvetica-Bold').text('Preferred Time', 50, 490);
    doc.fillColor(dark).fontSize(11).font('Helvetica').text(booking.preferredTime || 'To be confirmed', 220, 490);

    doc.fillColor(dark).fontSize(16).font('Helvetica-Bold').text('Location Snapshot', 40, 525);
    doc.fillColor(muted).fontSize(11).font('Helvetica-Bold').text('Address', 50, 560);
    doc.fillColor(dark).fontSize(10).font('Helvetica').text(booking.address || 'Address not available', 220, 560, { width: 300, align: 'left' });

    if (booking.landmark) {
      doc.fillColor(muted).fontSize(11).font('Helvetica-Bold').text('Landmark', 50, 610);
      doc.fillColor(dark).fontSize(10).font('Helvetica').text(booking.landmark, 220, 610, { width: 300 });
    }

    if (booking.issueDescription) {
      doc.fillColor(dark).fontSize(16).font('Helvetica-Bold').text('Issue Description', 40, 645);
      doc.fillColor(dark).fontSize(10).font('Helvetica').text(booking.issueDescription, 50, 675, { width: 490, align: 'left' });
    }

    doc.rect(40, 760, 515, 80).fill(light);
    doc.fillColor(dark).fontSize(12).font('Helvetica-Bold').text('Service Commitment', 55, 780);
    doc.fillColor(muted).fontSize(10).font('Helvetica').text('• Technician will contact you shortly', 55, 800);
    doc.text('• Service will be completed with transparent pricing', 55, 815);
    doc.text('• Quality service guaranteed at your doorstep', 55, 830);

    doc.fillColor(primaryBlue).fontSize(9).font('Helvetica-Bold').text('Thank you for choosing Kadapa Appliance Care', 40, 860);
    doc.fillColor(muted).fontSize(8).font('Helvetica').text('WhatsApp/Call: +91 63037 15808   |   Email: kadapaappliancecare@gmail.com', 40, 875);

    doc.end();
  });
}

async function sendBookingEmail(booking, pdfBuffer) {
  const smtpHost = process.env.EMAIL_HOST;
  const smtpUser = process.env.EMAIL_USER;
  const smtpPass = process.env.EMAIL_PASS;
  const destination = process.env.EMAIL_TO || companyDetails.email;

  if (!smtpHost || !smtpUser || !smtpPass) {
    return {
      sent: false,
      reason: 'SMTP credentials are not configured yet. Add EMAIL_HOST, EMAIL_USER, and EMAIL_PASS in the server .env file.',
    };
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: Number(process.env.EMAIL_PORT || 587),
    secure: String(process.env.EMAIL_SECURE || 'false').toLowerCase() === 'true',
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  const result = await transporter.sendMail({
    from: process.env.EMAIL_FROM || smtpUser,
    to: destination,
    subject: `Service Booking Received - ${booking.orderId}`,
    text: `Booking received for ${booking.name}. Order ID: ${booking.orderId}. Please find the attached PDF receipt.`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
        <h2 style="color: #1d4ed8; margin-bottom: 6px;">Kadapa Appliance Care</h2>
        <p style="margin: 0;">Service booking received</p>
        <p style="margin-top: 18px;">Hello,</p>
        <p>A new service booking has been received.</p>
        <p><strong>Order ID:</strong> ${booking.orderId}</p>
        <p><strong>Customer:</strong> ${booking.name}</p>
        <p><strong>Service:</strong> ${booking.serviceType}</p>
        <p><strong>Mobile:</strong> ${booking.mobile}</p>
        <p><strong>Location:</strong> ${booking.address}</p>
        <p style="margin-top: 16px;">Please find the attached professional PDF receipt for this booking.</p>
      </div>
    `,
    attachments: [
      {
        filename: `${booking.orderId}.pdf`,
        content: pdfBuffer,
        contentType: 'application/pdf',
      },
    ],
  });

  return {
    sent: true,
    messageId: result.messageId,
    recipient: destination,
  };
}

app.get('/health', (req, res) => {
  res.json({ ok: true, service: 'kadapa-appliance-care-server' });
});

app.get('/pdf/:fileName', (req, res) => {
  const filePath = path.join(generatedDir, req.params.fileName);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ ok: false, message: 'PDF not found' });
  }
  res.download(filePath);
});

app.post('/api/booking', async (req, res) => {
  try {
    const booking = req.body || {};
    const nextBooking = {
      ...booking,
      orderId: booking.orderId || generateOrderId(),
      submittedAt: booking.submittedAt || new Date().toISOString(),
    };

    if (!nextBooking.name || !nextBooking.mobile || !nextBooking.address || !nextBooking.serviceType || !nextBooking.issueDescription) {
      return res.status(400).json({
        ok: false,
        message: 'Please complete all required booking fields before submitting.',
      });
    }

    const pdfBuffer = await createBookingPdf(nextBooking);
    const fileName = `${nextBooking.orderId}.pdf`;
    const filePath = path.join(generatedDir, fileName);
    fs.writeFileSync(filePath, pdfBuffer);

    const emailResult = await sendBookingEmail(nextBooking, pdfBuffer);

    res.json({
      ok: true,
      orderId: nextBooking.orderId,
      pdfUrl: `http://localhost:${port}/pdf/${fileName}`,
      emailStatus: emailResult.sent ? 'sent' : 'not-sent',
      emailMessage: emailResult.sent ? `PDF emailed to ${emailResult.recipient}` : emailResult.reason,
      whatsappText: buildBookingMessage(nextBooking),
    });
  } catch (error) {
    console.error('Booking submission failed:', error);
    res.status(500).json({
      ok: false,
      message: 'Unable to process the booking right now. Please try again.',
      error: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Kadapa Appliance Care backend listening on http://localhost:${port}`);
});
