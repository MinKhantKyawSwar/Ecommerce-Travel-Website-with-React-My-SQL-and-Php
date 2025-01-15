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
    "Can I bring my pet on the tour?" => "Pets are generally not allowed on most tours. However, you can call them by choosing the add-on when booking.",
    "What happens if the tour is canceled by the company?" => "If we cancel the tour, you will receive a full refund or an option to reschedule the tour to another date.",
    "Are meals included in the package?" => "Most packages include meals, but specific details about meal inclusions are mentioned in the tour itinerary.",
    "Do you provide airport pickup and drop services?" => "Yes, airport transfers can be included in your package or booked as an add-on during checkout.",
    "Can I get a detailed itinerary before booking?" => "Yes, we provide a detailed itinerary for all tours on our website. You can also request a personalized itinerary.",
    "Is it safe to travel to the destination?" => "Safety is our priority. We only organize tours to destinations that are deemed safe for travelers.",
    "What languages do your guides speak?" => "Our guides are multilingual and typically speak English and the local language of the destination.",
    "Do you offer special accommodations for disabled travelers?" => "Yes, we strive to accommodate all travelers. Please contact us in advance to discuss your specific needs.",
    "Can I join a tour if I am traveling from a different city or country?" => "Yes, travelers from different locations can join our tours. You’ll just need to arrange your transportation to the tour's starting point.",
    "How can I stay updated on upcoming tours and offers?" => "You can subscribe to our newsletter or follow us on social media for updates on tours and exclusive offers.",
    "What if my flight gets delayed or canceled?" => "If your flight is delayed or canceled, contact us immediately. We’ll do our best to adjust your itinerary accordingly.",
    "Are there special discounts for students or seniors?" => "Yes, we offer discounts for students and seniors. Please provide valid ID to avail of the discounts.",
    "Can I extend my stay after the tour?" => "Yes, you can extend your stay after the tour. Contact us to help you arrange accommodations and other services.",
    "Do you offer adventure tours?" => "Yes, we offer a variety of adventure tours, including hiking, rafting, and safaris. Check the Adventure Tours section on our website.",
    "Do you provide child-friendly tours?" => "Yes, we have tours designed specifically for families with children. Look for the Family Tours category.",
    "Can I pay in installments?" => "Yes, we offer installment payment options for selected packages. Contact us for details.",
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
    'booking' => 'What is the booking process?',
    'cancel company' => 'What happens if the tour is canceled by the company?',
    'meals' => 'Are meals included in the package?',
    'airport' => 'Do you provide airport pickup and drop services?',
    'itinerary' => 'Can I get a detailed itinerary before booking?',
    'safe' => 'Is it safe to travel to the destination?',
    'guide languages' => 'What languages do your guides speak?',
    'disabled' => 'Do you offer special accommodations for disabled travelers?',
    'different city' => 'Can I join a tour if I am traveling from a different city or country?',
    'updates' => 'How can I stay updated on upcoming tours and offers?',
    'flight delay' => 'What if my flight gets delayed or canceled?',
    'student discount' => 'Are there special discounts for students or seniors?',
    'extend stay' => 'Can I extend my stay after the tour?',
    'adventure' => 'Do you offer adventure tours?',
    'family' => 'Do you provide child-friendly tours?',
    'installments' => 'Can I pay in installments?',
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
        if (strpos($input_message, needle: $keyword) !== false) {
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
    

    if (strpos($input_message, 'thanks') !== false) {
        return json_encode([
            'message' =>  "You're Welcome. Feel Free to ask me anything you want!"
        ]);
    }

    // Default response if no match is found
    return json_encode(['message' => $response_message]);
}
usleep(400000);
// sleep(1);

// Get the response based on the input message
$response_message = checkKeywords($input_message, $faq_keywords, $faq, $destination);

// Return the response as JSON
echo $response_message;
