import mongoose from "mongoose";
import ThePage from "./thePage";
import textArea from "@/models/text-area";
import text from "@/models/text";

const page = async () => {

  mongoose.connect(process.env.MONGO_URL as string);
  const textsData = await text.find({});
  const jTextsData = JSON.parse(JSON.stringify(textsData));


  const textAreaData = await textArea.find({});
  const jTextAreaData = JSON.parse(JSON.stringify(textAreaData));

  console.log(textsData);
  console.log(textAreaData)
      
  

  return (
    <ThePage textAreaData={jTextAreaData} textsDataArray={jTextsData} />
  );
};

export default page;
