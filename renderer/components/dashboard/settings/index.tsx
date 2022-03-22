import { ipcRenderer } from 'electron';
import { Button, Form, Modal } from 'react-bootstrap';
import useSettings from '../../../lib/useSettings';
import { styled } from '../../../stitches.config';
import Input from '../../core/Input';
import Label from '../../core/Label';

const Title = styled('span', {
  fontSize: '1.5rem',
  fontFamily: 'Outfit, Open Sans, $system',
  fontWeight: 'semibold',
});

type Props = {
  show: boolean;
  onHide: () => void;
};

export default function SettingsView({ onHide }: Props) {
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
    ipcRenderer.on('saveSettings', (event, data) => {
      onHide();
    });
  };

  return (
    <div>
      <Modal.Title>
        <Title>Settings</Title>
      </Modal.Title>
      <Form>
        <Form.Group className="mb-3">
          <Label>Prefix</Label>
          <Input
            type="text"
            onChange={changePrefix}
            value={settings?.tag}
            placeholder="!"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Label>Token</Label>
          <Input
            type="text"
            value={settings?.token || ''}
            onChange={changeToken}
            placeholder="e.g.: NzI3ODcyOTg0NTc1OTAxNzg2.XvyKig.4eiNtg8CGOkT1Www5sRngSLSJ30"
          />
          <Form.Text>
            Get your token from the{' '}
            <a
              rel="noopener noreferrer"
              target="_blank"
              href="https://discord.com/developers/applications/"
              title="Discord Applications Overview"
            >
              bot dashboard
            </a>
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3">
          <Label>Separator</Label>
          <Input
            type="text"
            value={settings?.separator || ''}
            onChange={changeSeparator}
            placeholder="\\s+"
          />
          <Form.Text>
            <a
              rel="noopener noreferrer"
              target="_blank"
              href="https://discord.com/developers/applications/"
              title="Applications Overview"
            ></a>
          </Form.Text>
        </Form.Group>
        <Form.Check
          type="switch"
          label="Run Bot on Save"
          checked={!!settings?.autoRestart}
          onChange={(e) =>
            setSettings({ ...settings, autoRestart: e.target.checked })
          }
          className="mb-3"
        />
        <Form.Check
          type="switch"
          label="Case Sensitive"
          checked={settings?.checked === 'true' || false}
          onChange={(e) =>
            setSettings({
              ...settings,
              settings: e.target.checked ? 'true' : 'false',
            })
          }
          className="mb-3"
        />
        <Form.Check
          type="switch"
          label="Toggle Hints"
          checked={settings?.toggleHints !== false}
          onChange={(e) =>
            setSettings({ ...settings, toggleHints: e.target.checked })
          }
          className="mb-3"
        />
      </Form>
      <Button onClick={onHide}>Close</Button>
      <Button onClick={saveSettings} variant="success" className="mt-3">
        Save
      </Button>
    </div>
  );
}
