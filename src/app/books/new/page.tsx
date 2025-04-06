'use client'

import {useState} from 'react'
import * as S from '@/app/books/new/newBooks.style'
import CropModal from '@/lib/crop/CropModal'
import {useRouter} from "next/navigation"

export default function NewBookPage() {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [description, setDescription] = useState('')
    const [stock, setStock] = useState(1)

    const [imageFile, setImageFile] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState<string>('')
    const [imageSrc, setImageSrc] = useState<string>('') // 크롭 전 원본
    const [cropOpen, setCropOpen] = useState(false)

    const router = useRouter()

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

    const handleCropped = (croppedBlob: Blob) => {
        const previewUrl = URL.createObjectURL(croppedBlob)
        setImagePreview(previewUrl)
        setImageFile(new File([croppedBlob], 'cropped.jpg', {type: 'image/jpeg'}))
        setCropOpen(false)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!imageFile) {
            alert("이미지를 업로드해주세요.")
            return
        }
        const formData = new FormData()
        formData.append('title', title)
        formData.append('author', author)
        formData.append('description', description)
        formData.append('stock', String(stock))
        formData.append('image', imageFile)

        const res = await fetch('http://localhost:3001/books', {
            method: 'POST',
            body: formData,
        })
        console.log(res)
        if (!res.ok) {
            alert(`책 등록에 실패했습니다. ${res.status} ${res.statusText}`)
            return
        }
        if (res.ok) router.push('/')
    }

    return (
        <>
            {cropOpen &&
                <CropModal imageSrc={imageSrc} cropCompleteAction={handleCropped} closeAction={() => setCropOpen(false)}/>}

            <S.Form onSubmit={handleSubmit}>
                <h1>📖 새 책 등록하기</h1>
                <label>제목<input value={title} onChange={e => setTitle(e.target.value)} required/></label>
                <label>저자<input value={author} onChange={e => setAuthor(e.target.value)} required/></label>
                <label>설명<textarea value={description} onChange={e => setDescription(e.target.value)} required/></label>

                <S.ImageUploadBox>
                    <input type="file" accept="image/*" onChange={handleFileChange} />
                    {imagePreview ? (
                        <S.PreviewImage src={imagePreview}/>
                    ) : (
                        <span>이미지 업로드<br/>클릭하세요</span>
                    )}
                </S.ImageUploadBox>

                <label>수량<input type="number" value={stock} min={1}
                                onChange={e => setStock(Number(e.target.value))}/></label>
                <S.SubmitButton type="submit">등록하기</S.SubmitButton>
            </S.Form>
        </>
    )
}