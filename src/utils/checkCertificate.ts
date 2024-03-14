import ASN1 from "@lapo/asn1js";

export const checkCertificate = async (certificate: File): Promise<boolean> => {
  return new Promise<boolean>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const fileContent = reader.result as ArrayBuffer;
      const uint8Array = new Uint8Array(fileContent);
      const result = ASN1.decode(uint8Array);

      if (result && result.typeName() === 'SEQUENCE') {
        resolve(true);
      } else {
        resolve(false);
      }
    };

    reader.onerror = reject;
    reader.readAsArrayBuffer(certificate);
  });
};
