"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { Text } from "@/types/text";
import AddText from "@/components/AddText";
import AddTextArea from "@/components/AddTextArea";
import axios from "axios";
import { toast } from "sonner";

const ThePage = ({}: //   textAreaData,
//   textsDataArray,
{
  //   textAreaData: Text[];
  //   textsDataArray: Text[];
}) => {
  const [textsData, setTextsData] = useState([]);
  const [textsAreaData, setTextsAreaData] = useState([]);

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
      <div className="flex flex-row items-start justify-center gap-10 w-full">
        <AddText textsDataArray={textsData} getTexts={getTexts} getTextsArea={getTextsArea} />

        <AddText textsDataArray={textsAreaData} textAreaData={textsAreaData} getTexts={getTexts} getTextsArea={getTextsArea} />
        {/* <AddTextArea textAreaData={textAreaData} /> */}
      </div>
    </div>
  );
};

export default ThePage;
