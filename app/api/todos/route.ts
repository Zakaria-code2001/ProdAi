// app/api/todos/route.ts
import { NextResponse } from 'next/server';
import { Groq } from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.API_KEY, // Updated to match your env variable name
});

export async function POST(req: Request) {
  try {
    const { task } = await req.json();

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful AI assistant that provides practical suggestions for completing tasks. For workouts, provide specific exercise routines. For other tasks, provide actionable steps and tips."
        },
        {
          role: "user",
          content: `Please provide practical suggestions for completing this task: "${task}". If it's a workout, include specific exercises, sets, and reps. Keep the response concise and actionable, maximum 3-4 suggestions.`
        }
      ],
      model: "mixtral-8x7b-32768",
      temperature: 0.7,
      max_tokens: 200,
    });

    return NextResponse.json({ 
      suggestions: completion.choices[0]?.message?.content || "No suggestions available" 
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate suggestions' },
      { status: 500 }
    );
  }
}
