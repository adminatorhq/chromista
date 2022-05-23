import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ISharedFormInput } from '../_types';
import { wrapLabelAndError } from '../_wrapForm';
// import './styles.scss';

interface IFormRichText extends ISharedFormInput {
  nothingForNow?: string;
}

const modules = {
  toolbar: [
    [{ size: [] }, { font: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['link'], // 'image', 'video'
    ['clean'],
  ],
  clipboard: {
    matchVisual: false,
  },
};

export const FormRichTextArea: React.FC<IFormRichText> = (formInput): JSX.Element => {
  const {
    input: { onFocus, onBlur, ...inputProps },
    disabled,
  } = formInput;
  return wrapLabelAndError(
    <ReactQuill
      {...inputProps}
      readOnly={disabled}
      modules={modules}
      placeholder={'Write something...'}
      theme="snow"
    />,
    formInput,
  );
};
