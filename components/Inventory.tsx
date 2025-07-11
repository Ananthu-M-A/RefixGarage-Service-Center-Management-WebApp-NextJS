import React, { useEffect, useState } from "react";
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
import { showErrorToast } from "@/lib/toast";
import { Input } from "./ui/input";
import Loading from "@/app/loading";
import { Button } from "./ui/button";
import { paginateTable } from "@/lib/paginateTable";

export type Item = {
  _id: string;
  name: string;
  category: string;
  cost: number;
  count: number;
  description: string;
};

function Inventory() {
  const [items, setItems] = useState<Item[]>([]);
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const response = await fetch("/api/reception/inventory", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        showErrorToast("Failed to fetch inventory");
        throw new Error("Failed to fetch inventory");
      }
      const data = await response.json();
      setItems(data);
      setFilteredItems(data);
    } catch (error) {
      console.error("Error fetching inventory:", error);
      setError("Failed to fetch inventory. Please try again later.");
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase();
    const filtered = items.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm) ||
        item.category.toLowerCase().includes(searchTerm)
    );
    setFilteredItems(filtered);
    setCurrentPage(1);
  };

  const { indexOfFirstItem, currentItems, totalPages } = paginateTable(
    filteredItems,
    currentPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (!items.length) {
    return <Loading />;
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex flex-col items-center p-4 md:p-6">
      <div className="w-full max-w-6xl bg-gray-800 p-4 md:p-6 rounded-lg shadow-md mb-20">
        <h2 className="text-2xl font-bold mb-4 text-center">Inventory</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="flex flex-col md:flex-row items-center justify-between mb-4 space-y-4 md:space-y-0">
          <Input
            placeholder="Search items..."
            name="search"
            onChange={handleSearchChange}
            className="w-full bg-gray-900 text-white"
          />
        </div>
        <div className="overflow-x-auto">
          <Table className="w-full">
            <TableCaption>
              {currentItems.length === 0 && "No items found."}
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[120px] text-gray-400">
                  Item No
                </TableHead>
                <TableHead className="text-gray-400">Item</TableHead>
                <TableHead className="text-gray-400">Category</TableHead>
                <TableHead className="text-gray-400">Cost</TableHead>
                <TableHead className="text-right text-gray-400">
                  Count
                </TableHead>
                <TableHead className="text-right text-gray-400">Edit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentItems.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>₹{item.cost}</TableCell>
                  <TableCell className="text-right">{item.count}</TableCell>
                  <TableCell className="text-right">
                    <ItemDetail
                      item={{
                        slNo: indexOfFirstItem + index + 1,
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
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 rounded hover:cursor-pointer ${
                currentPage === page
                  ? "bg-gray-700 text-white"
                  : "bg-gray-900 text-white"
              }`}
            >
              {page}
            </Button>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Inventory;
