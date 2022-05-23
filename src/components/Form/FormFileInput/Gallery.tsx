import React, { useState } from 'react';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormFileInput } from '.';
import noop from 'lodash/noop';
import { DeleteButton } from '../DeleteButton';
import { BlockSkeleton } from '../../Skeleton/BlockSkeleton';
import { actionButtonIsMakingRequest } from '../FormButton';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import styled from 'styled-components';
import { themeContext } from '../../../styles/Global';

interface ILoadedImage {
  image: string;
  id: string;
  isDefault?: boolean;
}

interface IFormFileInputGallery {
  createImage: (image: string) => Promise<void>;
  deleteImage: (imageId: string) => Promise<void>;
  setAsDefaultImage: (imageId: string) => Promise<void>;
  isLoading: boolean;
  images: ILoadedImage[];
  isMakingDeleteRequest: boolean;
  isMakingCreateRequest: boolean;
  isMakingDefaultRequest: boolean;
}

export const FormFileInputGallery: React.FC<IFormFileInputGallery> = ({
  createImage,
  deleteImage,
  setAsDefaultImage,
  isLoading,
  images,
  isMakingDeleteRequest,
  isMakingCreateRequest,
  isMakingDefaultRequest,
}) => {
  const [currentImageId, setCurrentImageId] = useState('');
  const [lightBoxIndex, setLightBoxIndex] = useState(0);
  const [isLightBoxOpen, setIsLightBoxOpen] = useState(false);

  return (
    <div className="row">
      {isLightBoxOpen && images.length > 0 && (
        <Lightbox
          mainSrc={images[lightBoxIndex].image}
          nextSrc={images[(lightBoxIndex + 1) % images.length].image}
          prevSrc={images[(lightBoxIndex + images.length - 1) % images.length].image}
          onCloseRequest={() => setIsLightBoxOpen(false)}
          onMovePrevRequest={() =>
            setLightBoxIndex((lightBoxIndex + images.length - 1) % images.length)
          }
          onMoveNextRequest={() => setLightBoxIndex((lightBoxIndex + 1) % images.length)}
        />
      )}
      <div className="col-sm-12 col-lg-3">
        <FormFileInput
          input={{
            onChange: createImage,
            value: null,
            name: 'hello',
            onBlur: noop,
            onFocus: noop,
          }}
          meta={{}}
          domain="products"
        />
      </div>
      {isMakingCreateRequest ? (
        <div className="col-sm-12 col-lg-3">
          <BlockSkeleton height="200px" />
        </div>
      ) : null}
      {isLoading
        ? [1, 2, 3, 4, 5].map(keyIndex => (
            <div className="col-sm-12 col-lg-3" key={keyIndex}>
              <BlockSkeleton height="200px" />
            </div>
          ))
        : null}
      {images.map(({ image, id, isDefault }, index) => {
        return (
          <div className="col-sm-12 col-lg-3 position-relative" key={id}>
            {isDefault ? (
              <div className="is-default-image-check">
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  size="lg"
                  color={themeContext.colors.primary}
                />
              </div>
            ) : null}
            <div
              className="dropify-wrapper has-preview"
              style={{ height: '200px' }}
              onClick={() => {
                setLightBoxIndex(index);
                setIsLightBoxOpen(true);
              }}
            >
              {!isDefault ? (
                <button
                  type="button"
                  className="dropify-clear dropify-action"
                  onClick={e => {
                    setCurrentImageId(id);
                    setAsDefaultImage(id);
                    e.stopPropagation();
                  }}
                >
                  {actionButtonIsMakingRequest(isMakingDefaultRequest, 'Set As Default')}
                </button>
              ) : null}
              <StyledDeleteButton
                // className="dropify-clear"
                shouldConfirmAlert={false}
                onDelete={() => {
                  setCurrentImageId(id);
                  deleteImage(id);
                }}
                isMakingDeleteRequest={isMakingDeleteRequest && currentImageId === id}
              />
              <div className="dropify-preview" style={{ display: 'block' }}>
                <span className="dropify-render">
                  <img
                    src={image}
                    alt={`Product Gallery ${index}`}
                    style={{ maxHeight: '200px' }}
                  />
                </span>
                <div className="dropify-infos" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const StyledDeleteButton = styled(DeleteButton)`
  margin-left: 0.25rem;
`;

// TODO Upload multiple Product Images
