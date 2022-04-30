import Editor from './Code';
import ColorField from './Color';
import CommentField from './Comment';
import Input from './Input';
import InputVariable from './Input/Variable';
import SelectChannel from './Select/Channel';
import CustomSelect from './Select/Custom';
import SelectEmoji from './Select/Emoji';
import SelectGuild from './Select/Guild';
import SelectMember from './Select/Member';
import SelectMessage from './Select/Message';
import SelectStorage from './Select/Storage';
import Switch from './Switch';
import Textarea from './Textarea';

export const SUPPORTED_FIELDS = [
  'code',
  'comment',
  'color',
  'member',
  'varName',
  'reason',
  'guild',
  'varName2',
  'days',
  'emoji',
  // IRL not supported
  'channel',
  'message',
  'iffalse',
  'storage',
  'iffalseVal',
  'fieldName',
  'inline',
];
export const fieldsSupported = (fields = []) => {
  if (!fields[0]) return true;
  return fields.every((field) => SUPPORTED_FIELDS.includes(field));
};

export default function FieldManager({ fields, fieldValues, form }) {
  if (form && form !== 'undefined') {
    try {
      form = JSON.parse(form);
    } catch {
      console.error('Invalid JSON.', form);
      return null;
    }
    return (
      <>
        {Object.keys(form).map((field) => {
          const config = form[field];
          if (config.if) {
            const fi = config.if;
            if (typeof fi.greaterThan !== 'undefined') {
              if (+fieldValues[fi.field] <= fi.greaterThan) {
                return null;
              }
            }
            if (typeof fi.lessThan !== 'undefined') {
              if (+fieldValues[fi.field] >= fi.lessThan) {
                return null;
              }
            }
            if (typeof fi.equals !== 'undefined') {
              if (+fieldValues[fi.field] !== fi.equals) {
                return null;
              }
            }
          }

          if (config.type === 'code') {
            return <Editor key={field} value={fieldValues[field]} />;
          }
          if (config.type === 'color') {
            return <ColorField key={field} value={fieldValues[field]} />;
          }
          if (config.type === 'member') {
            return (
              <SelectMember
                key={field}
                config={config}
                field={field}
                value={fieldValues[field]}
              />
            );
          }
          if (config.type === 'guild') {
            return (
              <SelectGuild
                key={field}
                config={config}
                field={field}
                value={fieldValues[field]}
              />
            );
          }
          if (config.type === 'variable') {
            return (
              <InputVariable
                key={field}
                config={config}
                field={field}
                value={fieldValues[field]}
              />
            );
          }
          if (['text', 'fieldName'].includes(config.type)) {
            return (
              <Input
                key={field}
                config={config}
                field={field}
                value={fieldValues[field]}
              />
            );
          }
          if (config.type === 'text') {
            return (
              <Input
                key={field}
                config={config}
                field={field}
                value={fieldValues[field]}
                type="number"
              />
            );
          }
          if (config.type === 'textarea') {
            return (
              <Textarea
                key={field}
                config={config}
                field={field}
                value={fieldValues[field]}
                type="textarea"
              />
            );
          }
          if (config.type === 'channel') {
            return (
              <SelectChannel
                key={field}
                config={config}
                field={field}
                value={fieldValues[field]}
              />
            );
          }
          if (config.type === 'message') {
            return (
              <SelectMessage
                key={field}
                config={config}
                field={field}
                value={fieldValues[field]}
              />
            );
          }
          if (config.type === 'emoji') {
            return (
              <SelectEmoji
                key={field}
                config={config}
                field={field}
                value={fieldValues[field]}
              />
            );
          }
          if (config.type === 'storage') {
            return (
              <SelectStorage
                key={field}
                config={config}
                field={field}
                value={fieldValues[field]}
              />
            );
          }
          if (config.type === 'checkbox') {
            return (
              <Switch key={field} field={field} value={fieldValues[field]} />
            );
          }
          if (config.type === 'select') {
            return (
              <CustomSelect
                key={field}
                config={config}
                field={field}
                value={fieldValues[field]}
              />
            );
          }
        })}
      </>
    );
  }
  return (
    <>
      {fields?.map((field: string) => {
        if (field === 'code') {
          return <Editor key={field} value={fieldValues[field]} />;
        }
        if (field === 'comment') {
          return <CommentField value={fieldValues[field]} />;
        }
        if (field === 'color') {
          return <ColorField value={fieldValues[field]} />;
        }
      })}
    </>
  );
}
