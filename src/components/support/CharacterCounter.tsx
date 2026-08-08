export function CharacterCounter({ current, max, isNearLimit, isExceeded }: { current: number, max: number, isNearLimit: boolean, isExceeded: boolean }) {
  let textColor = 'text-gray-500';
  if (isExceeded) {
    textColor = 'text-red-500';
  } else if (isNearLimit) {
    textColor = 'text-orange-500';
  }

  return (
    <div className={`text-xs font-medium text-right ${textColor} transition-colors duration-300`}>
      {current} / {max}
    </div>
  );
}
