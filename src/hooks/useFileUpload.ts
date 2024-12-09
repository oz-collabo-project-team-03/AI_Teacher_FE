import { useRef } from 'react';

export const useFileUpload = (onUpload: (fileContent: string, fileName: string) => void, maxFileSize = 5 * 1024 * 1024) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      console.error('파일이 선택되지 않았습니다.');
      return;
    }

    const allowedTypes = ['image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      console.error('허용되지 않은 파일 형식입니다.');
      event.target.value = '';
      return;
    }

    if (file.size > maxFileSize) {
      console.error('파일 크기가 너무 큽니다.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64Data = reader.result as string;
      onUpload(base64Data.split(',')[1], file.name);
    };

    reader.onerror = (error) => {
      console.error('파일 읽기 중 에러:', error);
    };

    reader.readAsDataURL(file);
  };

  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return { fileInputRef, handleFileChange, openFileDialog };
};
