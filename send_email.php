<?php
// Include the necessary PEAR packages
require_once "Mail.php";
require_once "Mail/mime.php";

// Set the content type to JSON
header('Content-Type: application/json');

// Check if the request method is POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize the input data to prevent XSS attacks
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $subject = htmlspecialchars($_POST['subject']);
    $message = htmlspecialchars($_POST['message']);
    
    // Set the recipient email address
    $to = "your-email@gmail.com"; // Replace with your Gmail address

    // SMTP server configuration
    $host = "ssl://smtp.yourserver.com"; // Replace with your SMTP server
    $port = "465"; // Adjust if necessary
    $username = "your-smtp-username"; // Replace with your SMTP username
    $password = "your-smtp-password"; // Replace with your SMTP password

    // Prepare email headers
    $headers = array(
        'From' => $email, // Sender's email address
        'To' => $to, // Recipient's email address
        'Subject' => $subject, // Email subject
        'Reply-To' => $email, // Reply-to email address
        'Content-type' => 'text/html; charset=iso-8859-1' // Email content type
    );

    // Build the HTML email body
    $body = "<html><body>";
    $body .= "<h2>Contact Form Submission</h2>";
    $body .= "<p><strong>Name:</strong> {$name}</p>";
    $body .= "<p><strong>Email:</strong> {$email}</p>";
    $body .= "<p><strong>Subject:</strong> {$subject}</p>";
    $body .= "<p><strong>Message:</strong><br>{$message}</p>";
    $body .= "</body></html>";

    // Use Mail_mime to handle the HTML email content
    $mime = new Mail_mime();
    $mime->setHTMLBody($body);
    $body = $mime->get();
    $headers = $mime->headers($headers);

    // Create the mail object using the Mail::factory method
    $smtp = Mail::factory('smtp', array(
            'host' => $host, // SMTP server
            'port' => $port, // SMTP port
            'auth' => true, // Enable SMTP authentication
            'username' => $username, // SMTP username
            'password' => $password // SMTP password
        ));

    // Send the email
    $mail = $smtp->send($to, $headers, $body);

    // Check for errors and respond accordingly
    if (PEAR::isError($mail)) {
        // Log the error message
        error_log("Email failed to send to $to with subject $subject. Error: " . $mail->getMessage());
        // Respond with an error message
        echo json_encode(['success' => false, 'error' => 'Email failed to send.']);
    } else {
        // Respond with a success message
        echo json_encode(['success' => true]);
    }
} else {
    // Respond with an error message for invalid request method
    echo json_encode(['success' => false, 'error' => 'Invalid request method.']);
}
?>
