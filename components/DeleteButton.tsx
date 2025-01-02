'use client'

import { useRouter } from 'next/navigation'

export default function DeleteButton({ id }: { id: string }) {
  const router = useRouter()

  const handleDelete = async () => {
    const res = await fetch(`/api/notes/${id}`, {
      method: 'DELETE'
    })
    if (res.ok) {
      router.refresh()
    }
  }

  return (
    <button 
      onClick={handleDelete}
      className="absolute top-2 right-2 text-red-500 hover:text-red-700"
    >
      ×
    </button>
  )
}