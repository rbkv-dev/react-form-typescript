import { Field, ErrorMessage, FieldProps } from "formik";
import { StyledInputWrapper,StyledTextArea } from "./styled";

type CustomTextAreaProps = {
  name: string
};

export const CustomTextArea = ({name="name"}: CustomTextAreaProps) => {
  return (
    <StyledInputWrapper>
      <label htmlFor={name}>{name && (name[0].toUpperCase() + name.slice(1)).replace("_", " ")}</label>
      <Field id={name} name={name}>
        {({ field }: FieldProps) => (<StyledTextArea id={name} {...field} />)}
      </Field>
      <span className="error-msg"><ErrorMessage name={name} /></span>
    </StyledInputWrapper>
  )
}
