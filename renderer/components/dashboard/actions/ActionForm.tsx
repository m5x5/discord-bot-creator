import { useEffect, useRef, useState } from 'react';
import { evalHTML, evalInit, evalListener } from '../../../lib/runInContext';
import Button from '../../core/Button';
import { useDashboardContext } from '../DashboardContext';
import FieldManager, { fieldsSupported } from './Fields';

export default function ActionForm({ show, isEvent, onHide }) {
  const { action, actionSchema, updateAction } = useDashboardContext();

  const [state, setState] = useState({
    visible: false,
    html: null,
    name: action?.name,
  });
  const content = useRef(null);

  useEffect(() => {
    if (
      !actionSchema?.name ||
      !action ||
      !state.html ||
      !content.current?.children
    )
      return;

    // Keep track of all the listeners to remove them later
    const listeners = [];

    const glob = evalInit(actionSchema.init, action, isEvent);

    actionSchema.fields?.forEach((field) => {
      let elem = document.getElementById(field) as HTMLInputElement;
      if (!elem) return;
      elem.value = action[field];

      const changeFunction = elem.onchange;

      ///@ts-ignore
      elem.onchange = '';

      const listener = (e) => {
        if (changeFunction) {
          evalListener(changeFunction, action, isEvent, elem, glob);
        }
        updateAction({ ...action, [field]: e.target.value });
      };

      elem?.addEventListener('change', listener);
      listeners.push([elem, 'change', listener]);
    });

    return () => {
      listeners.forEach(([elem, event, listener]) => {
        elem?.removeEventListener(event, listener);
      });
    };
  }, [state.html, show]);

  useEffect(() => {
    // show is important because it otherwise would render and set the html when we have the old action selected
    const isLoading = !actionSchema?.html || !action;
    if (isLoading || (state.html && state.name === action.name) || !show)
      return;

    const html = evalHTML(actionSchema.html, action, isEvent);
    setState({ ...state, html });
  }, [actionSchema.html, show, state.html]);

  const hide = () => {
    setState({ ...state, html: null });
    content.current = null;
    onHide();
  };

  return (
    <div>
      {fieldsSupported(actionSchema?.fields) ? (
        <FieldManager
          fieldValues={action}
          fields={actionSchema?.fields}
          form={actionSchema?.form}
        />
      ) : (
        <div dangerouslySetInnerHTML={{ __html: state.html }} ref={content} />
      )}
      <Button onClick={hide}>Close</Button>
      <Button onClick={hide} variant="success">
        Save
      </Button>
    </div>
  );
}
