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
import ItemEntry from "./ItemEntry";

type Item = {
  iNo: string;
  iName: string;
  iCategory: string;
  iCost: number;
  iCount: number;
};

type ItemDetailProps = {
  item: Item;
};

export function ItemDetail({ item }: ItemDetailProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="text-white p-0">
          <CiEdit size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl bg-gray-800">
        <DialogHeader>
          <DialogTitle>Edit Item - {item.iNo}</DialogTitle>
          <DialogDescription>
            Modify item details below and save changes.
          </DialogDescription>
        </DialogHeader>
        <ItemEntry item={item} />
      </DialogContent>
    </Dialog>
  );
}
