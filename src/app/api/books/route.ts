export const GET = async () => {

    const mockBooks = [
        {
            id: 1,
            title: '타입스크립트 완전 정복',
            description: '타입스크립트를 깊게 이해하고 싶은 사람을 위한 책입니다.',
            image: 'https://via.placeholder.com/150',
            author: '김개발',
            createdAt: '2024-03-15',
            stock: 12,
        },
        {
            id: 2,
            title: 'NestJS 입문',
            description: '백엔드를 효율적으로 개발할 수 있는 NestJS의 입문서입니다.',
            image: 'https://via.placeholder.com/150',
            author: '박백엔드',
            createdAt: '2024-02-01',
            stock: 5,
        },
        {
            id: 3,
            title: 'Next.js로 시작하는 프론트엔드',
            description: 'Next.js의 SSR과 CSR 개념을 한 번에 정리할 수 있는 실전 입문서입니다.',
            image: 'https://via.placeholder.com/150',
            author: '이프론트',
            createdAt: '2024-01-20',
            stock: 8,
        },
        {
            id: 4,
            title: '리액트 훅 완전 분석',
            description: 'React의 useState, useEffect, useCallback 등을 철저히 분석합니다.',
            image: 'https://via.placeholder.com/150',
            author: '정리액트',
            createdAt: '2024-03-01',
            stock: 7,
        },
        {
            id: 5,
            title: '클린 아키텍처',
            description: '소프트웨어 아키텍처 설계 원칙과 유지보수성 향상에 대해 배웁니다.',
            image: 'https://via.placeholder.com/150',
            author: '로버트 마틴',
            createdAt: '2023-12-10',
            stock: 3,
        },
        {
            id: 6,
            title: 'JavaScript 깊이 파기',
            description: '클로저, this, 프로토타입 등 JS의 핵심 개념을 깊게 파헤칩니다.',
            image: 'https://via.placeholder.com/150',
            author: '한자바',
            createdAt: '2024-04-01',
            stock: 9,
        },
        {
            id: 7,
            title: 'React Query로 상태 관리하기',
            description: '비동기 상태 관리의 새로운 패러다임, React Query를 마스터하세요.',
            image: 'https://via.placeholder.com/150',
            author: '김상태',
            createdAt: '2024-02-22',
            stock: 6,
        },
        {
            id: 8,
            title: '디자인 시스템 가이드북',
            description: 'UI 디자인과 컴포넌트 라이브러리를 일관성 있게 만드는 방법을 알려줍니다.',
            image: 'https://via.placeholder.com/150',
            author: '유아이',
            createdAt: '2024-01-30',
            stock: 4,
        },
        {
            id: 9,
            title: 'CS 전공지식 한권으로 끝내기',
            description: '네트워크, 운영체제, 자료구조 등 개발자 필수 CS 지식을 정리합니다.',
            image: 'https://via.placeholder.com/150',
            author: '컴싸대생',
            createdAt: '2023-11-05',
            stock: 10,
        },
        {
            id: 10,
            title: '코딩 인터뷰 완전 분석',
            description: '대기업 코딩 인터뷰를 위한 알고리즘/자료구조 마스터북.',
            image: 'https://via.placeholder.com/150',
            author: '게일 맥도웰',
            createdAt: '2023-10-12',
            stock: 15,
        },
    ]

    return Response.json(mockBooks)
}

export async function POST(req: Request) {
    // POST 요청 처리
    const body = await req.json()
    return Response.json({ message: 'POST 요청', body })
}