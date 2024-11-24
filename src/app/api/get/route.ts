import { NextRequest, NextResponse } from "next/server";
import Question from "@/models/quiz";
import connectDB from "@/lib/mongoDb";

export async function GET(req: NextRequest){
    try{
        await connectDB()
        const data = await Question.find()
        return NextResponse.json({status: true, data: data}, {status: 200})
    }catch(error: any){
        console.error('Error in fetching documents: ', error.message || error)
        return NextResponse.json({status: false, message: 'Internal server error'}, {status: 500})
    }
}