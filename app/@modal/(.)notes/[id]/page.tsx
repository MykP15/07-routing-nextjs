import { fetchNoteById } from "@/lib/api"
import css from "@/app/@modal/NotePreview.module.css"
import ModalPreview from "@/components/ModalPreview/ModalPreview"

interface NotePreviewProps{
    params: Promise<{id: string}>
}


async function NotePreview({params}: NotePreviewProps) {
    const { id } = await params
    const note = await fetchNoteById(id)

    return (
        <ModalPreview>
            <div className={css.item}>
            <h2 className={css.header}>{note.title}</h2>
                <p className={css.content}>{note.content}</p>
        </div>

        </ModalPreview>
    )
}

export default NotePreview