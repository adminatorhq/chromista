import { StringUtils } from '@gothicgeeks/shared';
import React from 'react';
import { Field, FormSpy } from 'react-final-form';
import { OnChange } from 'react-final-form-listeners';

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

export const SLUG_VALUE = '___SLUG_VALUE';

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
                const valueToChangeTo = to === SLUG_VALUE
                  ? StringUtils.sluggify(value as string) : to;
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
/*
TODO
If the slug is not touched then update it
// Once it is not then stop
export const WhenFieldChanges: React.FC<IWhenFieldChanges> = ({ field, becomes, set, to }) => (
  <Field name={set} subscription={{ touched: true }}>
    {({ meta, input }) => (
      <FormSpy subscription={{}}>
        {() => (
          <OnChange name={field}>
            {(value: unknown) => {
              console.log(meta);
              if (!meta.touched) {
                return;
              }
              const valueToChangeTo = to === SLUG_VALUE ? sluggify(value as string) : to;
              if (becomes === undefined) {
                input.onChange(valueToChangeTo);
                return;
              }
              if (value === becomes) {
                input.onChange(valueToChangeTo);
              }
            }}
          </OnChange>
        )}
      </FormSpy>
    )}
  </Field>
);
*/
