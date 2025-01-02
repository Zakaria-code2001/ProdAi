import { getUserFromClerkID } from '@/utils/auth';
import { prisma } from '@/utils/db';
import { NextResponse } from 'next/server';

// GET - Get a single note
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getUserFromClerkID();
    const resolvedParams = await params; // Resolve the Promise to get the actual `id`
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

// PATCH - Update a note
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } } // Change `params` to a direct object instead of a promise
) {
  try {
    const user = await getUserFromClerkID();
    const { title, content } = await request.json();

    const updatedNote = await prisma.notesEntry.update({
      where: {
        id: String(params.id),  // Use the resolved `id` directly
        userId: user.id,
      },
      data: {
        title,
        content,
      },
    });

    return NextResponse.json({ data: updatedNote });
  } catch (error) {
    console.error('Error updating note:', error);
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
        id: params.id,  // Use the resolved `id` directly
        userId: user.id,
      },
    });

    return NextResponse.json({ message: 'Note deleted' });
  } catch (error) {
    console.error('Error deleting note:', error);
    return NextResponse.json({ error: 'Error deleting note' }, { status: 500 });
  }
}
