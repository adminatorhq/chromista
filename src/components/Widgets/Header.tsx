import React from "react";
import { Stack, Typo } from "../../ui-blocks";
import { DeleteButton, SoftButton } from "../Button";
import { IWidgetHeaderProps } from "./types";

export function WidgetHeader({ title, setting, link }: IWidgetHeaderProps) {
  return (
    <Stack justify="space-between" align="flex-start">
      <Typo.MD ellipsis>{title}</Typo.MD>
      <Stack width="auto">
        {setting && (
          <>
            <SoftButton
              action={() => setting.setId()}
              icon="edit"
              label="Edit Widget"
              justIcon
            />
            <DeleteButton
              onDelete={() => setting.delete()}
              isMakingDeleteRequest={false}
              shouldConfirmAlert
            />
          </>
        )}
        {link ? (
          <SoftButton action={link} label="View" icon="right" justIcon />
        ) : null}
      </Stack>
    </Stack>
  );
}
