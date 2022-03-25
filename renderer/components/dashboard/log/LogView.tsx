import { ipcRenderer } from 'electron';
import { useEffect, useState } from 'react';
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
    <div>
      <div>
        {logs.map((log, i) => (
          <div key={i}>{log}</div>
        ))}
        {errors.map((error, i) => (
          <div key={i}>{error.message}</div>
        ))}
      </div>
      <Button onClick={onClear}>Clear</Button>
    </div>
  );
}
