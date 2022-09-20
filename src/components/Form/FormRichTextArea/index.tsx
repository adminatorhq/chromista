import React from "react";
import noop from "lodash/noop";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styled from "styled-components";
import { ISharedFormInput } from "../_types";
import { wrapLabelAndError } from "../_wrapForm";
import { USE_ROOT_COLOR } from "../../../AppWrapper/colors";

const Root = styled.div`
  .ql-editor {
    min-height: 18em;
    border: none;
    border-radius: 0;
  }

  .ql-toolbar.ql-snow {
    display: block;
    background: ${USE_ROOT_COLOR("soft-color")};
    color: ${USE_ROOT_COLOR("main-text")};
    border: 1px solid ${USE_ROOT_COLOR("border-color")};
    border-radius: 0.25rem 0.25rem 0 0;
  }

  .ql-container {
    background: ${USE_ROOT_COLOR("base-color")};
    border: 1px solid ${USE_ROOT_COLOR("border-color")};
  }

  .ql-container.ql-snow {
    border: 1px solid ${USE_ROOT_COLOR("border-color")};
    border-radius: 0 0 0.25rem 0.25rem;
  }
  .ql-snow .ql-picker {
    color: ${USE_ROOT_COLOR("main-text")};
  }
`;

interface IFormRichText extends ISharedFormInput {
  nothingForNow?: string;
}

const modules = {
  toolbar: [
    [{ size: [] }, { font: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link"], // 'image', 'video'
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
};

export const FormRichTextArea: React.FC<IFormRichText> = (formInput) => {
  const {
    input: { onFocus, onBlur, ...inputProps },
    disabled,
  } = formInput;
  noop(onBlur, onFocus);
  return wrapLabelAndError(
    <Root>
      <ReactQuill
        {...inputProps}
        readOnly={disabled}
        modules={modules}
        id={formInput.input.name}
        placeholder="Write something..."
        theme="snow"
      />
    </Root>,
    formInput
  );
};
