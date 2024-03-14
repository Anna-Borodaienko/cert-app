import InfoField from '../InfoField';
import { CertificateCardWrapper } from './CertificateCard.styled';

interface CertificateCardProps {
  subjectCommonName: string;
  issuerCommonName: string;
  startValidity: string;
  endValidity: string;
}

const CertificateCard: React.FC<CertificateCardProps> = ({
  subjectCommonName,
  issuerCommonName,
  startValidity,
  endValidity,
}: CertificateCardProps): JSX.Element => {
  return (
    <CertificateCardWrapper>
      <InfoField title={'Common Name:'} info={subjectCommonName} />
      <InfoField title={'Issuer CN:'} info={issuerCommonName} />
      <InfoField title={'Valid from:'} info={startValidity} />
      <InfoField title={'Valid to:'} info={endValidity} />
    </CertificateCardWrapper>
  );
};

export default CertificateCard;
