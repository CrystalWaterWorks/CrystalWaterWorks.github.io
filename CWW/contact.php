<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $first_name = strip_tags(trim($_POST["first_name"]));
    $last_name = strip_tags(trim($_POST["last_name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $message = trim($_POST["message"]);

    // Check if all required fields are filled out
    if (empty($first_name) || empty($last_name) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "Please fill out all required fields and use a valid email address.";
        exit;
    }

    // Set the recipient email address.
    $recipient = "crystalwaterworks@gmail.com";

    // Set the email subject.
    $subject = "Website Inqury from $first_name $last_name";

    // Build the email content.
    $email_content = "Name: $first_name $last_name\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Message:\n$message\n";

    // Build the email headers.
    $email_headers = "From: $first_name $last_name <$email>";

    // Send the email.
    if (mail($recipient, $subject, $email_content, $email_headers)) {
        http_response_code(200);
        echo "Thank you! Your message has been sent.";
    } else {
        http_response_code(500);
        echo "Oops! Something went wrong and we couldn't send your message.";
    }
} else {
    http_response_code(403);
    echo "There was a problem with your submission, please try again.";
}
?>