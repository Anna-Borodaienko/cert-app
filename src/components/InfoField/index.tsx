import { StyledString, StyledTitle } from "./InfoField.styled";

interface InfoFieldProps {
  title: string;
  info: string;
}

const InfoField: React.FC<InfoFieldProps> = ({
  title,
  info,
}: InfoFieldProps): JSX.Element => {
  return (
    <StyledString>
      <StyledTitle>{title}</StyledTitle>
      {info}
    </StyledString>
  );
};

export default InfoField;
