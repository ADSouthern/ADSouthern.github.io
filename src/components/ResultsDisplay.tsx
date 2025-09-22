import React from 'react';

interface Props {
  title: string;
  content: string;
  onCopy: () => void;
  showCopyButton?: boolean;
}

const ResultsDisplay: React.FC<Props> = ({ title, content, onCopy, showCopyButton = true}) => {
  return (
    <div>
      <h4>{title}</h4>
      <textarea
        readOnly
        value={content}
        rows={10}
        style={{ width: '100%', backgroundColor: '#3e3e3e', color: '#ffffff' }}
      />
        {showCopyButton && (
      <button onClick={onCopy} style={{ backgroundColor: '#5e5e5e', color: '#ffffff', marginTop: '10px' }}>
        Copy to Clipboard
      </button> )}
    </div>
  );
};

export default ResultsDisplay;