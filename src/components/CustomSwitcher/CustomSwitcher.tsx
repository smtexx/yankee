import { useState } from 'react';
import { ReactComponent as IndicatorIcon } from 'svg/indicator.svg';
import s from './CustomSwitcher.module.scss';

interface Props {
  value: string;
  handler(newValue: string): void;
  options: { value: string; label: string }[];
}

export default function CustomSwitcher({
  value,
  handler,
  options,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (
    e
  ) => {
    if (e.code === 'ArrowDown' || e.code === 'ArrowUp') {
      const currentIndex = options.findIndex(
        (option) => option.value === value
      );
      if (currentIndex === -1) return;

      let nextIndex: number;

      switch (e.code) {
        case 'ArrowDown':
          nextIndex =
            currentIndex === options.length - 1
              ? 0
              : currentIndex + 1;
          break;
        case 'ArrowUp':
          nextIndex =
            currentIndex === 0
              ? options.length - 1
              : currentIndex - 1;
          break;
      }

      handler(options[nextIndex].value);
    }
  };

  return (
    <div
      className={s.customSwitcher}
      role="listbox"
      tabIndex={0}
      aria-activedescendant={`listbox_option_${value}`}
      onClick={() => setIsOpen(!isOpen)}
      onKeyDown={handleKeyDown}
    >
      <div className={s.control}>
        <span className={s.controlValue}>
          {options.find((option) => option.value === value)?.label}
        </span>
        <span
          className={`${s.controlIndicator} ${
            isOpen ? s.indicatorOpen : ''
          }`}
        >
          <IndicatorIcon />
        </span>
      </div>
      {isOpen && (
        <div className={s.menu}>
          {options.map((option) => (
            <div
              className={`${s.option} ${
                option.value === value ? s.optionSelected : ''
              }`}
              role="option"
              id={`listbox_option_${option.value}`}
              aria-selected={option.value === value}
              key={option.value}
              onClick={() => handler(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
