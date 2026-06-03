// import { connectToDatabase } from "@/lib/db";
// import { connectToMongoDB } from "@/lib/mongoDB";
// import textArea from "@/models/text-area";
// import mongoose from "mongoose";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function POST(req: Request) {

    // mongoose.connect(process.env.MONGO_URL as string);

    // await connectToDatabase();

    // await connectToMongoDB();


    try {

        const { text, label, emailRef, userId, listId } = await req.json();
        const cleanLabel = typeof label === "string" && label.trim() ? label.trim() : null;

        // const textAreaData = await textArea.create({
        //     text: text,
        //     emailRef: emailRef,
        // })

        const textAreaData = await prisma.textArea.create({
            data: {
                text: text,
                emailRef: emailRef,
                userId: userId,
                listId: listId
            }
        })

        if (cleanLabel) {
            await prisma.$executeRaw`
                UPDATE "TextArea"
                SET "label" = ${cleanLabel}
                WHERE "id" = ${textAreaData.id}
            `;
        }

        return NextResponse.json({
            success: true,
            data: { ...textAreaData, label: cleanLabel },
            message: 'Textarea is added successfully',
        })

    } catch (error: any) {

        console.log(`Server error adding textarea: ${error}`)

        return NextResponse.json({
            success: false,
            message: `Server error adding textarea: ${error}`,
        })

    }

}



export async function GET() {

    // await connectToMongoDB();

    try {

        // const textAreaData = await textArea.find({});

        const textAreaData = await prisma.textArea.findMany();
        console.log(textAreaData);

        return NextResponse.json({
            success: true,
            data: textAreaData,
        })

    } catch (error: any) {

        return NextResponse.json({
            success: false,
        })

    }
}



export async function PUT(req: any) {

    // mongoose.connect(process.env.MONGO_URL as string);

    // await connectToDatabase();

    // await connectToMongoDB();


    try {

        const { text, label } = await req.json();

        const id = req.nextUrl.searchParams.get('id');
        const cleanLabel = typeof label === "string" && label.trim() ? label.trim() : null;

        // const textDataUpdated = await textArea.findByIdAndUpdate(id, {
        //     text: text,
        // })

        const textDataUpdated = await prisma.textArea.update({
            where: { id: id },
            data: { text: text }
        })

        if (id) {
            await prisma.$executeRaw`
                UPDATE "TextArea"
                SET "label" = ${cleanLabel}
                WHERE "id" = ${id}
            `;
        }

        return NextResponse.json({
            success: true,
            data: { ...textDataUpdated, label: cleanLabel },
            message: 'Textarea is updated successfully',
        })

    } catch (error: any) {

        console.log('Server error updating textarea: ' + error,)

        return NextResponse.json({
            success: false,
            message: 'Server error updating textarea: ' + error,
        })

    }
}


export async function DELETE(req: any) {

    // mongoose.connect(process.env.MONGO_URL as string);

    // await connectToDatabase();

    // await connectToMongoDB();


    try {
        const id = req.nextUrl.searchParams.get('id');

        // const textDataDeleted = await textArea.findByIdAndDelete(id);

        const textDataDeleted = await prisma.textArea.delete({
            where: { id: id }
        })

        return NextResponse.json({
            success: true,
            message: 'Textarea is deleted successfully',
            data: textDataDeleted
        })

    } catch (error: any) {

        console.log('Server error deleting textarea: ' + error)

        return NextResponse.json({
            success: false,
            message: 'Server error deleting textarea: ' + error,
        })

    }
}
