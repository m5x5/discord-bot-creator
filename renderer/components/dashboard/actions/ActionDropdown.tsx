import PropTypes from 'prop-types';
import { Badge } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import { styled } from '../../../stitches.config';
import { useDashboardContext } from '../DashboardContext';

const Container = styled('div', {
  '>.rbt': {
    '>.rbt-menu': {
      backgroundColor: '$gray900',
      fontFamily: 'Open Sans',
    },
    '>div': {
      '>.rbt-input, >.rbt-input-hint': {
        color: '#0f0',
        fontSize: '1.0rem',
        fontWeight: 'normal',
        fontFamily: 'Open Sans',
      },
    },
  },
});
export default function ActionDropdown({ name, className, create }) {
  const { actionSchemas, updateAction, addAction } = useDashboardContext();
  const filterByFields = ['name', 'section'];

  const select = (items) => {
    const selected = items[0];
    if (!selected) return;
    const newAction = { name: selected.name };

    selected.fields.forEach((field) => {
      newAction[field] = '';
    });

    if (create) {
      addAction(newAction);
    } else {
      updateAction(newAction, false);
    }
  };

  return (
    <Container>
      <Typeahead
        filterBy={filterByFields}
        id="custom-filtering-example"
        labelKey="name"
        options={actionSchemas}
        placeholder="Type an action name"
        onChange={select}
        size="large"
        defaultSelected={[{ name }]}
        multiple={false}
        className={className}
        inputProps={{
          shouldSelectHint: (shouldSelect, e) => {
            return e.key === 'Enter' || shouldSelect;
          },
        }}
        renderMenuItemChildren={(option) => (
          <div className="text-white">
            {option.name}
            <div>
              <Badge bg="primary">{option.section}</Badge>
            </div>
          </div>
        )}
      />
    </Container>
  );
}

ActionDropdown.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  create: PropTypes.bool,
};
