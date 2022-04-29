import Select from '.';

type Props = {
  field: string;
  [key: string]: any;
};

export default function SelectStorage({
  field,
  isEvent,
  config,
  value,
  ...props
}: Props) {
  const options = [
    { value: '1', label: 'Temp Variable' },
    { value: '2', label: 'Server Variable' },
    { value: '3', label: 'Global Variable' },
  ];

  if (!isEvent) {
    options.unshift({ value: '0', label: 'Nothing' });
  }

  const selected = options.find((option) => +option.value === +value);

  return (
    <Select
      {...props}
      config={config}
      field={field}
      options={options}
      value={selected}
      required={config.required}
    />
  );
}
