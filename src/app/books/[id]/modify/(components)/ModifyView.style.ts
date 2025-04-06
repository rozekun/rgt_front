// app/books/[id]/modify/ModifyView.style.ts
import styled from 'styled-components'

export const Form = styled.form`
    max-width: 600px;
    margin: 4rem auto;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;

    h1 {
        font-size: 1.8rem;
        margin-bottom: 1rem;
    }

    label {
        display: flex;
        flex-direction: column;
        font-weight: bold;
        font-size: 1rem;
        gap: 0.4rem;

        input,
        textarea {
            padding: 0.6rem;
            border: 1px solid var(--border-01);
            border-radius: 6px;
            font-size: 1rem;
        }

        textarea {
            resize: vertical;
            min-height: 120px;
        }
    }
`

export const ImageUploadBox = styled.label`
    width: 144px;
    height: 208px;
    border: 1px dashed var(--border-01);
    border-radius: 8px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f9fafb;

    input[type="file"] {
        display: none;
    }

    span {
        font-size: 0.9rem;
        color: #6b7280;
        text-align: center;
        padding: 0.5rem;
    }
`


export const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export const SubmitButton = styled.button`
    background-color: #0070f3;
    color: white;
    border: none;
    padding: 0.8rem 1.2rem;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.2s ease;

    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        background-color: #005ac1;
    }
`

export const BackButton = styled.button`
    background: #aaa;
    color: white;
    padding: 0.8rem 1.2rem;
    border: none;
    font-size: 1rem;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        background: #888;
    }
`