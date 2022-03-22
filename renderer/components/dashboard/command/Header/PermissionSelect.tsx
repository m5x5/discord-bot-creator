import Select from '../../../core/Select';
import { useDashboardContext } from '../../DashboardContext';

export default function PermissionSelect() {
  const { handler: command, updateHandler } = useDashboardContext();
  const onChangePermissions = (value: string) => {
    console.log({ value });
    updateHandler({ permissions: value });
  };

  const permissions = [
    { value: 'NONE', label: 'None' },
    { value: 'ADMINISTRATOR', label: 'Administrator' },
    {
      value: 'CREATE_INSTANT_INVITE',
      label: 'Create Instant Invite',
    },
    { value: 'KICK_MEMBERS', label: 'Kick Members' },
    { value: 'BAN_MEMBERS', label: 'Ban Members' },
    { value: 'MANAGE_CHANNELS', label: 'Manage Channels' },
    { value: 'MANAGE_GUILD', label: 'Manage Guild' },
    { value: 'ADD_REACTIONS', label: 'Add Reactions' },
    { value: 'VIEW_AUDIT_LOG', label: 'View Audit Log' },
    { value: 'PRIORITY_SPEAKER', label: 'Priority Speaker' },
    { value: 'STREAM', label: 'Stream' },
    { value: 'VIEW_CHANNEL', label: 'View Channel' },
    { value: 'SEND_MESSAGES', label: 'Send Messages' },
    { value: 'SEND_TTS_MESSAGES', label: 'Send TTS Messages' },
    { value: 'MANAGE_MESSAGES', label: 'Manage Messages' },
    { value: 'EMBED_LINKS', label: 'Embed Links' },
    { value: 'ATTACH_FILES', label: 'Attach Files' },
    { value: 'READ_MESSAGE_HISTORY', label: 'Read Message History' },
    { value: 'MENTION_EVERYONE', label: 'Mention Everyone' },
    { value: 'USE_EXTERNAL_EMOJIS', label: 'Use External Emojis' },
    { value: 'VIEW_GUILD_INSIGHTS', label: 'View Guild Insights' },
    { value: 'CONNECT', label: 'Connect' },
    { value: 'SPEAK', label: 'Speak' },
    { value: 'MUTE_MEMBERS', label: 'Mute Members' },
    { value: 'DEAFEN_MEMBERS', label: 'Deafen Members' },
    { value: 'MOVE_MEMBERS', label: 'Move Members' },
    { value: 'USE_VAD', label: 'Use VAD' },
    { value: 'CHANGE_NICKNAME', label: 'Change Nickname' },
    { value: 'MANAGE_NICKNAMES', label: 'Manage Nicknames' },
    { value: 'MANAGE_ROLES', label: 'Manage Roles' },
    { value: 'MANAGE_WEBHOOKS', label: 'Manage Webhooks' },
    { value: 'MANAGE_EMOJIS', label: 'Manage Emojis' },
  ];
  const selectedPermission =
    permissions.find((p) => p.value === command.permissions) || permissions[0];

  return (
    <Select
      value={selectedPermission}
      onChange={onChangePermissions}
      options={permissions}
    />
  );
}
