import CertificateItem from "../CertificateItem";
import { CertificatesListWrapper } from "./CertificatesList.styled";

interface CertificatesListProps {
  certificatesList: string[];
  selectedCertificateName: string;
  onClick: (fileName: string) => void;
}

const CertificatesList: React.FC<CertificatesListProps> = ({
  certificatesList,
  selectedCertificateName,
  onClick,
}: CertificatesListProps): JSX.Element => {
  return (
    <CertificatesListWrapper>
      {certificatesList.map((cert) => (
        <CertificateItem
          key={cert}
          fileName={cert}
          active={cert === selectedCertificateName}
          onClick={onClick}
        />
      ))}
    </CertificatesListWrapper>
  );
};

export default CertificatesList;
