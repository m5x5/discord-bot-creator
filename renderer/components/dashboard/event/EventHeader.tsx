import Input from '../../core/Input';
import Label from '../../core/Label';
import Select from '../../core/Select';
import { useDashboardContext } from '../DashboardContext';
import HandlerNameInput from '../handlers/HandlerNameInput';

export default function EventHeader() {
  const { handler: event, updateHandler } = useDashboardContext();

  const onSelect = (e) => {
    updateHandler({ ['event-type']: e.value });
  };

  const onChangeTemp = (e) => {
    updateHandler({ temp: e.target.value });
  };

  const onChangeTemp2 = (e) => {
    updateHandler({ temp2: e.target.value });
  };

  const eventTypeOptions = [
    { label: 'None', temp: false, tempDescription: '' },
    { label: 'Bot Initialization', temp: false, tempDescription: '' },
    {
      label: 'Message Sent',
      temp: true,
      tempDescription: 'Stores the message that was sent',
    },
    {
      label: 'On Interval',
      temp: true,
      tempLabel: 'Interval of Time (in seconds)',
    },
    { label: 'Bot Join Server', temp: false, tempDescription: '' },
    { label: 'Bot Leave Server', temp: false, tempDescription: '' },
    {
      label: 'Member Join Server',
      temp: true,
      tempDescription: 'Stores the member that joined the server',
    },
    {
      label: 'Member Leave Server',
      temp: true,
      tempDescription: 'Stores the member that left the server',
    },
    {
      label: 'Channel Create',
      temp: true,
      tempDescription: 'Stores the channel that was created',
    },
    {
      label: 'Channel Delete',
      temp: true,
      tempDescription: 'Stores the channel that was deleted',
    },
    {
      label: 'Role Create',
      temp: true,
      tempDescription: 'Stores the role that was created',
    },
    {
      label: 'Role Delete',
      temp: true,
      tempDescription: 'Stores the role that was deleted',
    },
    {
      label: 'Member Banned',
      temp: true,
      tempDescription: 'Stores the member that was banned',
    },
    {
      label: 'Member Unbanned',
      temp: true,
      tempDescription: 'Stores the member that was unbanned',
    },
    {
      label: 'Voice Channel Create',
      temp: true,
      tempDescription: 'Stores the voice channel that was created',
    },
    {
      label: 'Voice Channel Delete',
      temp: true,
      tempDescription: 'Stores the voice channel that was deleted',
    },
    {
      label: 'Emoji Create',
      temp: true,
      tempDescription: 'Stores the emoji that was created',
    },
    {
      label: 'Emoji Delete',
      temp: true,
      tempDescription: 'Stores the emoji that was deleted',
    },
    {
      label: 'Message Deleted',
      temp: true,
      tempDescription: 'Stores the message that was deleted',
    },
    {
      label: 'Server Update',
      temp: true,
      temp2: true,
      temp2Description: 'Stores the server after update',
    },
    {
      label: 'Member Update',
      temp: true,
      temp2: true,
      tempDescription: 'Stores the member prior to update',
      temp2Description: 'Stores the member after update',
    },
    {
      label: 'Presence Update',
      temp: true,
      temp2: true,
      tempDescription: 'Stores the member prior to their presence update',
      temp2Description: 'Stores the member after their presence update',
    },
    {
      label: 'Member Voice Update',
      temp: true,
      temp2: true,
      tempDescription: 'Stores the member prior to their voice update',
      temp2Description: 'Stores the member after their voice update',
    },
    {
      label: 'Channel Update',
      temp: true,
      temp2: true,
      tempDescription: 'Stores the channel prior to update',
      temp2Description: 'Stores the channel after update',
    },
    {
      label: 'Channel Pins Update',
      temp: true,
      tempDescription: 'Stores the channel prior to update',
    },
    {
      label: 'Role Update',
      temp: true,
      temp2: true,
      tempDescription: 'Stores the role prior to update',
      temp2Description: 'Stores the role after update',
    },
    {
      label: 'Message Update',
      temp: true,
      temp2: true,
      tempDescription: 'Stores the message prior to update',
      temp2Description: 'Stores the message after update',
    },
    {
      label: 'Emoji Update',
      temp: true,
      temp2: true,
      tempDescription: 'Stores the emoji prior to update',
      temp2Description: 'Stores the emoji after update',
    },
    {
      label: 'Message Reaction Added',
      temp: true,
      tempDescription: 'Stores the message reaction that was added',
    },
    {
      label: 'Message Reaction Removed',
      temp: true,
      tempDescription: 'Stores the message reaction that was removed',
    },
    {
      label: 'All Message Reactions Removed',
      temp: true,
      tempDescription: 'Stores the message that had all reactions removed',
    },
    {
      label: 'Member Becomes Available',
      temp: true,
      tempDescription: 'Stores the member that became available',
    },
    {
      label: 'Member Chunck Received',
      temp: true,
      tempDescription: 'Stores the members from chunck',
    },
    {
      label: 'Member Starts/StopsSpeaking',
      temp: true,
      temp2: true,
      tempDescription: 'Stores the member that started/stopped speaking',
      temp2Description:
        'Stores the boolean of whether they started/stopped speaking',
    },
    {
      label: 'Member Typing Starts',
      temp: true,
      temp2: true,
      tempDescription: 'Stores the channel where member started typing',
      temp2Description: 'Stores the member that started typing',
    },
    {
      label: 'Member Typing Stops',
      temp: true,
      temp2: true,
      tempDescription: 'Stores the channel where member stopped typing',
      temp2Description: 'Stores the member that stopped typing',
    },
    {
      label: 'Server Becomes Unavailable',
      temp: true,
      tempDescription: 'Stores the server that became unavailable',
    },
    {
      label: 'On Bot Error',
      temp: true,
      temp2: true,
      tempDescription: 'Discord Bot Creator error text',
      temp2Description: 'Discord Bot Creator error code',
    },
    {
      label: 'On Time Restricted Command',
      temp: true,
      temp2: true,
      tempDescription: 'Member that ran the command',
      temp2Description: 'Amount of time needed',
    },
  ];

  const option = eventTypeOptions[event?.['event-type']];
  const options = [
    { label: 'None', value: 0 },
    { label: 'Bot Initialization', value: 1 },
    { label: 'Message Sent', value: 2 },
    { label: 'On Interval', value: 3 },
    { label: 'Bot Join Server', value: 4 },
    { label: 'Bot Leave Server', value: 5 },
    { label: 'Member Join Server', value: 6 },
    { label: 'Member Leave Server', value: 7 },
    { label: 'Channel Create', value: 8 },
    { label: 'Channel Delete', value: 9 },
    { label: 'Role Create', value: 10 },
    { label: 'Role Delete', value: 11 },
    { label: 'Member Banned', value: 12 },
    { label: 'Member Unbanned', value: 13 },
    { label: 'Voice Channel Create', value: 14 },
    { label: 'Voice Channel Delete', value: 15 },
    { label: 'Emoji Create', value: 16 },
    { label: 'Emoji Delete', value: 17 },
    { label: 'Message Deleted', value: 18 },
    { label: 'Server Update', value: 19 },
    { label: 'Member Update', value: 20 },
    { label: 'Presence Update', value: 21 },
    { label: 'Member Voice Update', value: 22 },
    { label: 'Channel Update', value: 23 },
    { label: 'Channel Pins Update', value: 24 },
    { label: 'Role Update', value: 25 },
    { label: 'Message Update', value: 26 },
    { label: 'Emoji Update', value: 27 },
    { label: 'Message Reaction Added', value: 28 },
    { label: 'Message Reaction Removed', value: 29 },
    { label: 'All Message Reactions Removed', value: 30 },
    { label: 'Member Becomes Available', value: 31 },
    { label: 'Member Chunck Received', value: 32 },
    { label: 'Member Starts/Stops Speaking', value: 33 },
    { label: 'Member Typing Starts', value: 34 },
    { label: 'Member Typing Stops', value: 35 },
    { label: 'Server Becomes Unavailable', value: 36 },
    { label: 'On Bot Error', value: 37 },
    { label: 'On Time Restricted Command', value: 38 },
  ];

  const selected = options.find((o) => o.value === event?.['event-type']);
  if (!selected) return <div>No Event Selected</div>;

  return (
    <div>
      <div>
        <Label>Name</Label>
        <HandlerNameInput />
      </div>
      <form>
        <div className="mb-3">
          <Label>Trigger</Label>
          <Select onChange={onSelect} value={selected} options={options} />
        </div>
        {option?.temp && (
          <div>
            <Label>{option.tempLabel || 'Temp Variable Name'}</Label>
            <Input type="text" value={event?.temp} onChange={onChangeTemp} />
            <p>{option.tempDescription || ''}</p>
          </div>
        )}
        {option?.temp2 && (
          <div>
            <Label>{option.temp2Description}</Label>
            <Input type="text" value={event?.temp2} onChange={onChangeTemp2} />
          </div>
        )}
      </form>
    </div>
  );
}
