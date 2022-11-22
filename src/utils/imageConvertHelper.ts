const convertFileToBase64 = (acceptedFile: Blob) => {
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = () => {
      reject(reader.error);
    };
    reader.readAsDataURL(acceptedFile);
  });
};

export default convertFileToBase64;
