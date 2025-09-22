import React from 'react';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const UserSelect: React.FC<Props> = ({ value, onChange }) => {
  const users = ["HR_USER", "FIN_USER", "EIM_USER", "API_USER", "APP_DEV_USER", "IT_USER"];
  return (
    <div>
      <label>Select User:</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ width: '100%', backgroundColor: '#3e3e3e', color: '#ffffff' }}
      >
        {users.map((user) => (
          <option key={user} value={user}>{user}</option>
        ))}
      </select>
    </div>
  );
};

export default UserSelect;