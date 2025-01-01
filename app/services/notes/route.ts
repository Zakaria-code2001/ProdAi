import { getUserFromClerkID } from '@/utils/auth';
import { prisma } from '@/utils/db';
import { NextResponse } from 'next/server';

// GET - List all notes for the current user
export async function GET() {
  try {
    const user = await getUserFromClerkID();
    const notes = await prisma.notesEntry.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json({ data: notes });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching notes' },
      { status: 500 }
    );
  }
}

// POST - Create a new note
export async function POST(request: Request) {
  try {
    const user = await getUserFromClerkID();
    const { title, content } = await request.json();

    const note = await prisma.notesEntry.create({
      data: {
        title,
        content,
        userId: user.id,
      },
    });

    return NextResponse.json({ data: note }, { status: 201 });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ error: 'Error creating note' }, { status: 500 });
  }
}
