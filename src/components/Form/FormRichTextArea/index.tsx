import React from "react";
import noop from "lodash/noop";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styled from "styled-components";
import { ISharedFormInput } from "../_types";
import { wrapLabelAndError } from "../_wrapForm";

const Root = styled.div`
  .ql-editor {
    min-height: 18em;
    border: none;
    border-radius: 0;
  }

  .ql-toolbar.ql-snow {
    display: block;
    background: #f1f5fa;
    color: #595959;
    border: 1px solid #e5ebf6;
    border-radius: 0.25rem 0.25rem 0 0;
  }

  .ql-container {
    background: #fff;
    border: 1px solid #e3ebf6;
  }

  .ql-container.ql-snow {
    border: 1px solid #e5ebf6;
    border-radius: 0 0 0.25rem 0.25rem;
  }
  .ql-snow .ql-picker {
    color: #595959;
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
        placeholder="Write something..."
        theme="snow"
      />
    </Root>,
    formInput
  );
};
