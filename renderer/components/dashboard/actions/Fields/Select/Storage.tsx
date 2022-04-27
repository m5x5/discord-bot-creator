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
  return (
    <Select {...props} config={config} field={field}>
      {!isEvent && (
        <>
          <option value="0">Nothing</option>
        </>
      )}
      <option value="1">Temp Variable</option>
      <option value="2">Server Variable</option>
      <option value="3">Global Variable</option>
    </Select>
  );
}
