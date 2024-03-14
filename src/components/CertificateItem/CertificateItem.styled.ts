import styled from 'styled-components';

interface CertificateItemWrapperProps {
  $active: boolean;
}

export const CertificateItemWrapper = styled.div<CertificateItemWrapperProps>`
  width: 100%;
  padding: 20px;
  border: 2px solid black;
  background-color: ${(props) => (props.$active ? '#e6e6e6' : 'inherit')};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const IconWrapper = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
