import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {

    const { name, email, userId } = await req.json();

    try {
        
        const list = await prisma.list.create({
            data: {
                name: name,
                emailRef: email,
                userId: userId
            }
        })

        return NextResponse.json({
            success: true,
            message: "List created successfully",
            data: list
        })

    } catch (error) {
        
        console.log(`Server error creating list: ${error}`);

        return NextResponse.json({
            success: false,
            message: `Server error creating list: ${error}`,
        })
    }
}




export async function PUT(req: NextRequest) {

    const { name, listId, email, userId } = await req.json();

    try {
        
        const updatedList = await prisma.list.update({
            where: { id: listId },
            data: {
                name: name,
            }
        })

        return NextResponse.json({
            success: true,
            message: "List updated successfully",
            data: updatedList
        })

    } catch (error) {
        
        console.log(`Server error updating list: ${error}`);

        return NextResponse.json({
            success: false,
            message: `Server error updating list: ${error}`,
        })
    }
}



export async function DELETE(req: NextRequest) {

    const id = req.nextUrl.searchParams.get('id');

    try {
        
        const deletedList = await prisma.list.delete({
            where: { id: id },
        })

        return NextResponse.json({
            success: true,
            message: "List deleted successfully",
            data: deletedList
        })


    } catch (error) {
     
        console.log(`Server error deleting list: ${error}`);

        return NextResponse.json({
            success: false,
            message: `Server error deleting list: ${error}`,
        })
    }
}