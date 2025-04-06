'use client'

import {use, useEffect, useState} from 'react'
import {Book} from '@/app/(root)/book.type'
import * as S from '@/app/(root)/root.style'
import Link from 'next/link'
import {useRouter} from 'next/navigation'

export interface PaginatedBooks {
    books: Book[]
    page: number
    total: number
    totalPages: number
}

export default function Home({
                                 searchParams,
                             }: {
    searchParams: Promise<{ page?: string; keyword?: string; category?: string }>
}) {
    const [pagination, setPagination] = useState<PaginatedBooks>({
        books: [],
        page: 1,
        total: 0,
        totalPages: 0,
    })

    const router = useRouter()
    const {page, keyword, category} = use(searchParams)
    const numberPage = Number(page ?? '1')
    const limit = 10

    const [searchField, setSearchField] = useState<'title' | 'author'>(
        (category === 'title' || category === 'author' ? category : 'title')
    )
    const [searchValue, setSearchValue] = useState(keyword ?? '')

    useEffect(() => {
        const query: Record<string, string> = {page: String(numberPage), limit: String(limit)}
        query['category'] = searchField
        query['keyword'] = searchValue

        const queryString = Object.entries(query)
            .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
            .join('&')
        console.log('queryString', queryString)

        fetch(`http://localhost:3001/books?${queryString}`)
            .then(res => res.json())
            .then((data: PaginatedBooks) => {
                setPagination(data)
            })
    }, [numberPage, keyword, category])

    const handleSearch = () => {
        if (!searchValue.trim()) {
            router.push(`/`)
            return
        }
        const query: Record<string, string> = {
            ['keyword']: searchValue.trim(),
            ['category']: searchField,
            page: '1', // 검색 시에는 항상 1페이지부터
        }

        const queryString = Object.entries(query)
            .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
            .join('&')

        router.push(`/?${queryString}`)
    }

    return (
        <S.Container>
            <S.Title><a href={'/'}>📚 책 목록</a></S.Title>
            <S.TopBar>
                <S.SearchBox>
                    <select
                        value={searchField}
                        onChange={e => {
                            const value = e.target.value
                            if (value === 'title' || value === 'author') setSearchField(value)
                        }}
                    >
                        <option value="title">제목</option>
                        <option value="author">저자</option>
                    </select>

                    <input
                        type="text"
                        placeholder={
                            searchField === 'title' ? '제목을 입력하세요' : '저자를 입력하세요'
                        }
                        value={searchValue}
                        onChange={e => setSearchValue(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSearch()
                        }}
                    />

                    <button onClick={handleSearch}>검색</button>
                </S.SearchBox>

                <S.NewBookButton onClick={() => router.push('/books/new')}>
                    📖 새 책 등록하기
                </S.NewBookButton>
            </S.TopBar>

            <S.BookWrapper>
                {pagination.books.length === 0 ? (
                    <p>검색 결과가 없습니다.</p>
                ) : (
                    pagination.books.map(book => (
                        <S.BookContainer
                            key={book.id}
                            onClick={() => router.push(`/books/${book.id}`)}
                            style={{cursor: 'pointer'}}
                        >
                            <S.BookImage loading="lazy"  src={`http://localhost:3001${book.image}`} alt={book.title}/>
                            <S.BookDetailContainer>
                                <S.BookTitle>{book.title}</S.BookTitle>
                                <p>
                                    <strong>저자:</strong> {book.author}
                                </p>
                                <p>
                                    <strong>설명:</strong> {book.description}
                                </p>
                                <p>
                                    <strong>업로드:</strong>{' '}
                                    {new Date(book.createdAt).toLocaleDateString('ko-KR')}
                                </p>
                                <p>
                                    <strong>수량:</strong> {book.stock}권
                                </p>
                            </S.BookDetailContainer>
                        </S.BookContainer>
                    )))}
            </S.BookWrapper>

            <S.PaginationWrapper>
                {/* 이전 버튼 */}
                {numberPage > 1 && (
                    <S.PageNavButton onClick={() => {
                        const query: Record<string, string> = {}
                        if (category === 'title' || category === 'author') {
                            query['category'] = category
                            query['keyword'] = keyword ?? ''
                        }
                        query.page = String(numberPage - 1)

                        const queryString = Object.entries(query)
                            .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
                            .join('&')

                        router.push(`/?${queryString}`)
                    }}>
                        이전
                    </S.PageNavButton>
                )}

                {/* 동적으로 최대 5개만 표시 */}
                {Array.from({ length: 5 }, (_, i) => {
                    // 중앙 기준으로 페이지 인덱스 설정
                    const startPage = Math.max(
                        1,
                        Math.min(
                            numberPage - 2,
                            pagination.totalPages - 4
                        )
                    )

                    const currentPage = startPage + i
                    if (currentPage > pagination.totalPages) return null

                    const query: Record<string, string> = {}
                    if (category === 'title' || category === 'author') {
                        query['category'] = category
                        query['keyword'] = keyword ?? ''
                    }
                    query.page = String(currentPage)

                    const queryString = Object.entries(query)
                        .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
                        .join('&')

                    return (
                        <Link key={currentPage} href={`/?${queryString}`} scroll={false}>
                            <S.PageLink $active={currentPage === numberPage}>
                                {currentPage}
                            </S.PageLink>
                        </Link>
                    )
                })}

                {/* 다음 버튼 */}
                {numberPage < pagination.totalPages && (
                    <S.PageNavButton onClick={() => {
                        const query: Record<string, string> = {}
                        if (category === 'title' || category === 'author') {
                            query['category'] = category
                            query['keyword'] = keyword ?? ''
                        }
                        query.page = String(numberPage + 1)

                        const queryString = Object.entries(query)
                            .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
                            .join('&')

                        router.push(`/?${queryString}`)
                    }}>
                        다음
                    </S.PageNavButton>
                )}
            </S.PaginationWrapper>
        </S.Container>
    )
}
