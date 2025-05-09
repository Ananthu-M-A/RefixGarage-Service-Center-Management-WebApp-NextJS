import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { Button } from "./ui/button";

interface FinancialData {
  revenue: number;
  expenditure: number;
  date: string;
  transactions: {
    description: string;
    amount: number;
    type: "revenue" | "expenditure";
    createdAt: string;
  }[];
}

const FinancialReportPDF = () => {
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState<FinancialData>({
    revenue: 0,
    expenditure: 0,
    transactions: [],
    date: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/admin/financial-report");
      const data = await response.json();
      setReportData(data);
    };

    fetchData();
  }, []);

  const generatePDF = () => {
    if (loading) return;
    setLoading(true);

    const doc = new jsPDF();

    doc.setProperties({
      title: `Financial Report - ${reportData.date}`,
      author: "Administrator, REFIX GARAGE",
      creator: "REFIX GARAGE",
    });

    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("Monthly Financial Report - REFIX GARAGE", 20, 20);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Period: ${reportData.date}`, 20, 30);
    doc.text("REFIX GARAGE", 20, 38);
    doc.text("1st Floor, Bus Stand Building, Ramanattukara, India", 20, 44);

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Summary", 20, 60);

    const profitLoss = reportData.revenue - reportData.expenditure;
    const summaryData = [
      ["Total Revenue", `Rs ${reportData.revenue.toFixed(2)}`],
      ["Total Expenditure", `Rs ${reportData.expenditure.toFixed(2)}`],
      ["Net Profit/Loss", `Rs ${profitLoss.toFixed(2)}`],
    ];

    autoTable(doc, {
      startY: 65,
      head: [["Description", "Amount"]],
      body: summaryData,
      theme: "striped",
      headStyles: { fillColor: [66, 66, 66], textColor: [255, 255, 255] },
      margin: { left: 20, right: 20 },
    });

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    interface CustomJSPDF extends jsPDF {
      lastAutoTable: { finalY: number };
    }

    const finalY = (doc as CustomJSPDF).lastAutoTable.finalY + 10;
    doc.text("Transaction Details", 20, finalY);

    const transactionData = reportData.transactions.map((t) => [
      t.description,
      t.type === "revenue" ? t.amount : "-",
      t.type === "expenditure" ? t.amount : "-",
      t.createdAt.split("T")[0],
    ]);

    autoTable(doc, {
      startY: finalY + 5,
      head: [["Description", "Revenue", "Expenditure", "Date"]],
      body: transactionData,
      theme: "striped",
      headStyles: { fillColor: [66, 66, 66], textColor: [255, 255, 255] },
      margin: { left: 20, right: 20 },
    });

    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(
        `Page ${i} of ${pageCount} | Generated on ${new Date().toLocaleDateString()}`,
        20,
        doc.internal.pageSize.height - 10
      );
    }

    doc.save(`Financial_Report_${reportData.date.replace(" ", "_")}.pdf`);
    setLoading(false);
  };

  return (
    <Button
      onClick={generatePDF}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 hover:cursor-pointer"
      disabled={loading}
    >
      {loading ? "Processing..." : "Generate Monthly Financial Report"}
    </Button>
  );
};

export default FinancialReportPDF;
