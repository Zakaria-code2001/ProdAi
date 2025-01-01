import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { content } = await request.json();

  try {
    const response = await fetch(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.API_KEY}`,
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [{ role: 'user', content }],
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Errore nella richiesta all'API di Groq.");
    }

    const data = await response.json();
    return NextResponse.json({
      continuedContent: data.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Errore durante il completamento AI.' },
      { status: 500 }
    );
  }
}
