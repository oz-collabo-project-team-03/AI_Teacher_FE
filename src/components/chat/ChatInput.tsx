import React, { useState } from 'react';

type ChatInputProps = {
  onSendMessage: (message: string) => void;
};

const ChatInput = ({ onSendMessage }: ChatInputProps) => {
  const [inputValue, setInputValue] = useState('');

  const handleSendOnEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  return (
    <input
      type='text'
      className='w-full rounded-[10px] border-0 bg-commuInputColor px-5 py-[18px] outline-none ring-0 ring-inset ring-inputBorderColor placeholder:text-inputBorderColor focus:ring-2 focus:ring-inset focus:ring-inputFocusColor'
      placeholder='메시지를 입력하세요'
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onKeyDown={handleSendOnEnter}
    />
  );
};

export default ChatInput;
