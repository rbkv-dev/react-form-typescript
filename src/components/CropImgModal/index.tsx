import React, { useState, useCallback } from 'react';
import { StyledModalWrapper, StyledModal, StyledHeader, StyledCropperWrapper, StyledButton } from "./styled";

import Cropper from 'react-easy-crop';
import getCroppedImg from 'helpers/cropImg'

type CropImgModalProps = {
  imageSrc: string,
  closeModal: () => void,
  setAvatarImg: React.Dispatch<React.SetStateAction<string | null>>
};

type CropperAreaType = {
  height: number,
  width: number,
  x: number,
  y: number,
}

type CropType = {
  x: number,
  y: number,
}

export const CropImgModal = ({imageSrc, closeModal, setAvatarImg} : CropImgModalProps) => {
  const [crop, setCrop] = useState<CropType>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<null | CropperAreaType>(null);

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        imageSrc,
        croppedAreaPixels as CropperAreaType,
      )
      setAvatarImg(croppedImage)
    } catch (e) {
      console.error(e)
    }
  }, [croppedAreaPixels, imageSrc, setAvatarImg]);

  return (
    <StyledModalWrapper>
      <StyledModal>
        <StyledHeader>Crop image</StyledHeader>
        <StyledCropperWrapper>
          <Cropper
            image={imageSrc}
            crop={crop}
            cropShape="round"
            zoom={zoom}
            zoomSpeed={1 / 5}
            aspect={1 / 1}
            showGrid={false}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </StyledCropperWrapper>
        <div>
          <StyledButton onClick={() => {showCroppedImage(); closeModal();}}>Save</StyledButton>
          <StyledButton onClick={closeModal}>Cancel</StyledButton>
        </div>
      </StyledModal>
    </StyledModalWrapper>
  )
}
