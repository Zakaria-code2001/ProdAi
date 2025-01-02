export async function getById(id: string) {
  try {
    const response = await fetch(`/api/notes/${id}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch note: ${response.statusText}`);
    }

    const data = await response.json();
    return data?.data;
  } catch (error) {
    console.error('Error fetching note:', error);
    return null;
  }
}

export async function updateNote(
  id: string,
  note: { id?: string; title: string; content: string }
) {
  try {
    const response = await fetch(`/api/notes/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    });

    if (!response.ok) {
      throw new Error(`Failed to update note: ${response.statusText}`);
    }

    const data = await response.json();
    return data?.data;
  } catch (error) {
    console.error('Error updating note:', error);
    return null;
  }
}

export async function createNote(title: string, content: string) {
  try {
    const response = await fetch('/api/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content }),
    });

    if (!response.ok) {
      throw new Error(`Failed to create note: ${response.statusText}`);
    }

    const data = await response.json();
    return data?.data;
  } catch (error) {
    console.error('Error creating note:', error);
    return null;
  }
}

export async function deleteNote(id: string) {
  try {
    const response = await fetch(`/api/notes/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Failed to delete note: ${response.statusText}`);
    }

    return true; // Returning true to indicate success
  } catch (error) {
    console.error('Error deleting note:', error);
    return false; // Returning false to indicate failure
  }
}
