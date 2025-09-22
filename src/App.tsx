import React, { useState } from 'react';
import TableInput from './components/TableInput';
import RegexInput from './components/RegexInput';
import UserSelect from './components/UserSelect';
import SearchSynonyms from './components/SearchSynonyms';
import ScriptGenerator from './components/ScriptGenerator';
import ResultsDisplay from './components/ResultsDisplay';
import Toast from './components/Toast';
import SynonymInput from "./components/SynonymInput.tsx";

const App: React.FC = () => {
    const [tableNamesInput, setTableNamesInput] = useState('');
    const [baseSynonym, setBaseSynonym] = useState('FA');
    const [regexPattern, setRegexPattern] =
        useState('SALARY|PAY|COMP|WAGE|EARN|INCOME|GROSS|NET|BONUS|ALLOWANCE|OVERTIME|ADJUST');
    const [selectedUser, setSelectedUser] = useState('HR_USER');
    const [toastMessage, setToastMessage] = useState('');
    const [scripts, setScripts] = useState({
        outputScript: '',
        selectScript: '',
        selectAdminScript: '',
        synonymScript: ''
    });
    const [regexResults, setRegexResults] = useState("");

    const showToast = (message: string) => {
        setToastMessage(message);
        setTimeout(() => setToastMessage(''), 3000);
    };

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text)
            .then(() => showToast('Text copied to clipboard!'))
            .catch(() => showToast('Failed to copy text.'));
    };

    const handleSynonymsFetched = (synonyms: string[]) => {
        setTableNamesInput(synonyms.join('\n'));
    };

    const parsedTableNames = tableNamesInput
        .split(/\r?\n/)
        .map(name => name.trim())
        .filter(name => name.length > 0);

    return (
        <div className="app-container">
            <h2>FDI Helper App</h2>

            <RegexInput value={regexPattern} onChange={setRegexPattern} />
            <SynonymInput value={baseSynonym} onChange={setBaseSynonym} />
            <SearchSynonyms searchTerm={baseSynonym} onSynonymsFetched={handleSynonymsFetched} showToast={showToast} />
            <TableInput value={tableNamesInput} onChange={setTableNamesInput} />
            <UserSelect value={selectedUser} onChange={setSelectedUser} />
            <ScriptGenerator
                tableNames={parsedTableNames}
                user={selectedUser}
                regexPattern={regexPattern}
                onScriptsGenerated={setScripts}
                onRegexResults={setRegexResults}
            />

            {regexResults && (
                <ResultsDisplay title="Regex Search Results" content={regexResults} onCopy={() =>
                    handleCopy(regexResults)} showCopyButton={false} />
            )}

            {scripts.outputScript && (
                <ResultsDisplay title="Output Script" content={scripts.outputScript} onCopy={() =>
                    handleCopy(scripts.outputScript)} />
            )}
            {scripts.selectScript && (
                <ResultsDisplay title="Select Script" content={scripts.selectScript} onCopy={() =>
                    handleCopy(scripts.selectScript)} />
            )}
            {scripts.selectAdminScript && (
                <ResultsDisplay title="Select Admin Script" content={scripts.selectAdminScript} onCopy={() =>
                    handleCopy(scripts.selectAdminScript)} />
            )}
            {scripts.synonymScript && (
                <ResultsDisplay title="Synonym Script" content={scripts.synonymScript} onCopy={() =>
                    handleCopy(scripts.synonymScript)} />
            )}

            <Toast message={toastMessage} />
        </div>
    );
};

export default App;
