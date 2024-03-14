import { restoreCertificate } from '../../utils';
import { CertificateItemWrapper, IconWrapper } from './CertificateItem.styled';
import { BsFillCaretRightFill } from 'react-icons/bs';

interface CertificateItemProps {
  fileName: string;
  active: boolean;
  onClick: (fileName: string) => void;
}

const CertificateItem: React.FC<CertificateItemProps> = ({
  fileName,
  active,
  onClick,
}: CertificateItemProps): JSX.Element => {
  const { subjectCommonName } = restoreCertificate(fileName);

  const handleClick = () => {
    onClick(fileName);
  };

  return (
    <CertificateItemWrapper $active={active} onClick={handleClick}>
      {subjectCommonName}
      <IconWrapper>
        {active && <BsFillCaretRightFill size={'25px'} />}
      </IconWrapper>
    </CertificateItemWrapper>
  );
};

export default CertificateItem;
