import { Field,FieldProps } from "formik";
import { StyledInputWrapper } from "./styled";

import { ReactComponent as CameraImg } from "assets/img/camera.svg";

type CustomFileInputProps = {
  name: string,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
};

export const CustomFileInput = ({name="name", onChange}: CustomFileInputProps) => {
  return (
    <StyledInputWrapper>
      <label htmlFor={name}><CameraImg /></label>
      <Field id={name} name={name}>
        {({ field }: FieldProps) => (
          <input id={name} type="file" {...field} accept="image/png, image/jpeg" onChange={onChange} />
          )}
      </Field>
    </StyledInputWrapper>
  )
}
