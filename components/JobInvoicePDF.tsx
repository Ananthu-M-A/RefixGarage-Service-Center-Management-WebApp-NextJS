import { useState } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { Button } from "./ui/button";
import { JobFormData } from "./AddJob";

const JobInvoicePDF = ({ job }: { job: JobFormData }) => {
  const [loading, setLoading] = useState(false);

  const generateInvoice = () => {
    console.log("Generating invoice for job:", job);

    if (loading) return;
    setLoading(true);

    const doc = new jsPDF();

    doc.setProperties({
      title: `Job Invoice - ${job._id}`,
      author: "REFIX GARAGE",
      creator: "REFIX GARAGE",
    });

    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Job Invoice - REFIX GARAGE", 20, 20);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Invoice No: ${job._id}`, 20, 30);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 36);

    doc.text("REFIX GARAGE", 20, 46);
    doc.text("1st Floor, Bus Stand Building, Ramanattukara, India", 20, 52);

    doc.setFont("helvetica", "bold");
    doc.text("Customer Details", 20, 68);
    autoTable(doc, {
      startY: 72,
      head: [["Name", "Mobile Number"]],
      body: [[job.name, job.mobile]],
      theme: "striped",
      margin: { left: 20, right: 20 },
      headStyles: { fillColor: [66, 66, 66], textColor: [255, 255, 255] },
    });

    doc.setFont("helvetica", "bold");
    const detailsY = (doc as any).lastAutoTable.finalY + 10;
    doc.text("Device & Issue Details", 20, detailsY);

    autoTable(doc, {
      startY: detailsY + 5,
      head: [["Device", "Issue", "Payment Received"]],
      body: [[job.brand + " " + job.modelName, job.issue, `Rs ${job.cost}`]],
      theme: "striped",
      margin: { left: 20, right: 20 },
      headStyles: { fillColor: [66, 66, 66], textColor: [255, 255, 255] },
    });

    const remarksY = (doc as any).lastAutoTable.finalY + 10;
    doc.setFont("helvetica", "normal");
    if (job.remarks) {
      doc.text(`Remarks: ${job.remarks}`, 20, remarksY);
    }

    doc.setFontSize(10);
    doc.text(
      `Generated on ${new Date().toLocaleDateString()}`,
      20,
      doc.internal.pageSize.height - 10
    );

    doc.save(`Job_Invoice_${job._id}.pdf`);
    setLoading(false);
  };

  return (
    <Button
      onClick={generateInvoice}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:cursor-pointer"
      disabled={loading}
    >
      {loading ? "Processing..." : "Download Job Entry Invoice"}
    </Button>
  );
};

export default JobInvoicePDF;
