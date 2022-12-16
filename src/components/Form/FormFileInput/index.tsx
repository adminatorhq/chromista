import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import classnames from "classnames";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import axios, { AxiosProgressEvent } from "axios";
import { Upload } from "react-feather";
import { ISharedFormInput } from "../_types";
import { generateClassNames, wrapLabelAndError } from "../_wrapForm";
import { ProgressBar } from "../../ProgressBar";
import { SYSTEM_COLORS, USE_ROOT_COLOR } from "../../../theme";
import { DeleteButton } from "../../Button";

interface IFormFileInput extends ISharedFormInput {
  type?: "image" | "videos";
  uploadUrl: string;
  metadata?: Record<string, unknown>;
}

const fileFormDatafy = (file: any) => {
  const formData = new FormData();
  const extension = file.name.split(".").pop();
  const name = `${uuidv4()}.${extension}`;

  formData.append("file", file, name);
  return {
    formData,
    config: {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  };
};

const Root = styled.div`
  .dropify-wrapper {
    display: block;
    position: relative;
    cursor: pointer;
    overflow: hidden;
    width: 100%;
    max-width: 100%;
    height: 200px;
    padding: 5px 10px;
    font-size: 14px;
    line-height: 22px;
    color: ${USE_ROOT_COLOR("main-text")};
    background-image: none;
    text-align: center;
    transition: border-color 0.15s linear;
    background-color: ${USE_ROOT_COLOR("base-color")};
    border: 2px dashed ${USE_ROOT_COLOR("border-color")};
  }

  .dropify-wrapper:hover {
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
    background-size: 30px 30px;
  }

  .dropify-wrapper.has-error {
    border-color: ${SYSTEM_COLORS.danger};
  }

  .dropify-wrapper.disabled input {
    cursor: not-allowed;
  }

  .dropify-wrapper.disabled:hover {
    background-image: none;
    animation: none;
  }

  .dropify-wrapper.disabled .dropify-message {
    opacity: 0.5;
    text-decoration: line-through;
  }

  .dropify-wrapper input {
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
  }

  .dropify-wrapper .dropify-message {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }

  .dropify-wrapper .dropify-message span.file-icon {
    font-size: 50px;
    color: ${USE_ROOT_COLOR("primary-color")};
  }

  .dropify-wrapper .dropify-message p {
    color: ${USE_ROOT_COLOR("main-text")};
  }

  .dropify-wrapper .dropify-message p.dropify-error {
    color: #f34141;
    font-weight: 700;
    display: none;
  }

  .dropify-wrapper .dropify-clear {
    display: none;
    position: absolute;
    opacity: 0;
    z-index: 7;
    top: 10px;
    right: 10px;
    background: 0 0;
    border: 1px solid #fff;
    text-transform: uppercase;
    font-size: 11px;
    line-height: 1.5;
    padding: 4px 8px;
    border-radius: 0.2rem;
    font-weight: 700;
    color: #fff;
    transition: all 0.15s linear;
  }

  .dropify-wrapper .dropify-clear:hover {
    background: rgba(141, 91, 91, 0.2);
  }

  @keyframes stripes {
    from {
      background-position: 0 0;
    }
    to {
      background-position: 60px 30px;
    }
  }

  @keyframes rotate {
    0% {
      transform: rotateZ(-360deg);
    }
    100% {
      transform: rotateZ(0);
    }
  }
`;

function FileInput({
  input,
  meta,
  disabled,
  uploadUrl,
  metadata,
}: IFormFileInput) {
  const [progress, setProgress] = useState<number>(28);

  const { value, onChange } = input;
  const onDrop = useCallback(
    (acceptedFiles: any[]) => {
      input.onChange(null);
      acceptedFiles.forEach(async (file: any) => {
        setProgress(1);
        const { formData, config } = fileFormDatafy(file);
        if (metadata) {
          Object.entries(metadata).forEach(([key, keyValue]) => {
            formData.append(key, keyValue as string);
          });
        }
        const { fileUrl } = (
          await axios.post(uploadUrl, formData, {
            ...config,
            onUploadProgress: (progressEvent: AxiosProgressEvent) => {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / (progressEvent!.total || 1)
              );
              setProgress(percentCompleted);
              // After 100% label to processing file by timeout here .5seconds
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
    <Root>
      <div
        className={classnames({
          "dropify-wrapper touch-fallback": true,
          "has-preview": value,
          disabled,
          [generateClassNames(meta)]: true,
        })}
        {...getRootProps()}
      >
        <div style={{ display: progress > 0 ? "block" : "none" }}>
          <ProgressBar progress={progress} />
        </div>
        <div className="dropify-message">
          <span className="file-icon">
            <Upload />
            <p>
              {value
                ? "Drag and drop or click to replace"
                : "Drag and drop a file here, or click to select file"}
            </p>
          </span>

          {value && (
            <p>
              {value}d ds dsd s d{" "}
              {!disabled ? (
                <DeleteButton
                  onDelete={() => onChange(null)}
                  shouldConfirmAlert={false}
                />
              ) : null}
            </p>
          )}

          <p className="dropify-error">Ooops, something wrong appended.</p>
        </div>
        <input
          type="file"
          id="input-file-now"
          className="dropify"
          {...getInputProps()}
        />
      </div>
    </Root>
  );
}

export const FormFileInput: React.FC<IFormFileInput> = (formInput) => {
  return wrapLabelAndError(<FileInput {...formInput} />, formInput);
};
