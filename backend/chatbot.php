<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");

// Get the incoming message from the frontend
$input_message = $_POST['message'] ?? '';

$faq = [
    "What is the booking process?" => "To book a tour, simply select a destination, choose your travel dates, and proceed to checkout.",
    "How can I pay for the tours?" => "We accept credit cards, PayPal, and other online payment methods.",
    "What is included in the tour package?" => "Each package includes transportation, accommodation, guided tours, and meals. Specific inclusions vary by package.",
    "Can I customize my tour?" => "Yes! You can customize your tour based on preferences. Contact us to get started with customization.",
    "What if I need to cancel my booking?" => "You are allowed to cancel your booking, however, according to our refund policy, we are not going to refund any of your order money. So, please make sure you have read our terms and conditions before booking or canceling",
    "Are there group discounts available?" => "Yes, we offer group discounts. Contact us for more details based on group size and destination.",
    "What should I pack for the tour?" => "Packing depends on the destination, but typically we recommend comfortable clothes, a camera, and travel essentials like sunscreen and a hat.",
    "Can I book a tour as a gift?" => "Yes! You can purchase a tour as a gift by selecting the 'Gift Option' during the booking process."
];

// Check if the input message matches any FAQ
$response_message = "Sorry, I didn't quite understand your question. Can you ask something else?";
foreach ($faq as $question => $answer) {
    if (stripos($input_message, $question) !== false) {
        $response_message = $answer;
        break;
    }
}

// If no match was found, respond with a generic greeting or instruction
if ($response_message === "Sorry, I didn't quite understand your question. Can you ask something else?") {
    $response_message = "Hello! How can I help you with your tour plans today?";
}

// Return the response as JSON
echo json_encode(['response' => $response_message]);
