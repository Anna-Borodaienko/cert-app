import ASN1 from '@lapo/asn1js';
import { getCertificate } from '../storage/certificates';
import moment from 'moment';

const getCommonName = (name: ASN1): string => {
  if (!name.sub) return 'CommonName is not defined';

  const commonNameIndex = name.sub.findIndex((sub) => {
    const nestedSub = sub?.sub?.[0].sub?.[0];

    if (!nestedSub) return false;

    const posStart = nestedSub.posStart();
    const posEnd = nestedSub.posEnd();
    const currentSubId = sub.stream.parseOID(posStart, posEnd, 200);
    return currentSubId.includes('4.3');
  });

  if (commonNameIndex === -1) return 'CommonName is not defined';

  const foundSub = name.sub[commonNameIndex];
  const nestedSub = foundSub.sub?.[0]?.sub?.[1];

  if (!foundSub || !nestedSub) return 'CommonName is not defined';

  const stream = foundSub.stream;
  const posStart = nestedSub.posStart() + 2;
  const posEnd = nestedSub.posEnd();
  const commonName = stream.parseStringUTF(posStart, posEnd, 500).str;
  return commonName;
};

const getPeriod = (
  validity: ASN1
): { startValidity: string; endValidity: string } => {
  if (!validity || !validity.sub)
    return {
      startValidity: 'Validity start period is not defined',
      endValidity: 'Validity end period is not defined',
    };

  const getStringDate = (sub: ASN1) => {
    const streamDate = sub.stream;
    const posStartDate = sub.posStart() + 2;
    const posEndTimeDate = sub.posEnd();
    const stringTimeStart = streamDate.parseStringUTF(
      posStartDate,
      posEndTimeDate,
      50
    ).str;
    const formattedDate = moment
      .utc(stringTimeStart, 'YYMMDDHHmmss')
      .format('DD-MM-YY');

    return formattedDate;
  };

  return {
    startValidity:
      getStringDate(validity.sub[0]) || 'Validity start period is not defined',
    endValidity:
      getStringDate(validity.sub[1]) || 'Validity end period is not defined',
  };
};

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
