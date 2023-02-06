import React from "react";
import { Stack, Text } from "../../ui-blocks";
import { DeleteButton, SoftButton } from "../Button";
import { IWidgetHeaderProps } from "./types";

export function WidgetHeader({ title, setting, link }: IWidgetHeaderProps) {
  return (
    <Stack justify="space-between" align="flex-start">
      <Text size="4" ellipsis>
        {title}
      </Text>
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
