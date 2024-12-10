import { useRef } from 'react';

export const useFileUpload = (onUpload: (fileContent: string, fileName: string) => void, maxFileSize = 5 * 1024 * 1024) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
     
      return;
    }

    const allowedTypes = ['image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      
      event.target.value = '';
      return;
    }

    if (file.size > maxFileSize) {
    
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64Data = reader.result as string;
      onUpload(base64Data.split(',')[1], file.name);
    };

    reader.onerror = (error) => {
     
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
