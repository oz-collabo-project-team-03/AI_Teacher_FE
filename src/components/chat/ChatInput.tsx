import React, { useState } from 'react';

type ChatInputProps = {
  onSendMessage: (message: string) => void;
  onCompositionStart?: () => void; // 추가
  onCompositionEnd?: () => void; // 추가
  disabled?: boolean;
};

const ChatInput = ({ onSendMessage, disabled = false }: ChatInputProps) => {
  const [inputValue, setInputValue] = useState('');
  const [isComposing, setIsComposing] = useState(false); // 한글 조합 상태

  const handleSendOnEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isComposing && !disabled) {
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
      onCompositionStart={() => setIsComposing(true)} // 한글 조합 시작
      onCompositionEnd={() => setIsComposing(false)} // 한글 조합 종료
      disabled={disabled}
    />
  );
};

export default ChatInput;
//api 리퀘스트니 onSendMessage 비동기로 되겠죠?
//panding처리가 필요할지도 > 엔터를 연속으로 보낼때 엔터를 방지 > disabled 넣는거 좋음
//엔터칠때마다 로딩이 필요함 어떻게할껀지 생각해보는것 숙제 => 다중 로딩처리 추천
//스타일 길어지면 꼭 분리하기
