<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");

$eData = file_get_contents('php://input');
include 'dbconnect.php';
$db = new dbconnect;

$conn = $db->connect();

$data = json_decode($eData);
$input_message = $data->message;

$destinationSql = "Select destination.*, location.* From destination Join location on destination.location = location.location_id";
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
    "Do I need a passport for the tour destination?" => "Yes, you definitely need to take your passport with you.",
    "Is travel insurance included?" => "Travel insurance is included by default. You do not need to worry about that.",
    "Are there any age restrictions for tours?" => "Age restrictions may apply depending on the destination and tour type. Please check the specific tour details for age requirements.",
    "Do you offer tours for solo travelers?" => "Yes, we offer tours for solo travelers. Many of our group tours are suitable for solo adventurers.",
    "Can I bring my pet on the tour?" => "Pets are generally not allowed on most tours. However, you can call them by choosing the add-on when booking."
];

$faq_keywords = [
    'pay' => 'How can I pay for the tours?',
    'customize' => 'Can I customize my tour?',
    'package' => 'What is included in the tour package?',
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
    'pet' => 'Can I bring my pet on the tour?',
    'booking' => 'What is the booking process?'
];


// Function to check keywords in the input message and provide recommendations
function checkKeywords($input_message, $faq_keywords, $faq, $destination)
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

    // Convert the input message to lowercase
    $input_message = strtolower($input_message);

    // Check each keyword to see if it exists in the input message
    foreach ($faq_keywords as $keyword => $question) {
        if (strpos($input_message, $keyword) !== false) {
            // If a keyword is found, return the corresponding FAQ answer
            return json_encode([
                'message' =>  $faq[$question]
            ]);
        }
    }

    // If the user asks for recommendations, select a random destination
    if (strpos($input_message, 'recommend') !== false || strpos($input_message, 'another') !== false || strpos($input_message, 'suggest') !== false) {
        $randomDestination = $destination[array_rand($destination)];
        $city = $randomDestination['city'];
        $country = $randomDestination['country'];
        $description = $randomDestination['description'];
        $destination_img = $randomDestination['destination_image'];
        $destination_id = $randomDestination['destination_id'];

        // Return the recommendation with image and id for the frontend
        return json_encode([
            'message' => "We recommend visiting $city, $country, $description.",
            'destination_image' => $destination_img,
            'destination_id' => $destination_id,
            'destination_link' => "http://localhost:5173/destination/{$destination_id}"
        ]);
    }

    if (strpos($input_message, 'thanks')!==false) {
        return json_encode([
            'message' =>  "You're Welcome. Feel Free to ask me anything you want!"
        ]);
    }

    // Default response if no match is found
    return json_encode(['message' => $response_message]);
}

sleep(1);

// Get the response based on the input message
$response_message = checkKeywords($input_message, $faq_keywords, $faq, $destination);

// Return the response as JSON
echo $response_message;
