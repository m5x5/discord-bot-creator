import React from 'react';
import Label from '../../../core/Label';
import Switch from '../../../core/Switch';
import { useDashboardContext } from '../../DashboardContext';

export default function MySwitch({ value, field }) {
  const { updateField } = useDashboardContext();

  const titles = {
    inline: 'Inline',
  };
  const title = titles[field] || titles['inline'];

  const toggle = () => updateField(field, !value);

  return (
    <div>
      <Label>Inline</Label>
      <Switch title={title} checked={value} onChange={toggle} />
    </div>
  );
}
