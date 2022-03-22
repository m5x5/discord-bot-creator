import { Container } from 'react-bootstrap';
import ActionList from '../actions/ActionList';
import EventHeader from './EventHeader';

export default function EventView() {
  return (
    <Container>
      <EventHeader />
      <ActionList />
    </Container>
  );
}
