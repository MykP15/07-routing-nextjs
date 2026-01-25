"use client"

import css from "@/app/@modal/NotePreview.module.css"
import { useRouter } from "next/navigation"

interface ModalPreviewProps {
children: React.ReactNode
}

function ModalPreview({children}: ModalPreviewProps) {
    const router = useRouter()
    
    const handleClose = () => {
        router.back()
    }

    return (
        <div className={css.container}>
            {children}
            <button className={css.backBtn} onClick={handleClose}>Close</button>
         </div>
    )
}

export default ModalPreview