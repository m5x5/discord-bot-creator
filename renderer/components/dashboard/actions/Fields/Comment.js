import PropTypes from 'prop-types';
import React from 'react';
import { FormGroup } from 'react-bootstrap';
import Label from '../../../core/Label';
import { useDashboardContext } from '../../DashboardContext';

export default function CommentField({ value }) {
  const { updateField } = useDashboardContext();

  const onChange = (e) => {
    updateField('comment', e.target.value);
  };

  return (
    <FormGroup className="mb-3">
      <Label>Comment</Label>
      <br />
      <textarea
        type="color"
        value={value}
        onChange={onChange}
        className="p-0 border-none"
      />
    </FormGroup>
  );
}

CommentField.propTypes = {
  value: PropTypes.string,
};
