import { getUserFromClerkID } from '@/utils/auth';
import { prisma } from '@/utils/db';
import { NextResponse } from 'next/server';

// GET - Get a single note
// ...existing code...
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getUserFromClerkID();
    const resolvedParams = await params;
    console.log('Params:', resolvedParams);
    console.log('User:', user);

    const note = await prisma.notesEntry.findUnique({
      where: {
        id: String(resolvedParams.id),
        userId: user.id,
      },
    });

    if (!note) {
      return NextResponse.json({ error: 'Note not found' }, { status: 404 });
    }

    return NextResponse.json({ data: note });
  } catch (error) {
    console.error('Error in GET:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Error fetching note';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
// ...existing code...

// PATCH - Update a note
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getUserFromClerkID();
    const { title, content } = await request.json();

    const updatedNote = await prisma.notesEntry.update({
      where: {
        id: String(params.id),
        userId: user.id,
      },
      data: {
        title,
        content,
      },
    });

    return NextResponse.json({ data: updatedNote });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ error: 'Error updating note' }, { status: 500 });
  }
}

// DELETE - Delete a note
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getUserFromClerkID();
    await prisma.notesEntry.delete({
      where: {
        id: params.id,
        userId: user.id,
      },
    });

    return NextResponse.json({ message: 'Note deleted' });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting note' }, { status: 500 });
  }
}
