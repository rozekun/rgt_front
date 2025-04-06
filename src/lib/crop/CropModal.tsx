'use client'

import {useState} from 'react'
import Cropper from 'react-easy-crop'
import getCroppedImg from '@/lib/crop/cropImage'
import styled from 'styled-components'
import type {Area} from 'react-easy-crop'

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
`

const Modal = styled.div`
    background: white;
    padding: 2rem;
    border-radius: 12px;
    max-width: 90vw;
    max-height: 90vh;
`

export default function CropModal({imageSrc, cropCompleteAction, closeAction}: {
    imageSrc: string,
    cropCompleteAction: (cropped: Blob) => void,
    closeAction: () => void
}) {
    const [crop, setCrop] = useState({x: 0, y: 0})
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)

    const handleCropDone = async () => {
        const cropped = await getCroppedImg(imageSrc, croppedAreaPixels!)
        cropCompleteAction(cropped)
    }

    return (
        <Overlay>
            <Modal>
                <div style={{position: 'relative', width: 300, height: 400}}>
                    <Cropper
                        image={imageSrc}
                        crop={crop}
                        zoom={zoom}
                        aspect={144 / 208}
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onCropComplete={(_, pixels) => setCroppedAreaPixels(pixels)}
                    />
                </div>
                <div style={{marginTop: '1rem', display: 'flex', gap: '1rem'}}>
                    <button onClick={handleCropDone}>자르기</button>
                    <button onClick={closeAction}>취소</button>
                </div>
            </Modal>
        </Overlay>
    )
}