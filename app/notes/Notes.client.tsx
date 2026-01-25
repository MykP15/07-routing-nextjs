"use client"

import css from "./NotesPage.module.css"

import { fetchNotes } from "@/lib/api"
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { useState } from "react"
import { useDebounce } from "use-debounce"

import Modal from "@/components/Modal/Modal"
import Pagination from "@/components/Pagination/Pagination"
import NoteList from "@/components/NoteList/NoteList"
import SearchBox from "@/components/SearchBox/SearchBox"
import NoteForm from "@/components/NoteForm/NoteForm"


export default function NotesClient() {
    
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1)
    const [modalIsOpen, setModalIsOpen] = useState(false)

    const [debouncedSearch] = useDebounce(search, 500);

    const { data, isLoading, isError } = useQuery({
        queryKey: ['notes', page, debouncedSearch],
        queryFn: () => fetchNotes({ page, search: debouncedSearch }),
        placeholderData: keepPreviousData,
    })

    const totalPages = data?.totalPages ?? 0
    
    function Search(value: string) {
        setSearch(value)
        setPage(1)
    }

    return (
        <div className={css.app}>
            <header className={css.toolbar}>
                <SearchBox value={search} onChange={Search} />
                {totalPages > 1 && <Pagination totalPages={data?.totalPages ?? 1} page={page} onPageChange={setPage} />}
                <button className={css.button} onClick={() => setModalIsOpen(true)}>Create note +</button>
            </header>
            {!isError && !isLoading && data && data.notes.length > 0 && <NoteList notes={data.notes} />}
            {modalIsOpen &&
                <Modal onClose={() => setModalIsOpen(false)}>
                    <NoteForm onCancel={() => setModalIsOpen(false)} />
                </Modal>
            }
        </div>
    )
}