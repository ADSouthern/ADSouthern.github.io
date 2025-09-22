import React from 'react';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const TableInput: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div>
      <label>Enter table names (one per line):</label>
      <textarea
        rows={10}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ width: '100%', backgroundColor: '#3e3e3e', color: '#ffffff' }}
      />
    </div>
  );
};

export default TableInput;