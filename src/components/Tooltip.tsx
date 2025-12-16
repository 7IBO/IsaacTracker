import { ReactNode, useState } from "react";

interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  delay?: number;
}

export const Tooltip = ({ content, children, delay = 300 }: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    const id = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    setTimeoutId(id);
  };

  const handleMouseLeave = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setIsVisible(false);
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {isVisible && (
        <div className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2">
          <div className="rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 whitespace-nowrap shadow-xl">
            <div className="text-sm text-gray-200">{content}</div>
          </div>
          {/* Arrow */}
          <div className="absolute top-full left-1/2 -mt-px -translate-x-1/2">
            <div className="border-8 border-transparent border-t-gray-700"></div>
          </div>
        </div>
      )}
    </div>
  );
};
