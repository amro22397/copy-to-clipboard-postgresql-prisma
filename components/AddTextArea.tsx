import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";

import { Input } from "@/components/ui/input";
import { IoCopyOutline } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
import { Text } from '@/types/text';

const ITEMS_PER_PAGE = 5;

const AddTextArea = ({ textAreaData }: { textAreaData: Text[] }) => {
  const [textArea, setTextArea] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [textAreaLoading, setTextAreaLoading] = useState(false);

  const [editTextAreaLoading, setEditTextAreaLoading] = useState(false);
  const [, setDeleteTextAreaLoading] = useState(false);

    const [editedText, setEditedText] = useState("");
  
    const [editedOn, setEditedOn] = useState("");
  
  const totalPages = Math.max(1, Math.ceil(textAreaData.length / ITEMS_PER_PAGE));
  const pageStart = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedTextAreaData = textAreaData.slice(
    pageStart,
    pageStart + ITEMS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage((page) => Math.min(page, totalPages));
  }, [totalPages]);

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
        <div className="flex flex-col min-[480px]:flex-row items-stretch min-[480px]:items-start justify-center gap-2 w-full">
      <Textarea
        placeholder="Add your text here..."
        className="text-[19.25px] px-2 w-full resize-none"
        value={textArea}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setTextArea(e.target.value)
        }
      />

      <Button
        variant="outline"
        className="add-button w-full min-[480px]:w-auto"
        onClick={handleAddTextArea}
      >
        {textAreaLoading ? <LoaderCircle className="animate-spin" /> : "Add"}
      </Button>
    </div>

    <div className="flex flex-col justify-center sm:px-5 gap-1 items-center w-full">
            {paginatedTextAreaData.map((item) => (
              <div
                className="flex flex-row justify-between items-center w-full min-w-0 gap-3"
                key={item.id}
              >
                {editedOn === item.text ? (
                  <div className="flex flex-col min-[480px]:flex-row items-stretch min-[480px]:items-center gap-2 w-full min-w-0">
                    <Input
                      type="text"
                      defaultValue={item.text}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setEditedText(e.target.value)
                      }
                      className="text-[20.25px] px-2"
                    />

                    <Button
                      onClick={() => handleEditText(item.id)}
                      className="w-full cursor-pointer min-[480px]:w-auto"
                    >
                      {editTextAreaLoading ? (
                        <LoaderCircle className="animate-spin" />
                      ) : (
                        "Save"
                      )}
                    </Button>
                  </div>
                ) : (
                  <span className="min-w-0 flex-1 break-words">{item.text}</span>
                )}

                <div className="flex shrink-0 flex-row items-center gap-2 sm:gap-3">
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

          {textAreaData.length > ITEMS_PER_PAGE && (
            <div className="flex flex-wrap items-center justify-center gap-2 w-full">
              <Button
                type="button"
                variant="outline"
                size="icon"
                aria-label="Previous page"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              >
                <ChevronLeft />
              </Button>

              {Array.from({ length: totalPages }, (_, index) => {
                const pageNumber = index + 1;

                return (
                  <Button
                    key={pageNumber}
                    type="button"
                    variant={currentPage === pageNumber ? "default" : "outline"}
                    size="icon"
                    aria-label={`Go to page ${pageNumber}`}
                    onClick={() => setCurrentPage(pageNumber)}
                  >
                    {pageNumber}
                  </Button>
                );
              })}

              <Button
                type="button"
                variant="outline"
                size="icon"
                aria-label="Next page"
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((page) => Math.min(totalPages, page + 1))
                }
              >
                <ChevronRight />
              </Button>
            </div>
          )}
    </div>
  );
};

export default AddTextArea;
