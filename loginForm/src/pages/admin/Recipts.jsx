import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { jsPDF } from "jspdf";

const Recipts = () => {
  const [transactions, setTransactions] = useState([]);
  const { id } = useParams();

  const navigate = useNavigate();

  const getTransactionData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/backend/getTransactions.php`,
        {
          headers: {
            Recipt: id,
          },
        }
      );
      if (response.data.status === 1) {
        setTransactions(response.data.data[0]);
      }
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const downloadReceipt = () => {
    const doc = new jsPDF("p", "mm", "a4"); // A4 size (210 x 297 mm)

    // Header design with a highlighted title
    doc.setFillColor(50, 50, 150); // Blue background
    doc.rect(0, 0, 210, 40, "F"); // Full-width rectangle at the top
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(24);
    doc.setTextColor(255, 255, 255); // White text color
    doc.text("Trailblazers Receipt", 105, 25, { align: "center" });

    // Add a subheader or tagline
    doc.setFont("Helvetica", "italic");
    doc.setFontSize(12);
    doc.text("Your journey begins here!", 105, 35, { align: "center" });

    // Reset text color for the rest of the document
    doc.setTextColor(0, 0, 0);

    // Receipt details section
    const details = [
      { label: "Booking ID:", value: String(id) },
      { label: "User Name:", value: String(transactions.username || "") },
      {
        label: "Package Name:",
        value: String(transactions.package_name || ""),
      },
      { label: "Travel Date:", value: String(transactions.travel_date || "") },
      {
        label: "Booking Date:",
        value: String(transactions.booking_date || ""),
      },
      { label: "City:", value: String(transactions.city || "") },
      { label: "Country:", value: String(transactions.country || "") },
      { label: "Region:", value: String(transactions.region || "") },
      {
        label: "Payment Method:",
        value: String(transactions.payment_name || ""),
      },
      {
        label: "Number of People:",
        value: String(transactions.number_of_people || ""),
      },
      { label: "Add-ons:", value: String(transactions.add_on || "") },
      { label: "Discount:", value: `${String(transactions.discount || 0)}%` },
    ];

    // Table layout with a border
    let yPosition = 50; // Start below the header
    const marginLeft = 20;
    const marginRight = 190;
    const rowHeight = 12;

    // Draw table header
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(14);
    doc.setFillColor(230, 230, 230); // Light gray header background
    doc.rect(marginLeft, yPosition, marginRight - marginLeft, rowHeight, "F");
    doc.text("Booking Details", 105, yPosition + 8, { align: "center" });

    yPosition += rowHeight;

    // Draw table rows with alternating colors
    details.forEach((detail, index) => {
      // Alternating row background color for better readability
      if (index % 2 === 0) {
        doc.setFillColor(245, 245, 245); // Light gray
        doc.rect(
          marginLeft,
          yPosition,
          marginRight - marginLeft,
          rowHeight,
          "F"
        );
      }

      // Add label and value
      doc.setFont("Helvetica", "bold");
      doc.text(`${detail.label}`, marginLeft, yPosition + 8);
      doc.setFont("Helvetica", "normal");
      doc.text(`${detail.value}`, 120, yPosition + 8);

      yPosition += rowHeight;
    });

    // Summary section
    yPosition += 15;
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(14);
    doc.setFillColor(230, 230, 230); // Light gray background for summary
    doc.rect(marginLeft, yPosition, marginRight - marginLeft, rowHeight, "F");
    doc.text("Summary", 105, yPosition + 8, { align: "center" });

    yPosition += rowHeight;

    const summary = [
      { label: "Total (tax included):", value: `$${transactions.total_price}` },
    ];

    summary.forEach((item) => {
      doc.setFont("Helvetica", "bold");
      doc.text(`${item.label}`, marginLeft, yPosition + 8);
      doc.setFont("Helvetica", "normal");
      doc.text(`${item.value}`, 160, yPosition + 8, { align: "right" });
      yPosition += rowHeight;
    });

    // Footer design
    yPosition = 280; // Move to the bottom of the A4 page
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(10);

    // Footer background box
    doc.setFillColor(50, 50, 150); // Blue background
    doc.rect(0, yPosition - 10, 210, 30, "F");

    // Footer text
    doc.setTextColor(255, 255, 255); // White text color
    const footerText = "Thank you for traveling with Trailblazers!";
    const contactInfo =
      "Contact us: support@trailblazers.com | +1-234-567-8900";

    doc.text(footerText, 105, yPosition, { align: "center" });
    doc.text(contactInfo, 105, yPosition + 10, { align: "center" });

    // Save the PDF
    doc.save(`Booking_invoice_${String(id)}.pdf`);
  };

  useEffect(() => {
    getTransactionData();
  }, []);
  return (
    <>
      <div className="max-w-lg mx-auto p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Booking Receipt
        </h1>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="font-semibold">Booking ID:</span>
            <span>{id}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">User Name:</span>
            <span>{transactions.username}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Package Name:</span>
            <span>{transactions.package_name}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">City:</span>
            <span>{transactions.city}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Country:</span>
            <span>{transactions.country}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Region:</span>
            <span>{transactions.region}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Booking Date:</span>
            <span>{transactions.booking_date}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Travel Date:</span>
            <span>{transactions.travel_date}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Number of People:</span>
            <span>{transactions.number_of_people}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Payment Method:</span>
            <span>{transactions.payment_name}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold">Add-ons:</span>
            <span>{transactions.add_on}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Discount:</span>
            <span>{transactions.discount}%</span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold">Total Price(tax included):</span>
            <span>${transactions.total_price}</span>
          </div>
        </div>
        <button
          className="mt-6 w-full py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition duration-200"
          onClick={downloadReceipt}
        >
          Download PDF Receipt
        </button>
      </div>
    </>
  );
};

export default Recipts;
