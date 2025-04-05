import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ItemDetail } from "./ItemDetail";

type Item = {
  iNo: string;
  iName: string;
  iCategory: string;
  iCost: number;
  iCount: number;
};

const mockItems: Item[] = [
  {
    iNo: "II000001",
    iName: "Digital Microphone",
    iCategory: "Spare Parts",
    iCost: 150.0,
    iCount: 100,
  },
];

function Inventory() {
  return (
    <>
      <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-700">
      <h2 className="text-2xl font-bold mb-4">Inventory</h2>
        <Table>
          <TableCaption>
            {mockItems.length > 0
              ? "A list of your inventory items."
              : "No items available at the moment."}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">Item No</TableHead>
              <TableHead>Item</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Cost</TableHead>
              <TableHead className="text-right">Count</TableHead>
              <TableHead className="text-right">Edit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockItems.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{item.iNo}</TableCell>
                <TableCell>{item.iName}</TableCell>
                <TableCell>{item.iCategory}</TableCell>
                <TableCell>₹{item.iCost.toFixed(2)}</TableCell>
                <TableCell className="text-right">{item.iCount}</TableCell>
                <TableCell className="text-right">
                  <ItemDetail
                    item={{
                      iNo: "II000001",
                      iName: "Digital Microphone",
                      iCategory: "Spare Parts",
                      iCost: 150.0,
                      iCount: 100,
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export default Inventory;
