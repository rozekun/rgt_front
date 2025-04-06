import * as S from '@/app/books/[id]/booksDetail.style'
import BookDetailView from "@/app/books/[id]/(components)/BookDetailView";
import {Book} from "@/app/(root)/book.type";

async function getBook(id: string)  : Promise<Book | null> {
    const res = await fetch(`http://localhost:3001/books/${id}`)
    if (!res.ok) return null
    return await res.json()
}

export default async function BookDetailPage({params}: {
    params: Promise<{ id: string }>
}) {
    const {id} = await params

    const book = await getBook(id)
    if (!book) {
        return (
            <S.Container>
                <>책을 찾을 수 없습니다.</>
            </S.Container>
        )
    }


    return <BookDetailView book={book}/>

}