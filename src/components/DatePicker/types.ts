export type DateValue = Date | [Date | null, Date | null] | null;

export type DatePickerProps = {
  disabled?: boolean;
  error?: boolean;
  isRange?: boolean;
  value?: DateValue;
  onChange?: (_: DateValue) => void;
  placeholder?: string;
};

export type CalendarProps = {
  value: DateValue;
  onChange: (_: DateValue) => void;
  isRange?: boolean;
  onClose: () => void;
};
