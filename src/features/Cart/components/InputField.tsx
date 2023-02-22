import { Control, useController } from 'react-hook-form';

interface InputFieldProps {
  name: string;
  control: Control<any, any>;
  rules: any;
  required?: boolean;
  type?: React.HTMLInputTypeAttribute;
  label: string;
  cardDate?: boolean;
}

export default function InputField({
  name,
  control,
  rules,
  required = false,
  type,
  label,
  cardDate = false,
}: InputFieldProps) {
  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
    rules,
  });

  return (
    <div className={`card__input ${cardDate ? 'card__date' : ''}`}>
      <input
        required={required}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        type={type}
        name={name}
        id={name}
      />
      <label htmlFor={name}>{label}</label>
      {invalid && <div className="card__input__error">{error?.message}</div>}
    </div>
  );
}
