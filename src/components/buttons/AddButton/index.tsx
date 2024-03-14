import { AddButtonWrapper } from './AddButton.styled';

interface AddButtonProps {
  text: string;
  onClick: () => void;
}

const AddButton: React.FC<AddButtonProps> = ({
  text,
  onClick,
}: AddButtonProps): JSX.Element => {
  return <AddButtonWrapper onClick={onClick}>{text}</AddButtonWrapper>;
};

export default AddButton;
