'use client'

import { useRouter } from 'next/navigation'
import * as S from '@/app/books/[id]/(components)/BookDetailView.style'
import {Book} from "@/app/(root)/book.type";

export default function BookDetailView({ book }: { book: Book }) {
    const router = useRouter()

    const handleDelete = async () => {
        if (!confirm('정말 삭제하시겠습니까?')) return

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/books/${book.id}`, {
            method: 'DELETE',
        })
        if (res.ok) {
            alert('삭제되었습니다.')
            router.push('/')
        } else {
            alert('삭제에 실패했습니다.')
        }
    }

    return (
        <S.Container>
            <S.Title>{book.title}</S.Title>
            <S.InfoBox>
                <S.BookImage src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${book.image}`} alt={book.title} />
                <S.BookDetail>
                    <p><strong>저자:</strong> {book.author}</p>
                    <p><strong>설명:</strong> {book.description}</p>
                    <p><strong>수량:</strong> {book.stock}권</p>
                    <p><strong>업로드:</strong> {new Date(book.createdAt).toLocaleDateString('ko-KR')}</p>
                </S.BookDetail>
            </S.InfoBox>

            <S.ButtonGroup>
                <S.EditButton onClick={() => router.push(`/books/${book.id}/modify`)}>수정</S.EditButton>
                <S.DeleteButton onClick={handleDelete}>삭제</S.DeleteButton>
                <S.BackButton onClick={() => router.push(`/`)}>이전으로</S.BackButton>
            </S.ButtonGroup>
        </S.Container>
    )
}