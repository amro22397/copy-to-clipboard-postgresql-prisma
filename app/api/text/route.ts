// import mongoose from "mongoose";

// import Text from "@/models/text"
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
// import { connectToDatabase } from "@/lib/db";
// import { connectToMongoDB } from "@/lib/mongoDB";


// export async function GET() {

// }

export async function POST(req: Request) {

    // await connectToDatabase();

    // await connectToMongoDB();
    try {

        const { text, emailRef } = await req.json();

        // const textData = await Text.create({
        //     text: text,
        //     emailRef: emailRef,
        // })

        const textData = await prisma.text.create({
            data: {
                text: text,
                emailRef: emailRef,
            }
        })

        return NextResponse.json({
            success: true,
            data: textData,
            message: 'Text is added successfully',
        })

    } catch (error: any) {

        return NextResponse.json({
            success: false,
            message: `ApiError: ${error.message}`,
        })

    }
}



export async function PUT(req: any, { params }: { params: { id: string }}) {

    // mongoose.connect(process.env.MONGO_URL as string);

    // await connectToDatabase();

    // await connectToMongoDB();

    const idA = params.id;
    console.log(`Id is: ${idA}`)


    try {

        const { text } = await req.json();

        const id = req.nextUrl.searchParams.get('id');

        // const textDataUpdated = await Text.findByIdAndUpdate(id, {
        //     text: text,
        // })

        const textDataUpdated = await prisma.text.update({
            where: { id: id },
            data: { text: text, }
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

        // const textDataDeleted = await Text.findByIdAndDelete(id);

        const textDataDeleted = await prisma.text.delete({
            where: { id: id }
        })

        return NextResponse.json({
            success: true,
            message: 'Text is deleted successfully',
            data: textDataDeleted,
        })

    } catch (error: any) {

        return NextResponse.json({
            success: false,
            message: 'ApiError: ' + error.message,
        })

    }

    // ss
}