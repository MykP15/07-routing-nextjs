import { fetchNotes } from "@/lib/api"
import NoteList from "@/components/NoteList/NoteList"


interface NoteByCategoryProps{
    params: Promise<{ slug: string[] }>
}


async function NotesByCategory({ params }: NoteByCategoryProps) {


    const {slug} = await params

    const category = slug[0] === "all" ? undefined : slug[0]
    const data = await fetchNotes({page: 1,
  tag: category,});

    return (
        <>
            <NoteList notes={data.notes}></NoteList>
        </>
    )
}

export default NotesByCategory