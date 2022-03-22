import Input from '../../core/Input';
import { useDashboardContext } from '../DashboardContext';

export default function HandlerNameInput() {
  const { handler, updateHandler } = useDashboardContext();

  const update = (event) => {
    updateHandler({ name: event.target.value || 'NewEvent' });
  };

  return (
    <Input
      type="text"
      value={handler.name}
      onChange={update}
      onBlur={update}
      width={'full'}
    />
  );
}
