/* eslint-disable react/function-component-definition */
import React from "react";
import { Story } from "@storybook/react";
import { Field, Form } from "react-final-form";
import { action } from "@storybook/addon-actions";
import { AppWrapper } from "../../AppWrapper";
import { FormCheckBox } from "./FormCheckBox";
import { FormInput } from "./FormInput";
import { FormNumberInput } from "./FormNumberInput";
import { FormRichTextArea } from "./FormRichTextArea";
import { FormButton } from "../Button/FormButton";
import { FormDateInput } from "./FormDateInput";
import { FormTextArea } from "./FormTextArea";
import { FormMultiSelect, FormSelect } from "./FormSelect";
import { FormCodeEditor } from "./FormCodeEditor";
import { AsyncFormSelect } from "./FormSelect/Async";
import { FormSwitch } from "./FormSwitch";
import { DeleteButton } from "../Button";

function DemoForm() {
  return (
    <Form
      onSubmit={(values: unknown) => action(values as string)}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Field name="checkbox" validateFields={[]}>
            {(renderProps) => (
              <FormCheckBox label="Example Checkbox Input" {...renderProps} />
            )}
          </Field>

          <Field name="switch" validateFields={[]}>
            {(renderProps) => (
              <FormSwitch
                name="switch"
                value={renderProps.input.value}
                onChange={renderProps.input.onChange}
                label="Example Form Switch Input"
                {...renderProps}
              />
            )}
          </Field>

          <Field name="exampleText" validateFields={[]}>
            {(renderProps) => (
              <FormInput label="Example Text Input" {...renderProps} />
            )}
          </Field>

          <Field name="requiredText" validateFields={[]}>
            {(renderProps) => (
              <FormInput
                label="Required Text Input"
                required
                {...renderProps}
              />
            )}
          </Field>

          <Field name="descriptionText" validateFields={[]}>
            {(renderProps) => (
              <FormInput
                description="Some Description here"
                label="With description"
                {...renderProps}
              />
            )}
          </Field>

          <Field name="rightActionInput" validateFields={[]}>
            {(renderProps) => (
              <FormInput
                rightActions={[
                  {
                    label: "Please click me",
                    action: action("right click actions"),
                  },
                ]}
                label="With right action"
                {...renderProps}
              />
            )}
          </Field>

          <Field name="rightMultipleActionInput" validateFields={[]}>
            {(renderProps) => (
              <FormInput
                rightActions={[
                  {
                    label: "Please click me",
                    action: action("right click actions"),
                  },
                  {
                    label: "Please click me 2",
                    action: action("right click actions"),
                  },
                ]}
                label="With multiple right action"
                {...renderProps}
              />
            )}
          </Field>

          <Field name="baseSelect" validateFields={[]}>
            {(renderProps) => (
              <FormSelect
                selectData={[
                  { label: "Foo", value: "foo" },
                  { label: "Bar", value: "bar" },
                ]}
                label="Example Select Input"
                {...renderProps}
              />
            )}
          </Field>

          <Field name="asyncSelect" validateFields={[]}>
            {(renderProps) => (
              <AsyncFormSelect
                url="http://localhost:3000/roles"
                label="Async Select Input"
                limit={2}
                {...renderProps}
              />
            )}
          </Field>

          <Field name="foo7" validateFields={[]}>
            {(renderProps) => (
              <FormMultiSelect
                selectData={[
                  { label: "Foo", value: "foo" },
                  { label: "Bar", value: "bar" },
                  { label: "Baz", value: "baz" },
                  { label: "Noop", value: "noop" },
                  { label: "Dupe", value: "dupe" },
                ]}
                values={renderProps.input.value || ["foo", "bar"]}
                onChange={renderProps.input.onChange}
              />
            )}
          </Field>

          <Field name="dateInput" validateFields={[]}>
            {(renderProps) => (
              <FormDateInput label="Example Date Input" {...renderProps} />
            )}
          </Field>

          <Field name="numberInput" validateFields={[]}>
            {(renderProps) => (
              <FormNumberInput label="Example Number Input" {...renderProps} />
            )}
          </Field>

          <Field name="textArea" validateFields={[]}>
            {(renderProps) => (
              <FormTextArea label="Example Text Area Input" {...renderProps} />
            )}
          </Field>

          <Field name="richText" validateFields={[]}>
            {(renderProps) => (
              <FormRichTextArea label="Example Rich Text" {...renderProps} />
            )}
          </Field>

          <Field name="code" validateFields={[]}>
            {(renderProps) => (
              <FormCodeEditor
                language="javascript"
                label="Javascript"
                {...renderProps}
              />
            )}
          </Field>
          <DeleteButton
            onDelete={action("")}
            isMakingDeleteRequest={false}
            text="Me"
          />
          <FormButton text="Do Something" isMakingRequest={false} />
        </form>
      )}
    />
  );
}

export default {
  title: "Components/Form",
  component: DemoForm,
  args: {},
};

const Template: Story<{}> = (args) => (
  <AppWrapper>
    <DemoForm {...args} />
  </AppWrapper>
);

export const Default = Template.bind({});
Default.args = {};
