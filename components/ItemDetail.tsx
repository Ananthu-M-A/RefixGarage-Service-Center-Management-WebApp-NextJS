"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CiEdit } from "react-icons/ci";
import AddStock from "./AddStock";

type Item = {
  _id: string;
  slNo: number;
  name: string;
  category: string;
  cost: number;
  count: number;
  description: string;
};

type ItemDetailProps = {
  item: Item;
};

export function ItemDetail({ item }: ItemDetailProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-min bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:cursor-pointer">
          <CiEdit size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl bg-gray-800 text-white">
        <DialogHeader>
          <DialogTitle>Edit Item Detail - {item.slNo}</DialogTitle>
          <DialogDescription>
            Modify item details below and save changes.
          </DialogDescription>
        </DialogHeader>
        <AddStock item={item} />
      </DialogContent>
    </Dialog>
  );
}
