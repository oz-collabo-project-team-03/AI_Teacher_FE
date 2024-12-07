import React, { useState } from 'react';

type ChatInputProps = {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
};

const ChatInput = ({ onSendMessage, disabled = false }: ChatInputProps) => {
  const [inputValue, setInputValue] = useState('');

  const handleSendOnEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !disabled) {
      e.preventDefault();
      if (inputValue.trim() !== '') {
        onSendMessage(inputValue);
        setInputValue('');
      }
    }
  };

  // 글자수 제한
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    const input = e.target.value;
    if (input.length <= 500) {
      setInputValue(input);
    }
  };

  return (
    <input
      type='text'
      className={`w-full rounded-[10px] border-0 bg-commuInputColor py-[18px] pl-[56px] pr-5 outline-none ring-0 ring-inset ring-inputBorderColor placeholder:text-inputBorderColor focus:ring-2 focus:ring-inset focus:ring-inputFocusColor ${
        disabled ? 'cursor-not-allowed opacity-50' : ''
      }`}
      placeholder={disabled ? '비활성화 상태입니다.' : '메시지를 입력하세요'}
      value={inputValue}
      onChange={handleInputChange}
      onKeyDown={handleSendOnEnter}
      disabled={disabled}
    />
  );
};

export default ChatInput;
