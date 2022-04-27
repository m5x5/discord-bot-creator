import Select from '.';

type Props = {
  field: string;
  [key: string]: any;
};

export default function SelectStorage({
  field,
  isEvent,
  config,
  ...props
}: Props) {
  const options = [
    { value: '2', label: 'Default Channel' },
    { value: '3', label: 'Temp Variable' },
    { value: '4', label: 'Server Variable' },
    { value: '5', label: 'Global Variable' },
  ];

  if (isEvent) {
    options.unshift(
      { value: '0', label: 'Same Channel' },
      { value: '1', label: 'Mentioned Channel' }
    );
  }

  return <Select {...props} config={config} field={field} options={options} />;
}
