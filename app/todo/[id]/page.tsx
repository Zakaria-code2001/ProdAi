export default function TodoDetailPage({ params }: { params: { id: string } }) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Todo Item {params.id}</h1>
        <p>Here you can view or edit the todo item details.</p>
      </div>
    );
  }
  