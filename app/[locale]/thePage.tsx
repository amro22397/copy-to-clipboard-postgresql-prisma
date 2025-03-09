"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { Text } from "@/types/text";
import AddText from "@/components/AddText";
import AddTextArea from "@/components/AddTextArea";
import axios from "axios";
import { toast } from "sonner";
import { Session } from "@/types/session";
import { signOut } from "next-auth/react";
import { useLocale } from "next-intl";

const ThePage = ({ user }: //   textAreaData,
//   textsDataArray,
{
  user: Session,
  //   textAreaData: Text[];
  //   textsDataArray: Text[];
}) => {
  const [textsData, setTextsData] = useState([]);
  const [textsAreaData, setTextsAreaData] = useState([]);

  const locale = useLocale();

  const getTexts = async () => {
    const res = await axios.get("/api/get-texts");

    setTextsData(res.data.data);
  };

  const getTextsArea = async () => {
    const res = await axios.get("/api/get-texts-area");

    setTextsAreaData(res.data.data);
  };

  useEffect(() => {
    getTexts();
    getTextsArea();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-6 max-w-7xl mx-auto h-[calc(100vh-100px)]">
      <h1 className="text-4xl font-semibold my-4">Copy to Clipboard</h1>
      <div className="w-full flex flex-row justify-end gap-3 items-center">
        <span className="">
          {user?.user?.email}
        </span>

        <Button 
        className="bg-red-500 text-white hover:bg-red-500/95 active:scale-95
        cursor-pointer"
        onClick={() => signOut({callbackUrl: `/${locale}/`})}
        >
          Log Out
        </Button>
      </div>
      <div className="flex flex-row items-start justify-center gap-10 w-full">
        <AddText textsDataArray={textsData} getTexts={getTexts} getTextsArea={getTextsArea} email={user?.user?.email} />

        <AddText textsDataArray={textsAreaData} textAreaData={textsAreaData} getTexts={getTexts} getTextsArea={getTextsArea}
        email={user?.user?.email} />
        {/* <AddTextArea textAreaData={textAreaData} /> */}
      </div>
    </div>
  );
};

export default ThePage;
