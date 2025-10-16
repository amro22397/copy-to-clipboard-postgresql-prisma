import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";

import { Input } from "@/components/ui/input";
import { IoCopyOutline } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";
import { CiEdit } from "react-icons/ci";







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
import { Text } from '@/types/text';

const AddTextArea = ({ textAreaData }: { textAreaData: Text[] }) => {
  const [textArea, setTextArea] = useState("");
  const [textAreaLoading, setTextAreaLoading] = useState(false);

  const [editTextAreaLoading, setEditTextAreaLoading] = useState(false);
  const [deleteTextAreaLoading, setDeleteTextAreaLoading] = useState(false);

    const [editedText, setEditedText] = useState("");
  
    const [editedOn, setEditedOn] = useState("");
  

  const handleAddTextArea = async () => {
    setTextAreaLoading(true);

    const res = await axios.post("/api/text-area", {
      text: textArea,
    });

    console.log(res);
    setTextArea("");

    if (res.data.success) {
      toast.success(res.data.message);
    } else {
      toast.error(res.data.message);
    }

    await window.location.reload();

    setTextAreaLoading(false);
  };


  const handleEditText = async (id: string) => {
    setEditTextAreaLoading(true);

    const res = await axios.put(`/api/text-area?id=${id}`, {
      text: editedText,
    });

    if (res.data.success) {
      toast.success(res.data.message);
    } else {
      toast.error(res.data.message);
    }

    setEditTextAreaLoading(false);

    await window.location.reload();

    setEditedOn("");
    setEditedText("");
  };

  const handleDeleteItem = async (id: string) => {

    setDeleteTextAreaLoading(true);

    const res = await axios.delete(`/api/text-area?id=${id}`);

    if (res.data.success) {

        toast.success(res.data.message)
    } else {
        toast.error(res.data.message)
    }

    await window.location.reload();

    setDeleteTextAreaLoading(false);
  };


  const handleCopyText = async (text: string) => {
    
    navigator.clipboard.writeText(text);

    toast.success('Text is copied to clipboard');

  }


  return (
    <div className="flex flex-col items-center justify-center gap-6 w-full">
        <div className="flex flex-row items-start justify-center gap-2 w-full">
      <Textarea
        placeholder="Add your text here..."
        className="text-[19.25px] px-2 w-full resize-none"
        value={textArea}
        onChange={(e: any) => setTextArea(e.target.value)}
      />

      <Button
        variant="outline"
        className="add-button"
        onClick={handleAddTextArea}
      >
        {textAreaLoading ? <LoaderCircle className="animate-spin" /> : "Add"}
      </Button>
    </div>

    <div className="flex flex-col justify-center px-5 gap-1 items-center w-full">
            {textAreaData.map((item, index) => (
              <div className="flex flex-row justify-between items-center w-full gap-9">
                {editedOn === item.text ? (
                  <div className="flex flex-row items-center gap-2 w-full">
                    <Input
                      type="text"
                      defaultValue={item.text}
                      onChange={(e: any) => setEditedText(e.target.value)}
                      className="text-[20.25px] px-2"
                    />

                    <Button
                      onClick={() => handleEditText(item.id)}
                      className="cursor-pointer"
                    >
                      {editTextAreaLoading ? (
                        <LoaderCircle className="animate-spin" />
                      ) : (
                        "Save"
                      )}
                    </Button>
                  </div>
                ) : (
                  <span className="">{item.text}</span>
                )}

                <div className="flex flex-row items-center gap-3">
                  <IoCopyOutline size={23}
                  className="cursor-pointer"
                  onClick={() => handleCopyText(item.text)} />

                  <CiEdit
                    size={25}
                    className="cursor-pointer"
                    onClick={() => setEditedOn(item.text)}
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
                        onClick={() => handleDeleteItem(item.id)}
                        >Continue</AlertDialogAction>
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

export default AddTextArea;
