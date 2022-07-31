import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import classnames from "classnames";
import { v4 as uuidv4 } from "uuid";
import { makePostRequest } from "@gothicgeeks/shared";
import noop from "lodash/noop";
import { ISharedFormInput } from "../_types";
import { generateClassNames, wrapLabelAndError } from "../_wrapForm";
import { ProgressBar } from "../../ProgressBar";
// import './styles.scss';

interface IFormFileInput extends ISharedFormInput {
  type?: "image" | "videos";
  domain: "categories" | "products";
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

function FileInput({ input, meta, disabled, domain }: IFormFileInput) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  // const queryCache = useQueryCache();
  const { value, onChange } = input;
  const onDrop = useCallback(
    (acceptedFiles: any[]) => {
      input.onChange(null);
      acceptedFiles.forEach(async (file: any) => {
        setIsLoading(true);
        const { formData, config } = fileFormDatafy(file);
        noop(config);
        formData.append("domain", domain);
        const { imageUrl } = (
          await makePostRequest("image-upload", formData, {
            // ...config,
            // onUploadProgress: (progressEvent: {
            //   loaded: number;
            //   total: number;
            // }) => {
            //   const percentCompleted = Math.round(
            //     (progressEvent.loaded * 100) / progressEvent.total
            //   );
            //   setProgress(percentCompleted);
            //   // After 100% label to processing file by timeout here .5seconds
            // },
          })
        ).data;
        setIsLoading(false);
        setProgress(0);
        // queryCache.invalidateQueries(STORE_PLAN_AGGREGATES_QUERY_CACHE_KEY);
        input.onChange(imageUrl);
      });
    },
    [domain, input]
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: { image: ["jpeg", "png"] },
    disabled,
    // maxSize,
  });

  return (
    <div
      className={classnames({
        "dropify-wrapper": true,
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
  );
}

export const FormFileInput: React.FC<IFormFileInput> = (formInput) =>
  wrapLabelAndError(<FileInput {...formInput} />, formInput);
