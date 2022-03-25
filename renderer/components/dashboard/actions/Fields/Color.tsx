import React from 'react';
import { FormGroup } from 'react-bootstrap';
import Label from '../../../core/Label';
import { useDashboardContext } from '../../DashboardContext';

export default function ColorField({ value }) {
  const { updateField } = useDashboardContext();

  const onChange = (e) => updateField('color', e.target.value);

  return (
    <FormGroup>
      <Label>Color</Label>
      <br />
      <input
        title="Color"
        type="color"
        value={value}
        onChange={onChange}
        className="p-0 border-none"
      />
    </FormGroup>
  );
}
