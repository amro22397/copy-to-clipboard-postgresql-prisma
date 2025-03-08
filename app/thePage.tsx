"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { Text } from "@/types/text";
import AddText from "@/components/AddText";
import AddTextArea from "@/components/AddTextArea";




const ThePage = ({
  textAreaData,
  textsDataArray,
}: {
  textAreaData: Text[];
  textsDataArray: Text[];
}) => {

  //   const [textsData, setTextsData] = useState([]);
  //   const [textsAreaData, setTextsAreaData] = useState([]);

  

  
  

  //   const getTexts = async () => {

  //     const res = await axios.get("/api/text");

  //     setTextsData(res.data.data);

  //     if (res.data.success) {
  //       toast.success(res.data.message)
  //     } else {
  //       toast.error(res.data.message)
  //     }

  //   }

  //   const getTextsArea = async () => {

  //     const res = await axios.get("/api/text-area");

  //     setTextsData(res.data.data);
  //     console.log(textsData);

  //     if (res.data.success) {
  //       toast.success(res.data.message)
  //     } else {
  //       toast.error(res.data.message)
  //     }

  //   }

  //   useEffect(() => {

  //     getTextsArea();
  //   }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-6 max-w-7xl mx-auto h-[calc(100vh-100px)]">

        <h1 className="text-4xl font-semibold my-4">Copy to Clipboard</h1>
      <div className="flex flex-row items-start justify-center gap-10 w-full">

        <AddText textsDataArray={textsDataArray} />

        <AddText textsDataArray={textAreaData} textAreaData={textAreaData} />
        {/* <AddTextArea textAreaData={textAreaData} /> */}
      </div>
    </div>
  );
};

export default ThePage;
