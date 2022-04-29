import Select from '.';

type Props = {
  field: string;
  [key: string]: any;
};

export default function SelectChannel({
  field,
  isEvent,
  config,
  value,
  ...props
}: Props) {
  const options = [
    { value: '3', label: 'Temp Variable' },
    { value: '4', label: 'Server Variable' },
    { value: '5', label: 'Global Variable' },
  ];

  if (!isEvent) {
    options.unshift(
      { value: '0', label: 'Same Channel' },
      { value: '1', label: 'Mentioned Channel' }
    );
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
