import Select from '.';

type Props = {
  field: string;
  [key: string]: any;
};

export default function CustomSelect({
  field,
  isEvent,
  config,
  value,
  ...props
}: Props) {
  const options = config.options || [];

  const selected = options.find((o) => +o.value === +value);

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
