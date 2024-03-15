import { useEffect, useState } from 'react';
import CertificatesList from '../../components/CertificatesList';
import UploadButton from '../../components/buttons/UploadButton';
import { setCertificate } from '../../storage/certificates';
import { getCertificatesList } from '../../storage/certificatesList';
import { Container, PageWrapper } from '../Pages.styled';
import CertificateCard from '../../components/CertificateCard';
import { useNavigate } from 'react-router-dom';
import { Pages } from '../../constants/pages';
import { restoreCertificate } from '../../utils/restoreCertificate';

const defaultCertificateInfo = {
  subjectCommonName: '',
  issuerCommonName: '',
  startValidity: '',
  endValidity: '',
};

const CertificatesPage: React.FC = (): JSX.Element => {
  const [certificatesList, setCertificatesList] = useState<string[]>(() =>
    getCertificatesList()
  );
  const [selectedCertificate, setSelectedCertificate] = useState('');

  const navigate = useNavigate();

  const handleClick = async (
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const files = event.target.files;
    const file = files && files.length > 0 ? files[0] : null;
    if (file && !certificatesList.includes(file.name)) {
      await setCertificate(file);
      setCertificatesList([...certificatesList, file.name]);
      setSelectedCertificate(file.name);
    }
  };

  useEffect(() => {
    const certificatesList = getCertificatesList();
    const lastAddedCertificate = certificatesList.at(-1);

    if (certificatesList.length > 0 && lastAddedCertificate) {
      setSelectedCertificate(lastAddedCertificate);
    } else {
      navigate(`${Pages.START}`);
    }
  }, []);

  const changeSelectedCertificate = (fileName: string): void => {
    setSelectedCertificate(fileName);
  };

  const { subjectCommonName, issuerCommonName, startValidity, endValidity } =
    selectedCertificate
      ? restoreCertificate(selectedCertificate)
      : defaultCertificateInfo;

  return (
    <PageWrapper>
      <Container>
        <UploadButton text={'Додати'} handleClick={handleClick} />
        <CertificatesList
          certificatesList={certificatesList}
          selectedCertificateName={selectedCertificate}
          onClick={changeSelectedCertificate}
        />
      </Container>
      <Container>
        {selectedCertificate && (
          <CertificateCard
            subjectCommonName={subjectCommonName}
            issuerCommonName={issuerCommonName}
            startValidity={startValidity}
            endValidity={endValidity}
          />
        )}
      </Container>
    </PageWrapper>
  );
};

export default CertificatesPage;
