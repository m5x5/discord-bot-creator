import Select from '.';

type Props = {
  field: string;
  [key: string]: any;
};

export default function SelectMessage({
  field,
  isEvent,
  config,
  value,
  ...props
}: Props) {
  const options = [
    { value: '2', label: 'Temp Variable' },
    { value: '3', label: 'Server Variable' },
    { value: '4', label: 'Global Variable' },
  ];

  if (!isEvent) {
    options.unshift(
      { value: '0', label: 'Direct Emoji' },
      { value: '1', label: 'Custom Emoji' }
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
