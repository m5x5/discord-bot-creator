import React from 'react';
import Label from '../../../core/Label';
import { useDashboardContext } from '../../DashboardContext';

export default function CommentField({ value }) {
  const { updateField } = useDashboardContext();

  const onChange = (e) => {
    updateField('comment', e.target.value);
  };

  return (
    <div>
      <Label>Comment</Label>
      <br />
      <textarea
        title="comment"
        value={value}
        onChange={onChange}
        className="p-0 border-none"
      />
    </div>
  );
}
