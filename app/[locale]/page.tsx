// import mongoose from "mongoose";
import ThePage from "./thePage";
// import textArea from "@/models/text-area";
// import text from "@/models/text";

// import { connectToDatabase } from '@/lib/db'
import { redirect } from "next/navigation";
import { getUser } from "@/actions/getUser";
import { getLocale } from "next-intl/server";
import EmailIsNotVerified from "@/components/EmailIsNotVerified";
import prisma from "@/lib/prisma";
import Link from "next/link";



const page = async () => {

  // mongoose.connect(process.env.MONGO_URL as string);
  // connectToDatabase();
  
  // const textsData = await text.find({});
  // const jTextsData = JSON.parse(JSON.stringify(textsData));


  // const textAreaData = await textArea.find({});
  // const jTextAreaData = JSON.parse(JSON.stringify(textAreaData));

  // console.log(textsData);
  // console.log(textAreaData)
      
  
  const user = await getUser();
  const jUser = JSON.parse(JSON.stringify(user) || '{}')
  const locale = await getLocale();


 console.log(jUser)

 
  if (!jUser?.user?.email) {
    redirect(`/${locale}/register`);
  }


  const sessionUser = await prisma.user.findUnique({
    where: { email: jUser.user.email }
  })

  return (
    <>
    <EmailIsNotVerified session={sessionUser} />
    
    <ThePage user={jUser} /*textAreaData={jTextAreaData} textsDataArray={jTextsData}*/ />
    </>
  );
};

export default page;
