<?php
/**
 * JJ Property Partner - Brevo Email Dispatcher Proxy
 * 
 * This PHP script acts as a server-side proxy to securely call the Brevo API
 * without exposing the API key to the client browser.
 */

// Enable CORS for frontend requests
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

// Handle preflight OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Method not allowed"]);
    exit;
}

// Get the raw POST data
$input = file_get_contents("php://input");
$data = json_decode($input, true);

// Extract form data
$name = isset($data['name']) ? trim($data['name']) : '';
$email = isset($data['email']) ? trim($data['email']) : '';
$phone = isset($data['phone']) ? trim($data['phone']) : '';
$goal = isset($data['goal']) ? trim($data['goal']) : '';
$message = isset($data['message']) ? trim($data['message']) : '';

// Map purchasing goals to human-readable names
$goalMap = [
    'owner-occupier' => 'Owner Occupier / First Home',
    'investment' => 'Investment Property',
    'smsf' => 'SMSF Acquisition'
];
$displayGoal = isset($goalMap[$goal]) ? $goalMap[$goal] : ($goal ?: 'Not specified');

// Simple validation
if (empty($name) || empty($email)) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Name and email are required"]);
    exit;
}

// Configuration
// IMPORTANT: Replace this placeholder with your actual Brevo API Key (SMTP API Key)
$brevo_api_key = 'YOUR_BREVO_API_KEY'; 
$owner_email = 'info@jjpropertypartner.com.au';

if ($brevo_api_key === 'YOUR_BREVO_API_KEY') {
    // Return success to the client but log a warning (or return a message so the user knows they need to configure it)
    http_response_code(200);
    echo json_encode([
        "status" => "warning", 
        "message" => "Form received, but Brevo API Key is not configured yet. Please configure VITE_BREVO_API_KEY or edit public/send-email.php on your server."
    ]);
    exit;
}

// 1. Prepare Customer Thank You Email
$customer_subject = "Thank you for contacting JJ Property Partner";
$customer_html = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>Thank You</title>
</head>
<body style='margin:0; padding:0; background-color:#f9f9f9; font-family:\"Helvetica Neue\", Helvetica, Arial, sans-serif; color:#333333;'>
    <table width='100%' cellpadding='0' cellspacing='0' border='0' style='background-color:#f9f9f9; padding:20px 0;'>
        <tr>
            <td align='center'>
                <table width='100%' max-width='600' style='max-width:600px; background-color:#ffffff; border:1px solid #e0e0e0; border-radius:8px; overflow:hidden; border-collapse:collapse;'>
                    <!-- Header -->
                    <tr>
                        <td align='center' style='background-color:#011122; padding:30px 20px;'>
                            <h1 style='margin:0; color:#d4af37; font-size:24px; text-transform:uppercase; letter-spacing:3px; font-weight:700;'>JJ Property Partner</h1>
                        </td>
                    </tr>
                    <!-- Body Content -->
                    <tr>
                        <td style='padding:40px 30px; line-height:1.6;'>
                            <p style='font-size:16px; margin-top:0;'>Dear " . htmlspecialchars($name) . ",</p>
                            <p style='font-size:16px;'>Thank you for reaching out to JJ Property Partner. We have received your inquiry regarding your interest in <strong>" . htmlspecialchars($displayGoal) . "</strong>.</p>
                            <p style='font-size:16px;'>Alex will review your details and contact you shortly to schedule a private, confidential strategy consultation to discuss how we can help you achieve your property targets.</p>
                            <p style='font-size:16px;'>If you have any urgent questions, feel free to reply directly to this email or reach us on WhatsApp.</p>
                            <br>
                            <hr style='border:0; border-top:1px solid #eeeeee; margin:20px 0;'>
                            <p style='font-size:14px; color:#777777; margin-bottom:0;'>
                                Best regards,<br>
                                <strong>JJ Property Partner Team</strong><br>
                                Email: <a href='mailto:info@jjpropertypartner.com.au' style='color:#d4af37; text-decoration:none; font-weight:bold;'>info@jjpropertypartner.com.au</a><br>
                                Phone/WhatsApp: +61 481 334 458
                            </p>
                        </td>
                    </tr>
                    <!-- Footer -->
                    <tr>
                        <td align='center' style='background-color:#011122; padding:20px; color:#ffffff; font-size:12px;'>
                            <p style='margin:0; opacity:0.6;'>&copy; " . date('Y') . " JJ Property Partner. All rights reserved.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
";

$customer_payload = [
    "sender" => [
        "name" => "JJ Property Partner",
        "email" => "info@jjpropertypartner.com.au"
    ],
    "to" => [
        [
            "email" => $email,
            "name" => $name
        ]
    ],
    "replyTo" => [
        "email" => "info@jjpropertypartner.com.au",
        "name" => "JJ Property Partner"
    ],
    "subject" => $customer_subject,
    "htmlContent" => $customer_html
];

