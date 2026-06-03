import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { IoCopyOutline } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { FiSearch } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ChevronLeft, ChevronRight, LoaderCircle } from "lucide-react";

import axios from "axios";

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
import { Text } from "@/types/text";
import { Textarea } from "./ui/textarea";

const DEFAULT_ITEMS_PER_PAGE = 10;

const AddText = ({
  textsDataArray,
  textAreaData,
  getTexts,
  getTextsArea,
  email,
  userId,
  pageListId,
  itemsPerPage = DEFAULT_ITEMS_PER_PAGE,
}: {
  textsDataArray: Text[];
  textAreaData?: Text[];
  getTexts: () => void;
  getTextsArea: () => void;
  email: string | null | undefined;
  userId: string | null | undefined;
  pageListId: string | null | undefined;
  itemsPerPage?: number;
}) => {
  const [text, setText] = useState(
    textAreaData
      ? localStorage.getItem("textArea")
      : localStorage.getItem("text") || "",
  );
  const [label, setLabel] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [textLoading, setTextLoading] = useState(false);

  const [editTextLoading, setEditTextLoading] = useState(false);
  const [, setdeleteTextLoading] = useState(false);

  const [editedText, setEditedText] = useState(
    // textAreaData
    //   ? localStorage.getItem("editedTextArea")
    //   : localStorage.getItem("editedText") || "",
    "",
  );
  const [editedLabel, setEditedLabel] = useState(
    // localStorage.getItem("editedLabel") || "",
    "",
  );

  const [editedOn, setEditedOn] = useState<string | null>(null);
  const normalizedSearch = search.trim().toLowerCase();
  const filteredTexts = normalizedSearch
    ? textsDataArray.filter((item) => {
        const itemText = item.text.toLowerCase();
        const itemLabel = item.label?.toLowerCase() || "";

        return (
          itemText.includes(normalizedSearch) ||
          itemLabel.includes(normalizedSearch)
        );
      })
    : textsDataArray;

  const totalPages = Math.max(
    1,
    Math.ceil(filteredTexts.length / itemsPerPage),
  );
  const pageStart = (currentPage - 1) * itemsPerPage;
  const paginatedTexts = filteredTexts.slice(
    pageStart,
    pageStart + itemsPerPage,
  );

  useEffect(() => {
    setCurrentPage((page) => Math.min(page, totalPages));
  }, [totalPages]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const handleAddText = async () => {
    setTextLoading(true);

    const res = await axios.post(
      `${textAreaData ? "/api/text-area" : "/api/text"}`,
      {
        text: text,
        label: label,
        emailRef: email,
        userId: userId,
        listId: pageListId,
      },
    );

    console.log(res);

    if (res.data.success) {
      toast.success(res.data.message);

      if (textAreaData) {
        localStorage.setItem("textArea", "");
      } else {
        localStorage.setItem("text", "");
      }

      // textAreaData ? localStorage.setItem("textArea", "") : localStorage.setItem("text", "")
    } else {
      toast.error(res.data.message);
    }

    // await window.location.reload();
    if (textAreaData) {
      getTextsArea();
    } else {
      getTexts();
    }

    setTextLoading(false);
    setText("");
    setLabel("");
  };

  const handleEditText = async (id: string) => {
    setEditTextLoading(true);

    const res = await axios.put(
      `${textAreaData ? `/api/text-area?id=${id}` : `/api/text?id=${id}`}`,
      {
        text: editedText,
        label: editedLabel,
      },
    );

    if (res.data.success) {
      toast.success(res.data.message);

      if (textAreaData) {
        localStorage.setItem("editedTextArea", "");
      } else {
        localStorage.setItem("editedText", "");
      }

      localStorage.setItem("editedLabel", "");
    } else {
      toast.error(res.data.message);
    }

    setEditTextLoading(false);

    // await window.location.reload();

    if (textAreaData) {
      getTextsArea();
    } else {
      getTexts();
    }

    setEditedOn("");
    setEditedText("");
    setEditedLabel("");
  };

  const handleDeleteItem = async (id: string) => {
    setdeleteTextLoading(true);

    const res = await axios.delete(
      `${textAreaData ? `/api/text-area?id=${id}` : `/api/text?id=${id}`}`,
    );

    if (res.data.success) {
      toast.success(res.data.message);
    } else {
      toast.error(res.data.message);
    }

    // await window.location.reload();

    if (textAreaData) {
      getTextsArea();
    } else {
      getTexts();
    }

    setdeleteTextLoading(false);
  };

  const handleCopyText = async (text: string) => {
    navigator.clipboard.writeText(text);

    toast.success("Text is copied to clipboard");
    // sde
  };

  // ss
  return (
    <div className="flex flex-col items-center justify-center gap-3 sm:w-full w-[100%]">
      {/* {pageListId} */}
      {/* {editedText} */}
      <div
        className="flex flex-col gap-2
        2xl:w-full xl:w-[50vw] lg:w-[60vw] md:w-[75vw] sm:w-[85vw] w-[90vw]"
      >
        <div className="relative w-full">
          <Input
            type="text"
            placeholder={
              textAreaData
                ? "Search text areas and labels..."
                : "Search texts and labels..."
            }
            className="text-[16px] pl-2 pr-10 py-[18px] bg-gray-200/70 max-w-[85%] mx-auto"
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
          />

          <FiSearch
            size={20}
            className="absolute right-15.25 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none"
          />
        </div>

        {search && (
          <span className="text-sm text-gray-700">
            Searching for: {search}
          </span>
        )}
      </div>

      <div
        className="flex flex-row items-center justify-center gap-2 
      2xl:w-full xl:w-[50vw] lg:w-[60vw] md:w-[75vw] sm:w-[85vw] w-[90vw]
      bg-gray-400/20 px-2.5 py-4 rounded-xs mb-3"
      // border border-black
      >
        <div className="flex flex-col gap-2 w-full">
          <Input
            type="text"
            placeholder={
              textAreaData
                ? "Add label for this text area..."
                : "Add label for this text..."
            }
            className="text-[14px] px-2 py-1 bg-gray-700/5 tracking-wider"
            value={label}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setLabel(e.target.value);
            }}
          />

          {textsDataArray && !textAreaData && (
            <Input
              type="text"
              placeholder="Add your text here..."
              className="text-[20.25px] px-2 py-[21px] bg-gray-200/70"
              value={localStorage.getItem("text") || text || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                localStorage.setItem("text", e.target.value);
                setText(e.target.value);
              }}
            />
          )}

          {textAreaData && (
            <Textarea
              placeholder="Add your text here..."
              className="text-[19.25px] px-2 w-full resize-none bg-gray-200/70"
              value={localStorage.getItem("textArea") || text || ""}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                localStorage.setItem("textArea", e.target.value);
                setText(e.target.value);
              }}
            />
          )}
        </div>

        <Button
          variant="outline"
          className="add-button"
          onClick={handleAddText}
        >
          {textLoading ? <LoaderCircle className="animate-spin" /> : "Add"}
        </Button>
      </div>

      <div className="flex flex-col justify-center px-5 gap-[7px] items-center w-full">
        {paginatedTexts.length > 0 ? paginatedTexts.map((item) => (
          <div
            className="flex flex-row justify-between items-center 2xl:w-full xl:w-[50vw] lg:w-[60vw] md:w-[75vw] sm:w-[85vw] w-[90vw] gap-4"
            key={item.id}
          >
            {editedOn === item.id ? (
              <div className="flex flex-row items-end gap-2 w-full">
                <div className="flex flex-col gap-2 w-full">
                  <Input
                    type="text"
                    placeholder={
                      textAreaData
                        ? "Add label for this text area..."
                        : "Add label for this text..."
                    }
                    value={editedLabel}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      localStorage.setItem("editedLabel", e.target.value);
                      setEditedLabel(e.target.value);
                    }}
                    className="text-[16px] px-2 bg-gray-100/80"
                  />

                  {textsDataArray && !textAreaData && (
                    <Input
                      type="text"
                      defaultValue={
                        // localStorage.getItem("editedText") ||
                        item.text
                      }
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        localStorage.setItem("editedText", e.target.value);
                        setEditedText(e.target.value);
                      }}
                      className="text-[20.4px] px-2 bg-gray-200/70"
                    />
                  )}

                  {textAreaData && (
                    <Textarea
                      defaultValue={
                        // localStorage.getItem("editedTextArea") ||
                        item.text
                      }
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                        localStorage.setItem("editedTextArea", e.target.value);
                        setEditedText(e.target.value);
                      }}
                      className="text-[20.4px] px-2 bg-gray-200/70"
                    />
                  )}
                </div>

                <Button
                  onClick={() => handleEditText(item.id)}
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
              <div className="flex flex-col gap-1 xl:w-full md:min-w-[500px] sm:min-w-[400px] min-w-[300px]">
                {item.label && (
                  <span className="text-base text-black/95 font-semibold tracking-wider"
                  // font-medium
                  >
                    {item.label}
                  </span>
                )}

                <div
                  className={`bg-gray-700/70 text-white hover:bg-gray-700/65 active:scale-95
                 w-full px-3 py-[1px] rounded-xs ${textAreaData && "whitespace-pre-line"}`}
                  onClick={() => handleCopyText(item.text)}
                  // max-[450px]:min-w-[200px]
                >
                  <span
                    className="text-[20.4px] tracking-wide
                cursor-default active:scale-95"
                  >
                    {item.text}
                  </span>
                </div>
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
                  if (editedOn === item.id) {
                    setEditedOn(null);
                    setEditedText("");
                    setEditedLabel("");
                  } else {
                    setEditedOn(item.id);

                    // const savedTextArea =
                    //   localStorage.getItem("editedTextArea");
                    // const savedText = localStorage.getItem("editedText");
                    // const savedLabel = localStorage.getItem("editedLabel");

                    setEditedText(
                      // textAreaData && savedTextArea
                      //   ? savedTextArea
                      //   : savedText ||
                      item.text,
                    );
                    setEditedLabel(
                      // (savedLabel && item.label?.trim() !== ""
                      //   ? savedLabel
                      // :
                      item.label ||
                        // item.label ||
                        "",
                    );
                  }
                  // editedOn === item.text
                  //   ? setEditedOn("")
                  //   : setEditedOn(item.text);
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
                      onClick={() => handleDeleteItem(item.id)}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        )) : (
          <span className="text-sm text-gray-700">
            No results for: {search}
          </span>
        )}
      </div>

      {filteredTexts.length > itemsPerPage && (
        <div
          className="flex flex-wrap items-center justify-center gap-2
          2xl:w-full xl:w-[50vw] lg:w-[60vw] md:w-[75vw] sm:w-[85vw] w-[90vw]"
        >
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="Previous page"
            disabled={currentPage === 1}
            className="cursor-pointer"
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
                // variant={currentPage === pageNumber ? "link" : "outline"}
                variant={`outline`}
                size="icon"
                aria-label={`Go to page ${pageNumber}`}
                onClick={() => setCurrentPage(pageNumber)}
                className={`cursor-pointer 
                  ${currentPage === pageNumber && `bg-gray-700/70 hover:bg-gray-700/65 text-white hover:text-white`}`}
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
            className="cursor-pointer"
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

export default AddText;
