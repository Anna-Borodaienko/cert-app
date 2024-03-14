export const setCertificatesList = (fileName: string): void => {
  const certificatesList = getCertificatesList();
  if (certificatesList[0]) {
    certificatesList.push(fileName);
  } else {
    certificatesList[0] = fileName;
  }
  localStorage.setItem('certificates', certificatesList.toString());
};

export const getCertificatesList = (): string[] => {
  return localStorage.getItem('certificates')?.split(',') || [];
}
