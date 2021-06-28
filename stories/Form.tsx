import React, { useState, ReactNode, PropsWithoutRef, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

type FormProps<FormValues> = {
  /** All your form fields */
  children: ReactNode;
  asyncInitialValues?: any;
  isToBeReset?: string; // to reset on submission?
  /** Text to display in the submit button */
  submitText: string;
  /** Horizontal or vertical layout */
  layout?: "row" | "column";
  btnProps?: string;
  onSubmit: (values: FormValues) => Promise<void | OnSubmitResult>;
  // initialValues?: UseFormOptions<FormValues>["defaultValues"];
  initialValues?: any;
} & Omit<PropsWithoutRef<JSX.IntrinsicElements["form"]>, "onSubmit">;

type OnSubmitResult = {
  FORM_ERROR?: string;
  [prop: string]: any;
};

export const FORM_ERROR = "FORM_ERROR";

export function Form<FormValues extends Record<string, unknown>>({
  btnProps = "",
  children,
  submitText,
  initialValues,
  asyncInitialValues,
  onSubmit,
  isToBeReset,
  layout,
  ...props
}: FormProps<FormValues>) {
  const ctx = useForm<FormValues>({
    mode: "onChange",
    defaultValues: initialValues,
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const { isSubmitting, errors: formErrs } = ctx.formState;

  // validate values and enable/disable the submit btn
  // eslint-disable-next-line
  useEffect(() => {
    if (isSubmitting || !!Object.keys(formErrs).length) {
      setIsDisabled(true);
    } else setIsDisabled(false);
  });

  const btnFieldClasses = `${layout === "row" ? "ml-5" : ""}`;

  return (
    <FormProvider {...ctx}>
      <form
        className="form"
        onSubmit={ctx.handleSubmit(async values => {
          const result = (await onSubmit(values as FormValues)) || {};
          for (const [key, value] of Object.entries(result)) {
            if (key === FORM_ERROR) {
              setFormError(value);
            } else {
              ctx.setError(key as any, {
                type: "submit",
                message: value,
              });
            }
          }
          !!isToBeReset && ctx.reset();
        })}
        {...props}>
        {children}
        {formError && (
          <div
            className="block bg-oldLace"
            role="alert"
            style={{ color: "darkred" }}>
            {formError}
          </div>
        )}
        <div className={`formBtns ${btnFieldClasses} ${btnProps}`}>
          <button
            className={`btn animCircle ${isDisabled ? "disabled" : ""}`}
            type="submit"
            disabled={isDisabled}>
            <div>{submitText}</div>
          </button>
        </div>
      </form>
      {/* <DevTool control={ctx.control} /> */}
    </FormProvider>
  );
}

export default Form;
