import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { Button } from "./ui/button";

interface JobType {
  jobId: string;
  customerId: {
    name: string;
    mobile: string;
  };
  brand: string;
  modelName: string;
  issue: string;
  cost: number;
  remarks?: string;
  reminder?: string;
  engineer?: string;
  status?: string;
  isDelivered?: string;
  createdAt?: string;
  updatedAt?: string;
  _id?: string;
}

const JobInvoicePDF = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(false);
  const [job, setJob] = useState<JobType | null>(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(`/api/reception/jobs/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch job details");
        }
        const data = await response.json();
        setJob(data);
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };

    fetchJob();
  }, [id]);

  const generateInvoice = () => {
    if (loading || !job) return;
    setLoading(true);

    const doc = new jsPDF();

    doc.setProperties({
      title: `Job Invoice - ${job.jobId}`,
      author: "REFIX GARAGE",
      creator: "REFIX GARAGE",
    });

    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Job Invoice - REFIX GARAGE", 20, 20);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Invoice No: ${job.jobId}`, 20, 30);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 36);

    doc.text("REFIX GARAGE", 20, 46);
    doc.text("1st Floor, Bus Stand Building,", 20, 52);
    doc.text("Ramanattukara, Kerala, India - 673633", 20, 58);
    doc.text("Email: refixgarage@gmail.com | Contact: +91 62388 99623", 20, 64);

    doc.setFont("helvetica", "bold");
    doc.text("Customer Details", 20, 74);
    autoTable(doc, {
      startY: 78,
      head: [["Name", "Mobile Number"]],
      body: [[job.customerId.name, job.customerId.mobile]],
      theme: "striped",
      margin: { left: 20, right: 20 },
      headStyles: { fillColor: [66, 66, 66], textColor: [255, 255, 255] },
    });

    doc.setFont("helvetica", "bold");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const remarksY = (doc as any).lastAutoTable.finalY + 10;
    doc.setFont("helvetica", "normal");
    if (job.remarks) {
      doc.text(`Remarks: ${job.remarks}`, 20, remarksY);
    }

    const instructionsY = remarksY + 10;
    doc.setFont("helvetica", "bold");
    doc.text("Check Service Status:", 20, instructionsY);
    doc.setFont("helvetica", "normal");
    doc.text(
      "You can check your service status anytime at https://refixgarage.com using your Job ID.",
      20,
      instructionsY + 6
    );

    const termsY = instructionsY + 18;
    doc.setFont("helvetica", "bold");
    doc.text("Terms and Conditions:", 20, termsY);
    doc.setFont("helvetica", "normal");
    const terms = [
      "1. Handset will be returned only upon producing the original bill.",
      "2. Accessories (sim cards, memory cards, covers, etc.) left with the device are not our responsibility.",
      "3. Devices must be inspected and collected by the customer after service",
      "4. Devices not collected within 30 days will not be our responsibility.",
      "5. Requests or claims after 30 days will not be accepted.",
      "6. For queries, contact: +91 62388 99623",
    ];
    let termsLineY = termsY + 6;
    terms.forEach((line) => {
      doc.text(line, 20, termsLineY);
      termsLineY += 6;
    });

    doc.setFontSize(10);
    doc.text(
      `Generated on ${new Date().toLocaleDateString()}`,
      20,
      doc.internal.pageSize.height - 10
    );

    doc.save(`Job_Invoice_${job.jobId}.pdf`);
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
