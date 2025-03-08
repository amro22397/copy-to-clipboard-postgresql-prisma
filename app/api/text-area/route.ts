import { connenctToMongoDB } from "@/lib/mongoDB";
import textArea from "@/models/text-area";
import mongoose from "mongoose";
import { NextResponse } from "next/server";


export async function POST(req: Request) {

    mongoose.connect(process.env.MONGO_URL as string);
    
        try {
            
            const { text } = await req.json();
    
        const textAreaData = await textArea.create({
            text: text,
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



export async function GET(req: Request) {

    await connenctToMongoDB();

    try {

        const textAreaData = await textArea.find({});
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

    mongoose.connect(process.env.MONGO_URL as string);

    try {

        const { text } = await req.json();

        const id = req.nextUrl.searchParams.get('id');

        const textDataUpdated = await textArea.findByIdAndUpdate(id, {
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

    mongoose.connect(process.env.MONGO_URL as string);

    try {
        const id = req.nextUrl.searchParams.get('id');

        const textDataDeleted = await textArea.findByIdAndDelete(id);

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