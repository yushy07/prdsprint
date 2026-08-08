export function useSupportValidation(message: string) {
  const minLength = 20;
  const maxLength = 1000;
  
  const trimmed = message.trim();
  const currentLength = trimmed.length;
  
  const hasLetters = /[a-zA-Z]/.test(trimmed);
  const isRepeatedSpam = /^(.)\1{10,}$/.test(trimmed) || /([a-zA-Z])\1{9,}/.test(trimmed);

  const isValid = 
    currentLength >= minLength && 
    currentLength <= maxLength &&
    hasLetters &&
    !isRepeatedSpam;

  const isNearLimit = currentLength >= maxLength * 0.9;
  const isExceeded = currentLength > maxLength;
  
  return {
    isValid,
    isNearLimit,
    isExceeded,
    minLength,
    maxLength,
    currentLength
  };
}
