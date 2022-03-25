import ActionList from '../actions/ActionList';
import CommandHeader from './CommandHeader';

export default function CommandView() {
  return (
    <div>
      <CommandHeader />
      <ActionList />
    </div>
  );
}
