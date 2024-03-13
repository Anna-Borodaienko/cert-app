import ASN1 from '@lapo/asn1js';

export const getCommonName = (name: ASN1): string => {
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
