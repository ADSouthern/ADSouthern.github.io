import React from 'react';

interface Props {
    value: string;
    onChange: (value: string) => void;
}

const SynonymInput: React.FC<Props> = ({ value, onChange }) => {
    return (
        <div>
            <label>Enter Synonym Prefix (example: FA):</label>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                style={{ width: '100%', backgroundColor: '#3e3e3e', color: '#ffffff' }}
            />
        </div>
    );
};

export default SynonymInput;