import ReactSelect from 'react-select';
import { config } from '../../stitches.config';

const colors = config.theme.colors;

export default function Select(props: any) {
  const handleChange = ({ value }) => {
    props.onChange?.(value);
  };
  return (
    <ReactSelect
      {...props}
      styles={{
        menu: (provided) => ({
          ...provided,
          color: colors.white,
          backgroundColor: colors.gray900,
        }),

        option: (provided, state) => ({
          ...provided,
          backgroundColor: colors.gray900,
          fontFamily: 'Outfit',
          fontWeight: 400,
          ':focus-visible': {
            backgroundColor: colors.gray800,
          },
          ':active': {
            backgroundColor: colors.gray800,
          },
          ':hover': {
            backgroundColor: colors.gray800,
          },
        }),
        indicatorSeparator: () => ({
          display: 'none',
        }),

        dropdownIndicator: (provided) => ({
          ...provided,
          color: colors.gray200,
        }),

        control: (provided) => ({
          ...provided,
          fontFamily: 'Outfit',
          backgroundColor: colors.gray900,
          color: 'white',
          border: '1px solid rgba(0, 0, 0, 0.3)',
          fontWeight: 400,
          ':hover': {
            border: '1px solid rgba(0, 0, 0, 0.3)',
          },
        }),

        input: (provided) => ({
          ...provided,
          color: 'white',
          fontWeight: 400,
          fontFamily: 'Outfit',
        }),

        singleValue: (provided) => ({
          ...provided,
          color: 'white',
          fontWeight: 400,
        }),
      }}
      onChange={handleChange}
    />
  );
}