import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { jsPDF } from "jspdf";

const Recipts = () => {
  const [transactions, setTransactions] = useState(null); // Default state as null\
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch transaction data
  const getTransactionData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/backend/getTransactions.php`,
        {
          headers: { Recipt: id },
        }
      );

      if (response.data.status === 1) {
        const transactionData = response.data.data[0];
        console.log(response.data.data[0]);

        if (localStorage.getItem("username") !== "admin") {
          if (localStorage.getItem("user_id") == transactionData.user_id) {
            setTransactions(transactionData);
          } else {
            navigate("/");
          }
        } else {
          setTransactions(transactionData);
        }
      } else {
        console.error("Invalid transaction status.");
        navigate("/");
      }
    } catch (error) {
      console.error(
        "Error fetching transaction data:",
        error.response ? error.response.data : error.message
      );
      navigate("/");
    }
  };

  const downloadReceipt = () => {
    const doc = new jsPDF("p", "mm", "a4");

    // Header with background color and logo
    doc.setFillColor(0, 0, 0); // Black color
    doc.rect(0, 0, 210, 35, "F");
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(20); // Larger font size
    doc.setTextColor(255, 255, 255); // White text color
    doc.text("Trailblazers Travel Agency", 105, 14, { align: "center" }); // Centered text
  
    // Smaller subheader: "Payment Receipt"
    doc.setFontSize(14); // Smaller font size
    doc.setTextColor(255, 255, 255); // Black text color
    doc.text("Payment Receipt", 105, 28, { align: "center" });

    // Booking Date at the top right corner
    doc.setFontSize(12);
    doc.setTextColor(255, 255, 255); // White text color
    doc.setFont("Helvetica", "normal");
    doc.text(
      `Date: ${String(transactions.booking_date || "")}`,
      200,
      28,
      { align: "right" }
    );

    // Invoice Details Section
    let yPosition = 50;
    const marginLeft = 20;

    doc.setFontSize(12);
    doc.setFont("Helvetica", "bold");
    doc.setTextColor(0, 0, 0); // Black text color
    doc.text("Invoice To:", marginLeft, yPosition);

    yPosition += 10;
    const customerDetails = [
      { label: "User Name", value: String(transactions.username || "") },
      { label: "Travel Date", value: String(transactions.travel_date || "") },
      { label: "City", value: String(transactions.city || "") },
      { label: "Country", value: String(transactions.country || "") },
      { label: "Region", value: String(transactions.region_name || "") },
    ];

    customerDetails.forEach((detail) => {
      doc.setFont("Helvetica", "bold");
      doc.text(`${detail.label}:`, marginLeft, yPosition);
      doc.setFont("Helvetica", "normal");
      doc.text(detail.value, marginLeft + 50, yPosition); // Moved to the right side
      yPosition += 8;
    });
    doc.line(marginLeft, yPosition, 190, yPosition);

    yPosition += 10;
    
    doc.setFontSize(12);
    doc.setFont("Helvetica", "bold");
    doc.setTextColor(0, 0, 0); // Black text color
    doc.text("Travellers Information", marginLeft, yPosition);
    yPosition += 10;
     
    const travellersDetails = [...new Set(transactions.full_names.split(","))].map((name, index) => ({
      label: (index + 1),
      value: name.trim(),
    }));

    const travellersPassportDetails = [...new Set(transactions.passport_numbers.split(","))].map((name, index) => ({
      value: name.trim(),
    }));

    travellersDetails.forEach((detail, index) => {
      doc.setFont("Helvetica", "bold");
      doc.text(`${detail.label}.`, marginLeft+ 10, yPosition);
      doc.setFont("Helvetica", "normal");
      doc.text(detail.value, marginLeft + 20, yPosition); // Adjusted position
      doc.setFont("Helvetica", "normal");
      doc.text(travellersPassportDetails[index].value, marginLeft + 70, yPosition); // Adjusted position
      yPosition += 8;
    });
    doc.line(marginLeft, yPosition, 190, yPosition);


    yPosition += 25;
    doc.setFont("Helvetica", "bold");
    doc.text("Purchase Information", marginLeft, yPosition);

    yPosition += 10;
    doc.setFont("Helvetica", "bold");
    doc.text("Package Name", marginLeft, yPosition);
    doc.text("Qty", 100, yPosition, { align: "center" });
    doc.text("Unit Price", 120, yPosition, { align: "center" });
    doc.text("Discount", 150, yPosition, { align: "center" });
    doc.text("Amount", 180, yPosition, { align: "right" });

    yPosition += 5;
    doc.setLineWidth(0.5);
    doc.line(marginLeft, yPosition, 190, yPosition);

    const items = [
      {
        description: String(transactions.package_name || ""),
        qty: String(transactions.number_of_people || ""),
        unitPrice: String(transactions.unit_price || ""),
        discount: `${String(transactions.discount || 0)}%`,
        amount: `$${transactions.final_price}`,
      },
    ];

    yPosition += 10;
    items.forEach((item, index) => {
      if (index % 2 === 0) {
        // Alternate row shading
        doc.setFillColor(240, 240, 240); // Light gray
        doc.rect(marginLeft, yPosition - 5, 170, 8, "F");
      }
      doc.setFont("Helvetica", "normal");
      doc.text(item.description, marginLeft, yPosition);
      doc.text(item.qty, 100, yPosition, { align: "center" });
      doc.text(item.unitPrice, 120, yPosition, { align: "center" });
      doc.text(item.discount, 150, yPosition, { align: "center" });
      doc.text(item.amount, 180, yPosition, { align: "right" });
      yPosition += 8;
    });

    // Total Section
    yPosition += 10;
    doc.setFillColor(0, 0, 0); // Black color
    doc.rect(marginLeft, yPosition, 170, 10, "F");

    doc.setFont("Helvetica", "bold");
    doc.setTextColor(255, 255, 255); // White text color
    doc.text("Total", marginLeft + 120, yPosition + 7, { align: "center" });
    doc.text(`$${transactions.total_price}`, 180, yPosition + 7, {
      align: "right",
    });

    // Footer Section
    yPosition += 20;
   

    // Add footer background
    doc.setFillColor(0, 0, 0); // Black
    doc.rect(0, 265, 210, 40, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.setTextColor(255, 255,255);
    doc.text(
      "Thank you for choosing Trailblazers Travel Agency. Have a safe journey!",
      105,
      275,
      { align: "center" }
    );
    doc.text("Contact: info@trailblazers.com | Phone: +123456789", 105, 283, {
      align: "center",
    });

    doc.save("Payment_Receipt.pdf");
  };

  useEffect(() => {
    getTransactionData();
  }, []);

  return (
    <div className="max-w-lg mx-auto p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
        Booking Receipt
      </h1>
      {transactions ? (
        <div className="space-y-2">
          <table className="w-full text-left border-collapse">
            <tbody>
              {[
                { label: "Booking ID", value: id },
                { label: "User Name", value: transactions.username },
                { label: "Package Name", value: transactions.package_name },
                { label: "City", value: transactions.city },
                { label: "Country", value: transactions.country },
                { label: "Region", value: transactions.region_name },
                { label: "Booking Date", value: transactions.booking_date },
                { label: "Travel Date", value: transactions.travel_date },
                {
                  label: "Number of People",
                  value: transactions.number_of_people,
                },
                { label: "Payment Method", value: transactions.payment_name },
                { label: "Add-ons", value: transactions.add_ons },
                { label: "Discount", value: `${transactions.discount}%` },
                {
                  label: "Total Price (tax included)",
                  value: `$${transactions.total_price}`,
                },
              ].map(({ label, value }, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-100" : ""}
                >
                  <td className="border-b border-gray-300 py-2 px-4 font-semibold">
                    {label}:
                  </td>
                  <td className="border-b border-gray-300 py-2 px-4">
                    {value || "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Passport Info */}
          <div>
            <p className="mt-5 font-bold text-2xl text-center">
              Travellers Information
            </p>
            <table className="w-full text-left border-collapse mt-4">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border-b border-gray-300 py-2 px-4 font-semibold">
                    Traveler
                  </th>
                  <th className="border-b border-gray-300 py-2 px-4 font-semibold">
                    Passport Number
                  </th>
                </tr>
              </thead>
              <tbody>
                {[...new Set(transactions.full_names.split(","))].map(
                  (name, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-gray-100" : ""}
                    >
                      <td className="border-b border-gray-300 py-2 px-4">
                        {name.trim()}
                      </td>
                      <td className="border-b border-gray-300 py-2 px-4">
                        {transactions.passport_numbers
                          .split(",")
                          [index]?.trim() || "N/A"}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p>Loading transaction details...</p>
      )}
      <button
        className="mt-6 w-full py-2 bg-neutral-800 text-white font-semibold rounded hover:bg-black transition duration-200"
        onClick={downloadReceipt}
        disabled={!transactions}
      >
        Download PDF Receipt
      </button>
    </div>
  );
};

export default Recipts;
