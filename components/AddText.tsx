import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { IoCopyOutline } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";

import axios from "axios";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Text } from "@/types/text";
import { Textarea } from "./ui/textarea";

const AddText = ({
  textsDataArray,
  textAreaData,
}: {
  textsDataArray: Text[];
  textAreaData?: Text[];
}) => {
  const [text, setText] = useState("");

  const [textLoading, setTextLoading] = useState(false);

  const [editTextLoading, setEditTextLoading] = useState(false);
  const [deleteTextLoading, setdeleteTextLoading] = useState(false);

  const [editedText, setEditedText] = useState("");

  const [editedOn, setEditedOn] = useState("");

  const handleAddText = async () => {
    setTextLoading(true);

    const res = await axios.post(
      `${textAreaData ? "/api/text-area" : "/api/text"}`,
      {
        text: text,
      }
    );

    console.log(res);

    if (res.data.success) {
      toast.success(res.data.message);
    } else {
      toast.error(res.data.message);
    }

    await window.location.reload();

    setTextLoading(false);
    setText("");
  };

  const handleEditText = async (id: string) => {
    setEditTextLoading(true);

    const res = await axios.put(
      `${textAreaData ? `/api/text-area?id=${id}` : `/api/text?id=${id}`}`,
      {
        text: editedText,
      }
    );

    if (res.data.success) {
      toast.success(res.data.message);
    } else {
      toast.error(res.data.message);
    }

    setEditTextLoading(false);

    await window.location.reload();

    setEditedOn("");
    setEditedText("");
  };

  const handleDeleteItem = async (id: string) => {
    setdeleteTextLoading(true);

    const res = await axios.delete(
      `${textAreaData ? `/api/text-area?id=${id}` : `/api/text?id=${id}`}`
    );

    if (res.data.success) {
      toast.success(res.data.message);
    } else {
      toast.error(res.data.message);
    }

    await window.location.reload();

    setdeleteTextLoading(false);
  };

  const handleCopyText = async (text: string) => {
    navigator.clipboard.writeText(text);

    toast.success("Text is copied to clipboard");
    // sde
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 w-full">
      <div className="flex flex-row items-start justify-center gap-2 w-full">
        {textsDataArray && !textAreaData && (
          <Input
            type="text"
            placeholder="Add your text here..."
            className="text-[20.25px] px-2 py-[21px]"
            value={text}
            onChange={(e: any) => setText(e.target.value)}
          />
        )}

        {textAreaData && (
          <Textarea
            placeholder="Add your text here..."
            className="text-[19.25px] px-2 w-full resize-none"
            value={text}
            onChange={(e: any) => setText(e.target.value)}
          />
        )}

        <Button
          variant="outline"
          className="add-button"
          onClick={handleAddText}
        >
          {textLoading ? <LoaderCircle className="animate-spin" /> : "Add"}
        </Button>
      </div>

      <div className="flex flex-col justify-center px-5 gap-[7px] items-center w-full">
        {textsDataArray.map((item, index) => (
          <div
            className="flex flex-row justify-between items-center w-full gap-4"
            key={item._id}
          >
            {editedOn === item.text ? (
              <div className="flex flex-row items-center gap-2 w-full">
                {textsDataArray && !textAreaData && (
                  <Input
                    type="text"
                    defaultValue={item.text}
                    onChange={(e: any) => setEditedText(e.target.value)}
                    className="text-[20.4px] px-2"
                  />
                )}

                {textAreaData && (
                  <Textarea
                    defaultValue={item.text}
                    onChange={(e: any) => setEditedText(e.target.value)}
                    className="text-[20.4px] px-2"
                  />
                )}

                <Button
                  onClick={() => handleEditText(item._id)}
                  className="cursor-pointer"
                >
                  {editTextLoading ? (
                    <LoaderCircle className="animate-spin" />
                  ) : (
                    "Save"
                  )}
                </Button>
              </div>
            ) : (
              <div className="bg-gray-500/70 text-white hover:bg-gray-500/65 active:scale-95
               w-full px-3 py-[1px] rounded-xs "
               onClick={() => handleCopyText(item.text)}
               >
                <span
                  className="text-[20.4px] tracking-wide
              cursor-default active:scale-95"
                >
                  {item.text}
                </span>
              </div>
            )}

            <div className="flex flex-row items-center gap-3">
              <IoCopyOutline
                size={23}
                className="cursor-pointer"
                onClick={() => handleCopyText(item.text)}
              />

              <CiEdit
                size={25}
                className="cursor-pointer"
                onClick={() => {
                  editedOn === item.text
                    ? setEditedOn("")
                    : setEditedOn(item.text);
                }}
              />

              <AlertDialog>
                <AlertDialogTrigger>
                  <MdDeleteForever
                    size={25}
                    className="text-red-600 cursor-pointer"
                  />
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you sure you want to delete this text?
                    </AlertDialogTitle>
                    {/* <AlertDialogDescription>
                          T
                        </AlertDialogDescription> */}
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleDeleteItem(item._id)}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddText;
