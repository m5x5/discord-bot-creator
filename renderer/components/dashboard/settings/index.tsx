import { ipcRenderer } from 'electron';
import useSettings from '../../../lib/useSettings';
import { styled } from '../../../stitches.config';
import Button from '../../core/Button';
import Input from '../../core/Input';
import Label from '../../core/Label';
import Switch from '../../core/Switch';

const Container = styled('div', {
  display: 'block',
  color: '$white',
});

const Title = styled('span', {
  fontSize: '1.5rem',
  display: 'block',
  fontWeight: 'semibold',
  marginBottom: '$2',
  fontFamily: '$sans',
});

export default function SettingsView() {
  const [settings, setSettings] = useSettings();

  const changePrefix = (e) => {
    setSettings({ ...settings, tag: e.target.value });
  };

  const changeToken = (e) => {
    setSettings({ ...settings, token: e.target.value });
  };

  const changeSeparator = (e) => {
    setSettings({ ...settings, separator: e.target.value });
  };

  const saveSettings = () => {
    ipcRenderer.send('saveSettings', settings);
  };

  return (
    <Container>
      <Title>Settings</Title>
      <form>
        <div className="mb-3">
          <Label>Prefix</Label>
          <Input
            type="text"
            onChange={changePrefix}
            value={settings?.tag}
            placeholder="!"
          />
        </div>
        <div className="mb-3">
          <Label>Token</Label>
          <Input
            type="text"
            value={settings?.token || ''}
            onChange={changeToken}
            placeholder="e.g.: NzI3ODcyOTg0NTc1OTAxNzg2.XvyKig.4eiNtg8CGOkT1Www5sRngSLSJ30"
          />
          <p>
            Get your token from the{' '}
            <a
              rel="noopener noreferrer"
              target="_blank"
              href="https://discord.com/developers/applications/"
              title="Discord Applications Overview"
            >
              bot dashboard
            </a>
          </p>
        </div>
        <div className="mb-3">
          <Label>Separator</Label>
          <Input
            type="text"
            value={settings?.separator || ''}
            onChange={changeSeparator}
            placeholder="\\s+"
          />
          <p>
            <a
              rel="noopener noreferrer"
              target="_blank"
              href="https://discord.com/developers/applications/"
              title="Applications Overview"
            ></a>
          </p>
        </div>
        <Switch
          title="Restart Automatically"
          checked={!!settings?.autoRestart}
          onChange={(b) => setSettings({ ...settings, autoRestart: b })}
        />
        <Switch
          title="Case Sensitive"
          checked={settings?.checked === 'true' || false}
          onChange={(b) =>
            setSettings({
              ...settings,
              settings: b ? 'true' : 'false',
            })
          }
        />
        <Switch
          title="Show Hints"
          checked={settings?.toggleHints !== false}
          onChange={(b) => setSettings({ ...settings, toggleHints: b })}
        />
      </form>
      <Button onClick={saveSettings} variant="success">
        Save
      </Button>
    </Container>
  );
}
