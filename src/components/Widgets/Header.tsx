import React from "react";
import { Stack, Text } from "../../ui-blocks";
import { DeleteButton, SoftButton } from "../Button";
import { IWidgetHeaderProps } from "./types";

export function WidgetHeader({ title, setting, link }: IWidgetHeaderProps) {
  return (
    <Stack justify="space-between" align="flex-start">
      <Text size="4">{title}</Text>
      <Stack width="auto">
        {setting && (
          <>
            <SoftButton action={() => setting.setId()} icon="edit" size="xs" />
            <DeleteButton
              onDelete={() => setting.delete()}
              size="xs"
              isMakingDeleteRequest={false}
              shouldConfirmAlert
            />
          </>
        )}
        {link ? <SoftButton action={link} label="View" size="xs" /> : null}
      </Stack>
    </Stack>
  );
}
