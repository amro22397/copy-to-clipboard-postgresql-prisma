"use client";

import React, { useState } from "react";
// import { CiEdit } from "react-icons/ci";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
// import { MdDeleteForever } from "react-icons/md";
import { Edit, Loader2, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  //   DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

const ListEditDelete = ({
  name,
  listId,
  getLists,
  setPageListId,
  pageListIdQuery,
}: {
  name: string;
  // email: string,
  // userId: string,
  listId: string;
  getLists: () => void;
  setPageListId: (value: string) => void;
  pageListIdQuery: string | null | undefined;
}) => {
  const [listDialogOpen, setListDialogOpen] = useState(false);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [editListLoading, setEditListLoading] = useState(false);

  const [deleteListLoading, setDeleteListLoading] = useState(false);

  const [listName, setListName] = useState(name);

  const searchParams = useSearchParams() as any;
  const router = useRouter();

  const params = new URLSearchParams(searchParams);

  const handleEditList = async (e: any) => {
    e.preventDefault();

    setEditListLoading(true);

    if (listName.length > 0) {
      try {
        const res = await axios.put("/api/list", {
          name: listName,
          listId: listId,
        });

        console.log(res);

        if (!res.data.success) {
          toast.error(res.data.message);
          setListDialogOpen(false);
        }

        if (res.data.success) {
          toast.success(res.data.message);
          getLists();
          setListDialogOpen(false);
        }

        setEditListLoading(false);
      } catch (error) {
        console.log(`Client error updating list: ${error}`);

        toast.error(`Client error updating list: ${error}`);

        setEditListLoading(false);
        setListDialogOpen(false);
      }
    } else {
      toast.error("Please enter a list name");
      setEditListLoading(false);
    }
  };

  const handleDeleteList = async (e: any) => {
    e.preventDefault();

    setDeleteListLoading(true);

    try {
      const res = await axios.delete(`/api/list?id=${listId}`);

      if (res.data.success) {
        toast.success(res.data.message);
        getLists();
        setDeleteDialogOpen(false);

        if (pageListIdQuery === listId) {
          localStorage.setItem("pageListId", "All");
          setPageListId("All");
          params.set("pageListId", "All");
          router.push(`?${params.toString()}`);
        }

      } else {
        toast.error(res.data.message);
        setDeleteListLoading(false);
        setDeleteDialogOpen(false);
      }

      // await window.location.reload();

      setDeleteListLoading(false);
    } catch (error) {
      console.log(`Client error deleting list: ${error}`);

      toast.error(`Client error deleting list: ${error}`);

      setDeleteListLoading(false);
      setDeleteDialogOpen(false);
    }
  };

  return (
    <div className="flex shrink-0 flex-row items-center gap-[3px]"
    onClick={(e: any) => { e.stopPropagation() }}
    >
      <Dialog
        open={listDialogOpen}
        onOpenChange={() => setListDialogOpen(!listDialogOpen)}
      >
        <form>
          <DialogTrigger asChild>
            <Edit
              size={22}
              className="cursor-pointer text-green-100 hover:text-green-50"
              onClick={() => {
                setListDialogOpen(true);
                //   editedOn === item.text ? setEditedOn("") : setEditedOn(item.text);
              }}
            />
          </DialogTrigger>

          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit List</DialogTitle>

              {/* <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription> */}
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="list-name-1">List name</Label>
                <Input
                  id="list-name-1"
                  name="list-name-1"
                  defaultValue={listName}
                  className="px-2"
                  onChange={(e: any) => setListName(e.target.value)}
                />
              </div>

              {/* <div className="grid gap-3">
              <Label htmlFor="username-1">Username</Label>
              <Input id="username-1" name="username" defaultValue="@peduarte" />
            </div> */}
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  variant="outline"
                  onClick={() => setListDialogOpen(false)}
                >
                  Cancel
                </Button>
              </DialogClose>

              <Button onClick={handleEditList}>
                {editListLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Save"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>

      <AlertDialog
        open={deleteDialogOpen}
        onOpenChange={() => setDeleteDialogOpen(!deleteDialogOpen)}
      >
        <AlertDialogTrigger>
          <Trash2
            size={22}
            className="text-red-600 cursor-pointer hover:text-red-500"
            onClick={() => setDeleteDialogOpen(true)}
          />
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this list?
            </AlertDialogTitle>
            {/* <AlertDialogDescription>
                          T
                        </AlertDialogDescription> */}
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction onClick={(e) => handleDeleteList(e)}>
              {deleteListLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Continue"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ListEditDelete;
