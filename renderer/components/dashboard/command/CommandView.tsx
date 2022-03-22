import { Container } from 'react-bootstrap';
import ActionList from '../actions/ActionList';
import CommandHeader from './CommandHeader';

export default function CommandView() {
  return (
    <Container>
      <CommandHeader />
      <ActionList />
    </Container>
  );
}
