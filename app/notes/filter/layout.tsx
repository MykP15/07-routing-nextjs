interface NotesLayoutProps {
    children: React.ReactNode,
    sidebar: React.ReactNode
}

function NotesLayout({sidebar, children }: NotesLayoutProps) {
    return (
        <section>
            <aside>{sidebar}</aside>
            <main>{children}</main>
        </section>
    )
}

export default NotesLayout