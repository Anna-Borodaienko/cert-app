import ASN1 from '@lapo/asn1js';
import { getCertificate } from '../storage/certificates';
import { getCommonName } from './getCommonName';
import { getPeriod } from './getPeriod';

export const restoreCertificate = (
  fileName: string
): {
  subjectCommonName: string;
  issuerCommonName: string;
  startValidity: string;
  endValidity: string;
} => {
  const fileContent = getCertificate(fileName);
  const uint8Array = new Uint8Array(fileContent);
  let data: ASN1 | null = null;

  try {
    data = ASN1.decode(uint8Array);
  } catch (error) {
    console.log(error);
  }

  if (!data || data.typeName() !== 'SEQUENCE')
    throw new Error('Incorrect certificate type');
  const tbsCertificate = data.sub;
  if (!tbsCertificate) throw new Error('Incorrect certificate structure');
  const subject = tbsCertificate[0]?.sub?.[5];
  if (!subject) throw new Error('Incorrect certificate subject');
  const subjectCommonName = getCommonName(subject);
  const issuer = tbsCertificate[0]?.sub?.[3];
  if (!issuer) throw new Error('Incorrect certificate issuer');
  const issuerCommonName = getCommonName(issuer);
  const validity = tbsCertificate[0]?.sub?.[4];
  if (!validity) throw new Error('Incorrect certificate validity');
  const { startValidity, endValidity } = getPeriod(validity);

  return {
    subjectCommonName,
    issuerCommonName,
    startValidity,
    endValidity,
  };
};
