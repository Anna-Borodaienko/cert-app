import { useNavigate } from 'react-router-dom';
import AddButton from '../../components/buttons/AddButton';
import { PageWrapper, Container } from '../Pages.styled';
import { StyledSpan } from './StartPage.styled';
import { Pages } from '../../constants/pages';
import { getCertificatesList } from '../../storage/certificatesList';
import { useEffect } from 'react';

const StartPage: React.FC = (): JSX.Element => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`${Pages.ADD}`);
  };

  useEffect(() => {
    const certificatesInStorage = getCertificatesList();
    if (certificatesInStorage.length > 0) navigate(`${Pages.CERTIFICATES}`)
  }, []);
  

  return (
    <PageWrapper>
      <Container>
        <AddButton text="Додати" onClick={handleClick} />
        <StyledSpan>Нема жодного сертифікату</StyledSpan>
      </Container>
      <Container />
    </PageWrapper>
  );
};

export default StartPage;
