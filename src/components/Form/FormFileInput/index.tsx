import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import classnames from "classnames";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import { Upload } from "react-feather";
import { ISharedFormInput } from "../_types";
import { generateClassNames, wrapLabelAndError } from "../_wrapForm";
import { ProgressBar } from "../../ProgressBar";
import { SYSTEM_COLORS, USE_ROOT_COLOR } from "../../../theme";

interface IFormFileInput extends ISharedFormInput {
  type?: "image" | "videos";
  domain: string;
}

const fileFormDatafy = (file: any) => {
  const formData = new FormData();
  const extension = file.name.split(".").pop();
  const name = `${uuidv4()}.${extension}`;

  formData.append("image", file, name);
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
  .dropify-wrapper.has-error .dropify-message .dropify-error,
  .dropify-wrapper.has-preview .dropify-clear {
    display: block;
  }

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

  .dropify-wrapper.has-error:hover .dropify-errors-container {
    visibility: visible;
    opacity: 1;
    transition-delay: 0s;
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

  .dropify-wrapper.disabled .dropify-infos-message {
    display: none;
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
    margin: 5px 0 0;
    color: #8997bd;
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

  .dropify-wrapper .dropify-action {
    right: 47px;
  }

  .dropify-wrapper .dropify-clear:hover {
    background: rgba(141, 91, 91, 0.2);
  }

  .dropify-wrapper .dropify-preview {
    display: none;
    position: absolute;
    z-index: 1;
    background-color: #fff;
    padding: 5px;
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
    text-align: center;
  }

  .dropify-wrapper .dropify-preview .dropify-render img {
    top: 50%;
    transform: translate(0, -50%);
    position: relative;
    max-width: 100%;
    max-height: 100%;
    background-color: #fff;
    transition: border-color 0.15s linear;
  }

  .dropify-wrapper .dropify-preview .dropify-render i {
    font-size: 70px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    color: #777;
  }

  .dropify-wrapper .dropify-preview .dropify-render .dropify-extension {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin-top: 10px;
    text-transform: uppercase;
    font-weight: 900;
    letter-spacing: -0.03em;
    font-size: 13px;
    width: 42px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .dropify-wrapper .dropify-preview .dropify-infos {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 3;
    background: rgba(0, 0, 0, 0.7);
    opacity: 0;
    transition: opacity 0.15s linear;
  }

  .dropify-wrapper .dropify-preview .dropify-infos .dropify-infos-inner {
    position: absolute;
    top: 50%;
    transform: translate(0, -40%);
    backface-visibility: hidden;
    width: 100%;
    padding: 0 20px;
    transition: all 0.2s ease;
  }

  .dropify-wrapper .dropify-preview .dropify-infos .dropify-infos-inner p {
    padding: 0;
    margin: 0;
    position: relative;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #fff;
    text-align: center;
    line-height: 25px;
    font-weight: 700;
  }

  .dropify-wrapper
    .dropify-preview
    .dropify-infos
    .dropify-infos-inner
    p.dropify-infos-message {
    margin-top: 15px;
    padding-top: 15px;
    font-size: 12px;
    position: relative;
    opacity: 0.5;
  }

  .dropify-wrapper
    .dropify-preview
    .dropify-infos
    .dropify-infos-inner
    p.dropify-infos-message::before {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
    background: #fff;
    width: 30px;
    height: 2px;
  }

  .dropify-wrapper:hover .dropify-clear,
  .dropify-wrapper:hover .dropify-preview .dropify-infos {
    opacity: 1;
  }

  .dropify-wrapper:hover .dropify-preview .dropify-infos .dropify-infos-inner {
    margin-top: -5px;
  }

  .dropify-wrapper .dropify-errors-container {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 3;
    background: rgba(243, 65, 65, 0.8);
    text-align: left;
    visibility: hidden;
    opacity: 0;
    transition: visibility 0s linear 0.15s, opacity 0.15s linear;
  }

  .dropify-wrapper .dropify-errors-container ul {
    padding: 10px 20px;
    margin: 0;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }

  .dropify-wrapper .dropify-errors-container ul li {
    margin-left: 20px;
    color: #fff;
    font-weight: 700;
  }

  .dropify-wrapper .dropify-errors-container.visible {
    visibility: visible;
    opacity: 1;
    transition-delay: 0s;
  }

  .dropify-wrapper ~ .dropify-errors-container ul {
    padding: 0;
    margin: 15px 0;
  }

  .dropify-wrapper ~ .dropify-errors-container ul li {
    margin-left: 20px;
    color: #f34141;
    font-weight: 700;
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

function FileInput({ input, meta, disabled, domain }: IFormFileInput) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  // const queryCache = useQueryCache();
  const { value, onChange } = input;
  const onDrop = useCallback(
    (acceptedFiles) => {
      input.onChange(null);
      acceptedFiles.forEach(async (file: any) => {
        setIsLoading(true);
        const { formData, config } = fileFormDatafy(file);
        formData.append("domain", domain);
        // const { imageUrl } = (
        //   await axios.post("image-upload", formData, {
        //     ...config,
        //     onUploadProgress: (progressEvent: {
        //       loaded: number;
        //       total: number;
        //     }) => {
        //       const percentCompleted = Math.round(
        //         (progressEvent.loaded * 100) / progressEvent.total
        //       );
        //       setProgress(percentCompleted);
        //       // After 100% label to processing file by timeout here .5seconds
        //     },
        //   })
        // ).data;
        setIsLoading(false);
        setProgress(0);
        input.onChange("imageUrl");
      });
    },
    [domain, input]
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
        <div style={{ display: isLoading ? "block" : "none" }}>
          <ProgressBar progress={progress} />
        </div>
        <div className="dropify-message">
          <span className="file-icon">
            <Upload />
            <p>Drag &apos;n&apos; drop a file here, or click to select file</p>
          </span>
          <p className="dropify-error">Ooops, something wrong appended.</p>
        </div>
        <div className="dropify-errors-container">
          <ul />
        </div>
        <input
          type="file"
          id="input-file-now"
          className="dropify"
          {...getInputProps()}
        />
        {!disabled ? (
          <button
            type="button"
            className="dropify-clear"
            onClick={(e) => {
              onChange(null);
              e.stopPropagation();
            }}
          >
            Remove
          </button>
        ) : null}

        <div
          className="dropify-preview"
          style={{ display: !value ? "none" : "block" }}
        >
          <span className="dropify-render">
            <img src={value} alt="" />
          </span>
          <div className="dropify-infos">
            <div className="dropify-infos-inner">
              <p className="dropify-infos-message">
                Drag and drop or click to replace
              </p>
            </div>
          </div>
        </div>
      </div>
    </Root>
  );
}

export const FormFileInput: React.FC<IFormFileInput> = (formInput) => {
  return wrapLabelAndError(<FileInput {...formInput} />, formInput);
};
