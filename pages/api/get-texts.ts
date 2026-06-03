import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
// import { connectToDatabase } from "@/lib/db";
// import text from "@/models/text";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from '@/lib/prisma';
// model import 

type TextRow = {
  id: string;
  text: string;
  label: string | null;
};

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

    const pageListId = Array.isArray(req.query.pageListId)
      ? req.query.pageListId[0]
      : req.query.pageListId;

    console.log(pageListId)


    if (req.method === "GET") {
        // find from db
        // const textsData = await text.find({
        //   emailRef: session?.user?.email
        // });


        // const jTextsData = JSON.parse(JSON.stringify(textsData));

        if (pageListId === 'All') {

          const jTextsDataAll = await prisma.$queryRaw<TextRow[]>`
            SELECT "id", "text", "label"
            FROM "Text"
            WHERE "emailRef" = ${session?.user?.email}
            AND "listId" = 'All'
            ORDER BY "createdAt" ASC
          `;

        const jTextsDataNull = await prisma.$queryRaw<TextRow[]>`
          SELECT "id", "text", "label"
          FROM "Text"
          WHERE "emailRef" = ${session?.user?.email}
          AND "listId" IS NULL
          ORDER BY "createdAt" ASC
        `;

        return res.status(200).json({
            success: true,
            data: [...jTextsDataNull, ...jTextsDataAll],
        })
        }

        const jTextsData = await prisma.$queryRaw<TextRow[]>`
          SELECT "id", "text", "label"
          FROM "Text"
          WHERE "emailRef" = ${session?.user?.email}
          AND "listId" = ${pageListId}
          ORDER BY "createdAt" ASC
        `;
      
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
