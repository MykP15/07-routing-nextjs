"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import ModalPreview from "@/components/ModalPreview/ModalPreview";
import css from "@/app/@modal/NotePreview.module.css";

interface Note {
  id: string;
  title: string;
  content: string;
}

interface NotePreviewClientProps {
  noteId: string;
}

export default function NotePreviewClient({ noteId }: NotePreviewClientProps) {
  const { data: note, isLoading, isError } = useQuery<Note>({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
  });

  if (isLoading) return <p>Loading note...</p>;
  if (isError || !note) return <p>Error loading note</p>;

  return (
    <ModalPreview>
      <div className={css.item}>
        <h2 className={css.header}>{note.title}</h2>
        <p className={css.content}>{note.content}</p>
      </div>
    </ModalPreview>
  );
}
