import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
// import { connectToDatabase } from "@/lib/db";
// import text from "@/models/text";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from '@/lib/prisma';
// model import 


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {

    
    // await connectToDatabase();
    const session = await getServerSession(req, res, authOptions);
    console.log(session?.user?.email);


    if (!session) {
        return res.status(401).json({
            message: "Unauthorized",
            success: false,
        })
    }


    if (req.method === "GET") {
        // find from db
        // const textsData = await text.find({
        //   emailRef: session?.user?.email
        // });


        // const jTextsData = JSON.parse(JSON.stringify(textsData));

        const jTextsData = await prisma.text.findMany({
          where: { emailRef: session?.user?.email }
        })
      
        return res.status(200).json({
            success: true,
            data: jTextsData,
        })
    }

    res.setHeader("Allow", ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`)


  } catch (error: any) {
    console.error('Error in handler', error);
    res.status(500).json({
        success: false,
        message: "Internal Server Error", 
        error: error.message
    })
  }
}
