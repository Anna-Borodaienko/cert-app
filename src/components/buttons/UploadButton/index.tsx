import { useRef } from 'react';
import { StyledInput, UploadButtonWrapper } from './UploadButton.styled';

interface UploadButtonProps {
  text: string;
  handleClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const UploadButton: React.FC<UploadButtonProps> = ({
  text,
  handleClick,
}: UploadButtonProps): JSX.Element => {
  const filePicker = useRef<HTMLInputElement | null>(null);

  const handlePick = () => {
    if (filePicker.current) {
      filePicker.current.click();
    }
  };

  return (
    <>
      <UploadButtonWrapper onClick={handlePick}>{text}</UploadButtonWrapper>
      <StyledInput
        onChange={handleClick}
        type="file"
        accept=".cer"
        ref={filePicker}
      />
    </>
  );
};

export default UploadButton;