// 2. Prepare Owner Lead Notification Email
$owner_subject = "New Website Lead: " . $name;
$owner_html = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>New Lead Notification</title>
</head>
<body style='margin:0; padding:0; background-color:#f4f4f6; font-family:\"Helvetica Neue\", Helvetica, Arial, sans-serif; color:#333333;'>
    <table width='100%' cellpadding='0' cellspacing='0' border='0' style='background-color:#f4f4f6; padding:20px 0;'>
        <tr>
            <td align='center'>
                <table width='100%' max-width='600' style='max-width:600px; background-color:#ffffff; border:1px solid #e0e0e0; border-radius:8px; overflow:hidden; border-collapse:collapse;'>
                    <!-- Header -->
                    <tr>
                        <td style='background-color:#011122; padding:25px 30px;'>
                            <h2 style='margin:0; color:#ffffff; font-size:20px; font-weight:bold;'>New Lead Notification</h2>
                            <p style='margin:5px 0 0 0; color:#d4af37; font-size:12px; text-transform:uppercase; letter-spacing:1px;'>JJ Property Partner Website</p>
                        </td>
                    </tr>
                    <!-- Body Content -->
                    <tr>
                        <td style='padding:30px; line-height:1.6;'>
                            <p style='font-size:15px; margin-top:0;'>You have received a new contact form submission.</p>
                            
                            <table width='100%' cellpadding='10' cellspacing='0' style='border-collapse:collapse; margin-top:15px; background-color:#f9f9f9; border-radius:6px;'>
                                <tr>
                                    <td width='35%' style='border-bottom:1px solid #eeeeee; font-weight:bold; font-size:14px; color:#666666;'>Name</td>
                                    <td style='border-bottom:1px solid #eeeeee; font-size:14px; color:#111111;'>" . htmlspecialchars($name) . "</td>
                                </tr>
                                <tr>
                                    <td style='border-bottom:1px solid #eeeeee; font-weight:bold; font-size:14px; color:#666666;'>Email</td>
                                    <td style='border-bottom:1px solid #eeeeee; font-size:14px;'><a href='mailto:" . htmlspecialchars($email) . "' style='color:#d4af37; text-decoration:none;'>" . htmlspecialchars($email) . "</a></td>
                                </tr>
                                <tr>
                                    <td style='border-bottom:1px solid #eeeeee; font-weight:bold; font-size:14px; color:#666666;'>Phone</td>
                                    <td style='border-bottom:1px solid #eeeeee; font-size:14px; color:#111111;'>" . (empty($phone) ? '<em>Not provided</em>' : htmlspecialchars($phone)) . "</td>
                                </tr>
                                <tr>
                                    <td style='border-bottom:1px solid #eeeeee; font-weight:bold; font-size:14px; color:#666666;'>Purchasing Goal</td>
                                    <td style='border-bottom:1px solid #eeeeee; font-size:14px; color:#111111; font-weight:600;'>" . htmlspecialchars($displayGoal) . "</td>
                                </tr>
                                <tr>
                                    <td style='font-weight:bold; font-size:14px; color:#666666; vertical-align:top;'>Message</td>
                                    <td style='font-size:14px; color:#111111; white-space:pre-wrap;'>" . (empty($message) ? '<em>No message left</em>' : htmlspecialchars($message)) . "</td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <!-- Footer -->
                    <tr>
                        <td align='center' style='background-color:#011122; padding:15px; color:#ffffff; font-size:11px;'>
                            <p style='margin:0; opacity:0.5;'>Submitted on: " . date('Y-m-d H:i:s T') . "</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
";

$owner_payload = [
    "sender" => [
        "name" => "JJ Property Partner Lead Portal",
        "email" => "info@jjpropertypartner.com.au"
    ],
    "to" => [
        [
            "email" => $owner_email,
            "name" => "Alex / Admin"
        ]
    ],
    "replyTo" => [
        "email" => $email,
        "name" => $name
    ],
    "subject" => $owner_subject,
    "htmlContent" => $owner_html
];

/**
 * Sends an email payload using Brevo SMTP API.
 */
function send_brevo_api($payload, $api_key) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "https://api.brevo.com/v3/smtp/email");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "api-key: " . $api_key,
        "content-type: application/json",
        "accept: application/json"
    ]);
    
    $response = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    return [
        "code" => $http_code,
        "response" => json_decode($response, true)
    ];
}

// Execute both API calls
$res_customer = send_brevo_api($customer_payload, $brevo_api_key);
$res_owner = send_brevo_api($owner_payload, $brevo_api_key);

// Check results
if ($res_customer['code'] >= 200 && $res_customer['code'] < 300 && $res_owner['code'] >= 200 && $res_owner['code'] < 300) {
    http_response_code(200);
    echo json_encode(["status" => "success", "message" => "Emails sent successfully"]);
} else {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Failed to send emails via Brevo",
        "details" => [
            "customer_response" => $res_customer['response'],
            "customer_code" => $res_customer['code'],
            "owner_response" => $res_owner['response'],
            "owner_code" => $res_owner['code']
        ]
    ]);
}
