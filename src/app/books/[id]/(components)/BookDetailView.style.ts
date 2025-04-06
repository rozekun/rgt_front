'use client'

import styled from 'styled-components'

export const Container = styled.div`
  max-width: 800px;
  margin: 4rem auto;
  padding: 2rem;
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #eee;
`


export const BookDetail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  font-size: 1rem;

  p {
    margin: 0;
    line-height: 1.5;
    color: #444;
  }

  strong {
    display: inline-block;
    width: 80px;
    color: #222;
  }
`
export const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
  text-align: center;
  color: #333;
`

export const InfoBox = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`

export const BookImage = styled.img`
  width: 200px;
  height: 300px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #ccc;
`


export const ButtonGroup = styled.div`
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
  justify-content: center;
`

export const ActionButton = styled.button`
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  border: none;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
  color: white;

  &:hover {
    opacity: 0.9;
  }
`

export const EditButton = styled(ActionButton)`
  background-color: #0070f3;
`

export const DeleteButton = styled(ActionButton)`
  background-color: #e63946;
`

export const BackButton = styled(ActionButton)`
  background-color: #6c757d;
`