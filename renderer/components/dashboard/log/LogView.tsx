import { ipcRenderer } from 'electron';
import { useEffect, useState } from 'react';
import { Card, Container } from 'react-bootstrap';
import Button from '../../core/Button';
import { useDashboardContext } from '../DashboardContext';

export default function LogView() {
  const { errors } = useDashboardContext();
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const listener = (_e, logs = []) => {
      setLogs(logs);
    };

    ipcRenderer.on('onLogsUpdate', listener);

    return () => {
      ipcRenderer.removeListener('onLogsUpdate', listener);
    };
  }, [JSON.stringify(logs)]);

  useEffect(() => {
    ipcRenderer.send('getLogs');
  }, []);

  const onClear = () => {
    ipcRenderer.send('clearLogs');
    setLogs([]);
  };

  return (
    <Container>
      <div>
        {logs.map((log, i) => (
          <Card key={i}>{log}</Card>
        ))}
        {errors.map((error, i) => (
          <Card key={i}>{error.message}</Card>
        ))}
      </div>
      <Button onClick={onClear}>Clear</Button>
    </Container>
  );
}
