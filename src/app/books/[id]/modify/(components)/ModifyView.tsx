'use client'
import {useEffect, useState} from 'react'
import {useRouter} from 'next/navigation'
import * as S from '@/app/books/[id]/modify/(components)/ModifyView.style'
import CropModal from "@/lib/crop/CropModal";
import {Book} from "@/app/(root)/book.type";

export default function ModifyView({book_id}: { book_id: string }) {
    const [book, setBook] = useState<Book | null>(null)
    const [imagePreview, setImagePreview] = useState('')
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [imageSrc, setImageSrc] = useState('')
    const [cropOpen, setCropOpen] = useState(false)

    const router = useRouter()

    useEffect(() => {
        const fetchBook = async () => {
            const res = await fetch(`http://localhost:3001/books/${book_id}`)
            const data : Book = await res.json()
            setBook(data)
            setImagePreview(`http://localhost:3001${data.image}`) // 기본 이미지 넣기
        }
        fetchBook()
    }, [book_id])

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = () => {
                setImageSrc(reader.result as string)
                setCropOpen(true)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleCropped = (blob: Blob) => {
        const preview = URL.createObjectURL(blob)
        setImagePreview(preview)
        setImageFile(new File([blob], 'cropped.jpg', {type: 'image/jpeg'}))
        setCropOpen(false)
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        console.log('handleSubmit')
        if (!book) return
        console.log('book', book)

        const formData = new FormData(e.target as HTMLFormElement)
        formData.set('title', formData.get('title') as string)
        formData.set('author', formData.get('author') as string)
        formData.set('description', formData.get('description') as string)
        formData.set('stock', formData.get('stock') as string)

        if (imageFile) formData.set('image', imageFile)

        const res = await fetch(`http://localhost:3001/books/${book_id}`, {
            method: 'PUT',
            body: formData,
        })

        if (res.ok) {
            alert('수정 완료!')
            router.push(`/books/${book_id}`)
        } else {
            alert('수정 실패!')
        }
    }

    if (!book) return <p>로딩 중...</p>

    return (
        <>
            {cropOpen && (
                <CropModal
                    imageSrc={imageSrc}
                    cropCompleteAction={handleCropped}
                    closeAction={() => setCropOpen(false)}
                />
            )}

            <S.Form onSubmit={handleSubmit}>
                <h1>📘 책 정보 수정</h1>
                <label>제목<input name="title" defaultValue={book.title} required/></label>
                <label>저자<input name="author" defaultValue={book.author} required/></label>
                <label>설명<textarea name="description" defaultValue={book.description} required/></label>

                <S.ImageUploadBox>
                    <input type="file" accept="image/*" onChange={handleFileChange} hidden/>
                    {imagePreview ? (
                        <S.PreviewImage src={imagePreview}/>
                    ) : (
                        <span>이미지 업로드<br/>클릭</span>
                    )}
                </S.ImageUploadBox>

                <label>수량<input type="number" name="stock" defaultValue={book.stock} min={1} required/></label>
                <S.SubmitButton type="submit">수정하기</S.SubmitButton>
                <S.BackButton type="button" onClick={() => router.push(`/books/${book_id}`)}>← 이전으로</S.BackButton>
            </S.Form>
        </>
    )
}