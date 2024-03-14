import { useNavigate } from 'react-router-dom';
import AddButton from '../../components/buttons/AddButton';
import { Container, PageWrapper } from '../Pages.styled';
import { Pages } from '../../constants/pages';
import { StyledDropZone, StyledSpan } from './AddPage.styled';
import { useDropzone } from 'react-dropzone';
import { setCertificate } from '../../storage/certificates';
import ChooseButton from '../../components/buttons/ChooseButton';

const AddPage: React.FC = (): JSX.Element => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`${Pages.START}`);
  };

  const handleUpload = () => {
    console.log('Upload file');
  };

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop: async (acceptedFiles) => {
      await setCertificate(acceptedFiles[0]);
      navigate(`${Pages.CERTIFICATES}`);
    },
    noClick: true,
    maxFiles: 1,
  });

  return (
    <PageWrapper>
      <Container>
        <AddButton text={'Назад'} onClick={handleClick} />
      </Container>
      <StyledDropZone {...getRootProps()}>
        <StyledSpan>
          Перетягніть файл сертифікату сюди
          <br />
          або
        </StyledSpan>
        <input
          type="file"
          accept=".cer"
          onClick={handleUpload}
          {...getInputProps()}
        />
        <ChooseButton
          text={'Виберіть через стандартний діалог'}
          onClick={open}
        />
      </StyledDropZone>
    </PageWrapper>
  );
};

export default AddPage;
