import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { fetchNotes } from '@/lib/api'
import NotesClient from './Notes.client'
import { redirect } from 'next/navigation'

export default async function NotesPage() {
    redirect("/notes/filter/all")
    const queryClient = new QueryClient()

    await queryClient.prefetchQuery({
        queryKey: ['notes', 1, ''],
        queryFn: () => fetchNotes({ page: 1, search: '' }),
    })

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotesClient />
        </HydrationBoundary>
    )
}