import { ChooseButtonWrapper } from "./ChooseButton.styled";

interface ChooseButtonProps {
  text: string;
  onClick: () => void;
}

const ChooseButton: React.FC<ChooseButtonProps> = ({
  text,
  onClick,
}: ChooseButtonProps): JSX.Element => {

  return (
    <ChooseButtonWrapper onClick={onClick}>{text}</ChooseButtonWrapper>
  );
};

export default ChooseButton;
