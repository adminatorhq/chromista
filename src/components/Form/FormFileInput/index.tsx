import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import classnames from "classnames";
import styled from "styled-components";
import axios, { AxiosProgressEvent } from "axios";
import { Upload } from "react-feather";
import { ISharedFormInput } from "../_types";
import { generateClassNames, wrapLabelAndError } from "../_wrapForm";
import { ProgressBar } from "../../ProgressBar";
import { SYSTEM_COLORS, USE_ROOT_COLOR } from "../../../theme";
import { DeleteButton } from "../../Button";
import { Text } from "../../../ui-blocks";

interface IFormFileInput extends ISharedFormInput {
  uploadUrl: string;
  metadata?: Record<string, unknown>;
  requestHeaders?: Record<string, unknown>;
}

const StyledFileInput = styled.input`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
  cursor: pointer;
  z-index: 5;
`;

const Root = styled.div`
  display: block;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  width: 100%;
  max-width: 100%;
  height: 200px;
  padding: 5px 10px;
  color: ${USE_ROOT_COLOR("main-text")};
  background-image: none;
  text-align: center;
  transition: border-color 0.15s linear;
  background-color: ${USE_ROOT_COLOR("base-color")};
  border: 2px dashed ${USE_ROOT_COLOR("border-color")};

  &:hover {
    background-size: 30px 30px;
    background-image: linear-gradient(
      -45deg,
      ${USE_ROOT_COLOR("soft-color")} 25%,
      transparent 25%,
      transparent 50%,
      ${USE_ROOT_COLOR("soft-color")} 50%,
      ${USE_ROOT_COLOR("soft-color")} 75%,
      transparent 75%,
      transparent
    );
    animation: stripes 2s linear infinite;
  }

  &.invalid {
    border-color: ${SYSTEM_COLORS.danger};
  }

  &.disabled input {
    cursor: not-allowed;
  }

  &.disabled:hover {
    background-image: none;
    animation: none;
  }

  &.disabled .dropify-message {
    opacity: 0.5;
    text-decoration: line-through;
  }

  & .dropify-message {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }

  .dropify-error {
    color: ${SYSTEM_COLORS.danger};
    font-weight: 700;
    display: none;
  }

  @keyframes stripes {
    from {
      background-position: 0 0;
    }
    to {
      background-position: 60px 30px;
    }
  }
`;

function FileInput({
  input,
  meta,
  disabled,
  uploadUrl,
  metadata,
  requestHeaders,
}: IFormFileInput) {
  const [progress, setProgress] = useState<number>(0);
  const { value, onChange } = input;

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      input.onChange(null);
      acceptedFiles.forEach(async (file) => {
        setProgress(1);

        const formData = new FormData();
        formData.append("file", file, file.name);

        if (metadata) {
          Object.entries(metadata).forEach(([key, keyValue]) => {
            formData.append(key, keyValue as string);
          });
        }

        const { fileUrl } = (
          await axios.post(uploadUrl, formData, {
            headers: {
              ...requestHeaders,
              "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (progressEvent: AxiosProgressEvent) => {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / (progressEvent!.total || 1)
              );
              setProgress(percentCompleted);
            },
          })
        ).data;
        setProgress(0);
        input.onChange(fileUrl);
      });
    },
    [uploadUrl, input, metadata]
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: { image: ["jpeg, png"] },
    disabled,
    // maxSize,
  });

  return (
    <Root
      className={classnames({
        disabled,
        [generateClassNames(meta)]: true,
      })}
      {...getRootProps()}
    >
      {progress > 0 && <ProgressBar progress={progress} />}
      <div className="dropify-message">
        <Upload size={40} color={USE_ROOT_COLOR("primary-color")} />
        <Text>
          {value
            ? "Drag and drop or click to replace"
            : "Drag and drop a file here, or click to select file"}
        </Text>

        {value && (
          <Text color="muted">
            {value}{" "}
            {!disabled ? (
              <DeleteButton
                onDelete={() => onChange(null)}
                shouldConfirmAlert={false}
              />
            ) : null}
          </Text>
        )}
        <p className="dropify-error">Ooops, something wrong happened.</p>
      </div>
      <StyledFileInput type="file" {...getInputProps()} />
    </Root>
  );
}

export const FormFileInput: React.FC<IFormFileInput> = (formInput) => {
  return wrapLabelAndError(<FileInput {...formInput} />, formInput);
};
