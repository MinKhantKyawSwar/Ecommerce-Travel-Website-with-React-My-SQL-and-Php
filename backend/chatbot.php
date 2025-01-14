<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");

$eData = file_get_contents('php://input');
$db = new dbconnect;
$conn = $db->connect();

$data = json_decode($eData);
$input_message = $data->message;

$destinationSql = "Select * From Destination";
$stmt = $conn->prepare($destinationSql);
$stmt->execute();
$destination = $stmt->fetchAll(PDO::FETCH_ASSOC);

$faq = [
    "What is the booking process?" => "To book a tour, simply select a destination, choose your travel dates, and proceed to checkout.",
    "How can I pay for the tours?" => "We accept credit cards, PayPal, and other online payment methods.",
    "What is included in the tour package?" => "Each package includes transportation, accommodation, guided tours, and meals. Specific inclusions vary by package.",
    "Can I customize my tour?" => "Yes! You can customize your tour based on preferences. Contact us to get started with customization.",
    "What if I need to cancel my booking?" => "You are allowed to cancel your booking, however, according to our refund policy, we are not going to refund any of your order money. So, please make sure you have read our terms and conditions before booking or canceling.",
    "Are there group discounts available?" => "Yes, we offer group discounts. Contact us for more details based on group size and destination.",
    "What should I pack for the tour?" => "Packing depends on the destination, but typically we recommend comfortable clothes, a camera, and travel essentials like sunscreen and a hat.",
    "Can I book a tour as a gift?" => "Yes! You can purchase a tour as a gift by adding the recipient's full name, passport information, and other relevant details during checkout.",
    "Are flights included in the tour package?" => "Flights are not typically included in most tour packages unless otherwise specified. You can add flights separately during booking.",
    "Do I need a visa for the tour destination?" => "Visa requirements vary depending on your nationality and the destination. It's best to check with the embassy or consulate before your trip.",
    "How long does the tour last?" => "Tour durations vary, but most tours last between 3 to 14 days, depending on the package you choose.",
    "Can I make changes to my booking after confirmation?" => "Yes, you can make changes to your booking, but please note that changes may incur additional fees depending on the timing and nature of the changes.",
    "Do I need a passport for the tour destination?" => "Yes, you definately need to take passport along with you.",
    "Is travel insurance included?" => "Travel insurance is not included by default but can be added as an option during the booking process.",
    "Are there any age restrictions for tours?" => "Age restrictions may apply depending on the destination and tour type. Please check the specific tour details for age requirements.",
    "Do you offer tours for solo travelers?" => "Yes, we offer tours for solo travelers. Many of our group tours are suitable for solo adventurers.",
    "Can I bring my pet on the tour?" => "Pets are generally not allowed on most tours. However, you can call them by choosing add on when booking."
];

$faq_keywords = [
    'booking' => 'What is the booking process?',
    'pay' => 'How can I pay for the tours?',
    'package' => 'What is included in the tour package?',
    'customize' => 'Can I customize my tour?',
    'cancel' => 'What if I need to cancel my booking?',
    'discount' => 'Are there group discounts available?',
    'pack' => 'What should I pack for the tour?',
    'gift' => 'Can I book a tour as a gift?',
    'flights' => 'Are flights included in the tour package?',
    'visa' => 'Do I need a visa for the tour destination?',
    'passport' => 'Do I need a passport for the tour destination?',
    'duration' => 'How long does the tour last?',
    'changes' => 'Can I make changes to my booking after confirmation?',
    'insurance' => 'Is travel insurance included?',
    'age' => 'Are there any age restrictions for tours?',
    'solo' => 'Do you offer tours for solo travelers?',
    'single' => 'Do you offer tours for solo travelers?',
    'pet' => 'Can I bring my pet on the tour?'
];

// Function to check keywords in the input message
function checkKeywords($input_message, $faq_keywords, $faq)
{
    // Define an array of greetings
    $greetings = [
        "Hello! I am Trailblazer. How can I assist you today?",
        "Hi there! Welcome! How can I help you on your journey today?",
        "Greetings! I’m Trailblazer, ready to assist you. What would you like to know?",
        "Hey! Trailblazer here! How can I make your travel plans easier today?",
        "Welcome aboard! I’m Trailblazer. How can I help you with your tour today?",
        "Hello, traveler! I’m here to assist. What do you need help with today?"
    ];

    // Randomly select a greeting from the array
    $response_message = $greetings[array_rand($greetings)];

    // Convert the input message to lowercase and check for keywords
    $input_message = strtolower($input_message);

    // Check each keyword to see if it exists in the input message
    foreach ($faq_keywords as $keyword => $question) {
        if (strpos($input_message, $keyword) !== false) {
            // If a keyword is found, return the corresponding FAQ answer
            return $faq[$question];
        }
    }

    return $response_message; // Default response if no match is found
}

// Get the response based on the input message
$response_message = checkKeywords($input_message, $faq_keywords, $faq);


// Return the response as JSON
echo json_encode(['response' => $response_message]);
