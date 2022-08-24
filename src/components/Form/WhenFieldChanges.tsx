import { StringUtils } from "@hadmean/protozoa";
import React from "react";
import { Field, FormSpy } from "react-final-form";
import { OnChange } from "react-final-form-listeners";

// decorators={[calculator]}
// const calculator = createDecorator({
//   field: 'morningTea',
//   updates: {
//     afternoonTea: function(morningTea, allValues) {
//       return allValues.afternoonTea === morningTea ? undefined : allValues.afternoonTea;
//     }
//   }
// })
// import createDecorator from "final-form-calculate";
interface IWhenFieldChanges {
  field: string;
  becomes: string | undefined;
  set: string;
  to: string;
}

export const SLUG_VALUE = "___SLUG_VALUE";

// const ConditionWhenIsSet: React.FC<{ when: string }> = ({ when, children }) => (
//   <Field name={when} subscription={{ value: true }}>
//     {({ input: { value } }) => (!!value ? children : null)}
//   </Field>
// );
// const Condition = ({ when, is, children }) => (
//   <Field name={when} subscription={{ value: true }}>
//     {({ input: { value } }) => (value === is ? children : null)}
//   </Field>
// )

export function WhenFieldChanges({
  field,
  becomes,
  set,
  to,
}: IWhenFieldChanges) {
  return (
    <Field name={set} subscription={{}}>
      {({ input: { onChange } }) => (
        <FormSpy subscription={{}}>
          {() => (
            <OnChange name={field}>
              {(value: unknown) => {
                const valueToChangeTo =
                  to === SLUG_VALUE
                    ? StringUtils.sluggify(value as string)
                    : to;
                if (becomes === undefined) {
                  onChange(valueToChangeTo);
                  return;
                }
                if (value === becomes) {
                  onChange(valueToChangeTo);
                }
              }}
            </OnChange>
          )}
        </FormSpy>
      )}
    </Field>
  );
}
