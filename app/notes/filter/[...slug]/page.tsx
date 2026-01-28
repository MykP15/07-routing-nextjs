import { fetchNotes } from "@/lib/api";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import NotesClient from "./Notes.client";

interface NotesByCategoryProps {
  params: Promise<{ slug: string[] }>;
}

export default async function NotesByCategory({ params }: NotesByCategoryProps) {
  const { slug } = await params;

  const category = slug?.[0] === "all" ? undefined : slug?.[0];

  const queryClient = new QueryClient();


  await queryClient.prefetchQuery({
    queryKey: ["notes", { page: 1, tag: category }],
    queryFn: () => fetchNotes({ page: 1, tag: category }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={category}/>
    </HydrationBoundary>
  );
}
