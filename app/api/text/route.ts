import mongoose from "mongoose";

import Text from "@/models/text"
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";


// export async function GET() {

// }

export async function POST(req: Request) {

    await connectToDatabase();

    try {

        const { text } = await req.json();

        const textData = await Text.create({
            text: text,
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



export async function PUT(req: any) {

    // mongoose.connect(process.env.MONGO_URL as string);

    await connectToDatabase();

    try {

        const { text } = await req.json();

        const id = req.nextUrl.searchParams.get('id');

        const textDataUpdated = await Text.findByIdAndUpdate(id, {
            text: text,
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

    await connectToDatabase();

    try {
        const id = req.nextUrl.searchParams.get('id');

        const textDataDeleted = await Text.findByIdAndDelete(id);

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

    // ss
}