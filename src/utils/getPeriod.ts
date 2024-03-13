import ASN1 from '@lapo/asn1js';
import moment from 'moment';

export const getPeriod = (
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
