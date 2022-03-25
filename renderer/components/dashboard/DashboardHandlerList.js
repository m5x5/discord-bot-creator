import { useState } from 'react';
import CommandHeader from '../components/dashboard/CommandHeader';
import EventHeader from '../components/dashboard/EventHeader';
import useCommands from '../lib/useCommands';
import useEvents from '../lib/useEvents';

export default function DashboardHandlerList({ selected }) {
  // Component Controls
  const [selected] = useState('');

  // Data
  const [events] = useEvents();
  const [commands] = useCommands();

  const optionList = (commands || [])?.concat(events || []);

  return (
    <div style={{ overflowY: 'auto', maxHeight: '100vh' }}>
      <div>
        {optionList?.map(({ name, 'event-type': eventType } = {}, i) => (
          <div
            eventKey={name + '-' + i}
            key={name}
            active={(!selected && i === 0) || selected === name}
          >
            {typeof eventType !== 'undefined' ? (
              <EventHeader event={optionList[i]} eventIndex={i} />
            ) : (
              <CommandHeader command={optionList[i]} commandIndex={i} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
