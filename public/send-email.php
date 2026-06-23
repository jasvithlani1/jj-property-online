<?php
/**
 * JJ Property Partner — Contact Form Handler
 *
 * Handles two things in a single server-side request:
 *  1. Creates an inquiry document in Sanity CMS
 *  2. Sends confirmation + lead-notification emails via Brevo
 *
 * Credentials are loaded from config.php (gitignored, never bundled to the browser).
 */

// ── Load credentials ──────────────────────────────────────────────────────────
$config_path = __DIR__ . '/config.php';
if (!file_exists($config_path)) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Server configuration missing.']);
    exit;
}
require_once $config_path;

// ── CORS — restrict to production domain only ─────────────────────────────────
$allowed_origins = ['https://www.jjpropertypartner.com.au', 'https://jjpropertypartner.com.au'];
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowed_origins, true)) {
    header('Access-Control-Allow-Origin: ' . $origin);
} else {
    // Same-origin requests (production) have no Origin header — allow them silently
    header('Access-Control-Allow-Origin: https://www.jjpropertypartner.com.au');
}
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Content-Type: application/json');
header('X-Content-Type-Options: nosniff');

// ── Preflight ─────────────────────────────────────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// ── Method guard ──────────────────────────────────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method not allowed.']);
    exit;
}

// ── Parse + sanitise input ────────────────────────────────────────────────────
$input = file_get_contents('php://input');
$data  = json_decode($input, true);

$name    = isset($data['name'])    ? trim(strip_tags($data['name']))    : '';
$email   = isset($data['email'])   ? trim(strip_tags($data['email']))   : '';
$phone   = isset($data['phone'])   ? trim(strip_tags($data['phone']))   : '';
$goal    = isset($data['goal'])    ? trim(strip_tags($data['goal']))    : '';
$message = isset($data['message']) ? trim(strip_tags($data['message'])) : '';

// ── Validation ────────────────────────────────────────────────────────────────
if (empty($name) || empty($email)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Name and email are required.']);
    exit;
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Invalid email address.']);
    exit;
}
if (strlen($name) > 200 || strlen($message) > 5000) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Input exceeds maximum length.']);
    exit;
}

$goal_map = [
    'owner-occupier'      => 'Owner Occupier / First Home',
    'investment'          => 'Investment Property',
    'smsf'                => 'SMSF Acquisition',
    'commercial-property' => 'Commercial Property',
];
$display_goal = $goal_map[$goal] ?? ($goal ?: 'Not specified');

// ── 1. Create Sanity inquiry document ─────────────────────────────────────────
function create_sanity_inquiry($name, $email, $phone, $goal, $message) {
    $document = [
        '_type'       => 'inquiry',
        'name'        => $name,
        'email'       => $email,
        'phone'       => $phone,
        'goal'        => $goal,
        'message'     => $message,
        'submittedAt' => date('c'),
        'status'      => 'new',
    ];

    $url = 'https://' . SANITY_PROJECT_ID . '.api.sanity.io/v2021-06-07/data/mutate/' . SANITY_DATASET;

    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL            => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => json_encode(['mutations' => [['create' => $document]]]),
        CURLOPT_HTTPHEADER     => [
            'Authorization: Bearer ' . SANITY_WRITE_TOKEN,
            'Content-Type: application/json',
        ],
        CURLOPT_TIMEOUT        => 10,
    ]);

    $response  = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    return ['code' => $http_code, 'response' => json_decode($response, true)];
}

// ── 2. Send emails via Brevo ──────────────────────────────────────────────────
function send_brevo_email($payload) {
    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL            => 'https://api.brevo.com/v3/smtp/email',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => json_encode($payload),
        CURLOPT_HTTPHEADER     => [
            'api-key: ' . BREVO_API_KEY,
            'Content-Type: application/json',
            'Accept: application/json',
        ],
        CURLOPT_TIMEOUT        => 10,
    ]);

    $response  = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    return ['code' => $http_code, 'response' => json_decode($response, true)];
}

// Customer thank-you email
$customer_html = '<!DOCTYPE html><html><head><meta charset="utf-8"></head><body style="margin:0;padding:0;background:#f9f9f9;font-family:Helvetica,Arial,sans-serif;color:#333">
<table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center"><table style="max-width:600px;width:100%;background:#fff;border:1px solid #e0e0e0;border-radius:8px;overflow:hidden">
<tr><td align="center" style="background:#011122;padding:30px 20px">
<img src="https://www.jjpropertypartner.com.au/logo.png" alt="JJ Property Partner" width="120" style="display:block;margin:0 auto 12px">
<h1 style="margin:0;color:#d4af37;font-size:24px;text-transform:uppercase;letter-spacing:3px">JJ Property Partner</h1></td></tr>
<tr><td style="padding:40px 30px;line-height:1.6">
<p style="font-size:16px;margin-top:0">Dear ' . htmlspecialchars($name, ENT_QUOTES, 'UTF-8') . ',</p>
<p style="font-size:16px">Thank you for reaching out to JJ Property Partner. We have received your enquiry regarding <strong>' . htmlspecialchars($display_goal, ENT_QUOTES, 'UTF-8') . '</strong>.</p>
<p style="font-size:16px">Alex will review your details and be in touch shortly to schedule a private strategy consultation.</p>
<p style="font-size:16px">If you have any urgent questions, feel free to reply to this email or reach us on WhatsApp.</p>
<hr style="border:0;border-top:1px solid #eee;margin:20px 0">
<p style="font-size:14px;color:#777">Best regards,<br><strong>JJ Property Partner Team</strong><br>
<a href="mailto:info@jjpropertypartner.com.au" style="color:#d4af37">info@jjpropertypartner.com.au</a><br>+61 481 334 458</p></td></tr>
<tr><td align="center" style="background:#011122;padding:20px;color:#fff;font-size:12px;opacity:.6">&copy; ' . date('Y') . ' JJ Property Partner. All rights reserved.</td></tr>
</table></td></tr></table></body></html>';

