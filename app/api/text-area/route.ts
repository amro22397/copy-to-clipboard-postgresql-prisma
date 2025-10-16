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

        const { text, emailRef } = await req.json();

        // const textAreaData = await textArea.create({
        //     text: text,
        //     emailRef: emailRef,
        // })

        const textAreaData = await prisma.textArea.create({
            data: {
                text: text,
                emailRef: emailRef,
            }
        })

        return NextResponse.json({
            success: true,
            data: textAreaData,
            message: 'Text is added successfully',
        })

    } catch (error: any) {

        return NextResponse.json({
            success: false,
            message: `ApiError: ${error.message}`,
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

        const { text } = await req.json();

        const id = req.nextUrl.searchParams.get('id');

        // const textDataUpdated = await textArea.findByIdAndUpdate(id, {
        //     text: text,
        // })

        const textDataUpdated = await prisma.textArea.update({
            where: { id: id },
            data: { text: text }
        })

        return NextResponse.json({
            success: true,
            data: textDataUpdated,
            message: 'Text is updated successfully',
        })

    } catch (error: any) {

        return NextResponse.json({
            success: false,
            message: 'ApiError: ' + error.message,
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
            message: 'Text is deleted successfully',
        })

    } catch (error: any) {

        return NextResponse.json({
            success: false,
            message: 'ApiError: ' + error.message,
        })

    }
}