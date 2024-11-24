import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongoDb';
import Question from '@/models/quiz';

await connectDB();

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { question, options, answer } = body;


        if (!question ||  options.length === 0 || !answer) {
            return NextResponse.json({ status: false, message: 'Invalid input data' },{ status: 400 });
        }

        const quiz = await Question.create(body);
        return NextResponse.json({ status: true, data: quiz }, { status: 201 });

    } catch (error: any) {
        console.error('Error in POST /api/quiz:', error.message || error);
        return NextResponse.json({ status: false, message: 'Internal server error'},{ status: 500 });
    }
}
