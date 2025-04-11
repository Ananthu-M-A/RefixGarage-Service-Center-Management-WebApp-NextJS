import React, { useEffect } from "react";
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
  _id: string;
  name: string;
  category: string;
  cost: number;
  count: number;
  description: string;
};

function Inventory() {
  const [items, setItems] = React.useState<Item[]>([]);
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch("/api/reception/inventory", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch inventory");
        }
        const inventory = await response.json();
        console.log(inventory);
        setItems(inventory);
      } catch (error) {
        console.error("Error fetching inventory:", error);
      }
    };

    fetchInventory();
  }, []);

  return (
    <>
      <div className="w-full text-white bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Inventory</h2>
        <Table>
          <TableCaption>
            {items.length > 0
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
            {items.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>₹{item.cost}</TableCell>
                <TableCell className="text-right">{item.count}</TableCell>
                <TableCell className="text-right">
                  <ItemDetail
                    item={{
                      slNo: index + 1,
                      _id: item._id,
                      name: item.name,
                      category: item.category,
                      cost: item.cost,
                      count: item.count,
                      description: "",
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
