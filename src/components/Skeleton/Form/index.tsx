import React, { Fragment } from "react";
import SkeletonLoader from "tiny-skeleton-loader-react";
import { Stack } from "../../../ui-blocks";
import { sharedSkeletonProps } from "../constants";

export enum FormSkeletonSchema {
  Textarea = "83px",
  Input = "38px",
  RichTextArea = "277px",
}

export interface IProps {
  schema: FormSkeletonSchema[];
}

export function FormSkeleton({ schema }: IProps) {
  return (
    <div style={{ paddingTop: "8px" }}>
      {Array.from({ length: schema.length }, (_, k) => k).map((key) => (
        <Fragment key={key}>
          <SkeletonLoader
            background={sharedSkeletonProps.background}
            height="1em"
            width="50px"
            style={{ marginBottom: "5px" }}
          />
          <SkeletonLoader
            background={sharedSkeletonProps.background}
            height={schema[key]}
            style={{ marginBottom: "24px" }}
          />
        </Fragment>
      ))}
      <Stack justify="end">
        <SkeletonLoader
          background={sharedSkeletonProps.background}
          height="3em"
          width="70px"
          style={{ marginBottom: "3px", marginTop: "-8px" }}
        />
      </Stack>
    </div>
  );
}