// Owner lead-notification email
$owner_html = '<!DOCTYPE html><html><head><meta charset="utf-8"></head><body style="margin:0;padding:0;background:#f4f4f6;font-family:Helvetica,Arial,sans-serif;color:#333">
<table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center"><table style="max-width:600px;width:100%;background:#fff;border:1px solid #e0e0e0;border-radius:8px;overflow:hidden">
<tr><td align="center" style="background:#011122;padding:25px 30px">
<img src="https://www.jjpropertypartner.com.au/logo.png" alt="" width="100" style="display:block;margin:0 auto 10px">
<h2 style="margin:0;color:#fff;font-size:20px">New Lead Notification</h2>
<p style="margin:5px 0 0;color:#d4af37;font-size:12px;text-transform:uppercase;letter-spacing:1px">JJ Property Partner Website</p></td></tr>
<tr><td style="padding:30px;line-height:1.6">
<p style="font-size:15px;margin-top:0">You have received a new contact form submission.</p>
<table width="100%" cellpadding="10" cellspacing="0" style="border-collapse:collapse;background:#f9f9f9;border-radius:6px">
<tr><td style="border-bottom:1px solid #eee;font-weight:bold;font-size:14px;color:#666;width:35%">Name</td><td style="border-bottom:1px solid #eee;font-size:14px">' . htmlspecialchars($name, ENT_QUOTES, 'UTF-8') . '</td></tr>
<tr><td style="border-bottom:1px solid #eee;font-weight:bold;font-size:14px;color:#666">Email</td><td style="border-bottom:1px solid #eee;font-size:14px"><a href="mailto:' . htmlspecialchars($email, ENT_QUOTES, 'UTF-8') . '" style="color:#d4af37">' . htmlspecialchars($email, ENT_QUOTES, 'UTF-8') . '</a></td></tr>
<tr><td style="border-bottom:1px solid #eee;font-weight:bold;font-size:14px;color:#666">Phone</td><td style="border-bottom:1px solid #eee;font-size:14px">' . (empty($phone) ? '<em>Not provided</em>' : htmlspecialchars($phone, ENT_QUOTES, 'UTF-8')) . '</td></tr>
<tr><td style="border-bottom:1px solid #eee;font-weight:bold;font-size:14px;color:#666">Goal</td><td style="border-bottom:1px solid #eee;font-size:14px;font-weight:600">' . htmlspecialchars($display_goal, ENT_QUOTES, 'UTF-8') . '</td></tr>
<tr><td style="font-weight:bold;font-size:14px;color:#666;vertical-align:top">Message</td><td style="font-size:14px;white-space:pre-wrap">' . (empty($message) ? '<em>No message</em>' : htmlspecialchars($message, ENT_QUOTES, 'UTF-8')) . '</td></tr>
</table></td></tr>
<tr><td align="center" style="background:#011122;padding:15px;color:#fff;font-size:11px;opacity:.5">Submitted: ' . date('Y-m-d H:i:s T') . '</td></tr>
</table></td></tr></table></body></html>';

$customer_payload = [
    'sender'      => ['name' => 'JJ Property Partner', 'email' => 'info@jjpropertypartner.com.au'],
    'to'          => [['email' => $email, 'name' => $name]],
    'replyTo'     => ['email' => 'info@jjpropertypartner.com.au', 'name' => 'JJ Property Partner'],
    'subject'     => 'Thank you for contacting JJ Property Partner',
    'htmlContent' => $customer_html,
];

$owner_payload = [
    'sender'      => ['name' => 'JJ Property Partner Lead Portal', 'email' => 'info@jjpropertypartner.com.au'],
    'to'          => [['email' => 'info@jjpropertypartner.com.au', 'name' => 'Alex / Admin']],
    'replyTo'     => ['email' => $email, 'name' => $name],
    'subject'     => 'New Website Lead: ' . $name,
    'htmlContent' => $owner_html,
];

// ── Execute ───────────────────────────────────────────────────────────────────
$sanity_result   = create_sanity_inquiry($name, $email, $phone, $goal, $message);
$customer_result = send_brevo_email($customer_payload);
$owner_result    = send_brevo_email($owner_payload);

$emails_ok = $customer_result['code'] >= 200 && $customer_result['code'] < 300
          && $owner_result['code']   >= 200 && $owner_result['code']   < 300;

$sanity_ok = $sanity_result['code'] >= 200 && $sanity_result['code'] < 300;

if ($emails_ok && $sanity_ok) {
    http_response_code(200);
    echo json_encode(['status' => 'success', 'message' => 'Enquiry received successfully.']);
} elseif ($emails_ok) {
    // Emails sent but Sanity write failed — still a success from the user's perspective
    http_response_code(200);
    echo json_encode(['status' => 'success', 'message' => 'Enquiry received successfully.']);
} else {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Failed to process your enquiry. Please try again or email us directly.']);
}
