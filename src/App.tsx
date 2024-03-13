import React from 'react';

import ASN1 from '@lapo/asn1js';
import { getCommonName, getPeriod } from './utils/';

export const App: React.FC = (): JSX.Element => {
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files;
    const file = files && files.length > 0 ? files[0] : null;

    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const fileContent = reader.result as ArrayBuffer;
      const uint8Array = new Uint8Array(fileContent);
      const data = ASN1.decode(uint8Array);
      const subject = data.sub?.[0]?.sub?.[5];
      if (!subject) throw new Error('The certificate subject is wrong');
      const subjectCommonName = getCommonName(subject);
      const issuer = data.sub?.[0]?.sub?.[3];
      if (!issuer) throw new Error('The certificate issuer is wrong');
      const issuerCommonName = getCommonName(issuer);
      const validity = data.sub?.[0]?.sub?.[4];
      if (!validity) throw new Error('The certificate validity is wrong');
      const { startValidity, endValidity } = getPeriod(validity);
    };
    reader.readAsArrayBuffer(file);
  };

  return <input onChange={handleFile} type="file" accept=".cer" />;
};
