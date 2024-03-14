import { dataUriToBuffer } from 'data-uri-to-buffer';
import { setCertificatesList } from './certificatesList';
import { checkCertificate } from '../utils/checkCertificate';

export const setCertificate = async (certificate: File): Promise<void> => {
  const reader = new FileReader();

  const readFile = () => {
    return new Promise<void>((resolve, reject) => {
      reader.onload = async () => {
        const fileName = certificate.name;
        const fileContent = reader.result as string;
        const isCorrectType = await checkCertificate(certificate);

        if (isCorrectType) {
          localStorage.setItem(fileName, fileContent);
          setCertificatesList(fileName);
        }
        resolve();
      };
      reader.onerror = reject;
      reader.readAsDataURL(certificate);
    });
  };

  await readFile();
};

export const getCertificate = (fileName: string): ArrayBuffer => {
  const certificateData = localStorage.getItem(fileName);

  if (certificateData === null) {
    throw new Error(
      `Certificate data for ${fileName} not found in localStorage.`
    );
  }

  return dataUriToBuffer(certificateData).buffer;
};
