'use client'

import styled from 'styled-components'


export const Container = styled.div`
    margin: auto;
    padding: 4rem 1.6rem 2rem 1.6rem;
    max-width: var(--layout-w);
`

export const Title = styled.h1`
    font-size: 2rem;
    margin-bottom: 1rem;

    a {
        color: inherit;
        text-decoration: none;
    }
`

export const BookWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
`

export const BookContainer = styled.div`
    display: flex;
    border: 1px solid var(--border-02);
    border-radius: 8px;
    padding: 1rem;
    gap: 1.6rem;
`

export const BookImage = styled.img`
    width: 144px;
    height: 208px;
    object-fit: cover;
    border: 1px solid var(--border-01);
    flex-shrink: 0;
`

export const BookDetailContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 0.5rem;

    p {
        display: -webkit-box;
        -webkit-line-clamp: 2; /* ✅ 줄 수 제한 */
        -webkit-box-orient: vertical;
        overflow: hidden;
        line-height: 1.5;
    }
`


export const BookTitle = styled.h2`
    font-size: 1.2rem;
    margin-top: 0.5rem;
    font-weight: bold;
`





export const PaginationWrapper = styled.div`
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 2rem;
`

export const PageLink = styled.div<{ $active?: boolean }>`
    padding: 0.5rem 0.9rem;
    border-radius: 6px;
    border: 1px solid #ccc;
    background-color: ${({$active}) => ($active ? '#0070f3' : '#fff')};
    color: ${({$active}) => ($active ? '#fff' : '#333')};
    cursor: pointer;
    font-weight: ${({$active}) => ($active ? 'bold' : 'normal')};
    transition: all 0.2s;
    text-align: center;
    min-width: 36px;

    &:hover {
        background-color: #0070f3;
        color: white;
        border-color: #0070f3;
    }
`

export const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`

export const SearchBox = styled.div`
  display: flex;
  gap: 0.5rem;

  select, input {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 1rem;
  }

  button {
    padding: 0.5rem 1rem;
    background-color: #0070f3;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;

    &:hover {
      background-color: #005ac1;
    }
  }
`

export const NewBookButton = styled.button`
  background-color: #4f46e5;
  color: white;
  padding: 0.8rem 1.6rem;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #4338ca;
  }
`
export const PageNavButton = styled.button`
    background: none;
    border: none;
    margin: 0 0.5rem;
    font-size: 1rem;
    cursor: pointer;
    color: #0070f3;

    &:hover {
        text-decoration: underline;
    }
`