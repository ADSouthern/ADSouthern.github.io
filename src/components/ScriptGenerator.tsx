import React from 'react';

interface Props {
  tableNames: string[];
  user: string;
  regexPattern: string;
  onScriptsGenerated: (scripts: {
    outputScript: string;
    selectScript: string;
    selectAdminScript: string;
    synonymScript: string;
  }) => void;
  onRegexResults: (results: string) => void;
}

const ScriptGenerator: React.FC<Props> = ({
  tableNames, user, regexPattern, onScriptsGenerated, onRegexResults

}) => {
  const generateScripts = () => {
    const outputScript = tableNames.map(name => 
      `-- As OAX_USER (Grant for ${user} and ADMIN)
GRANT SELECT ON "OAX$DW"."${name}" TO ${user};
-- As ${user} {add schema to Synonym} (Or ADMIN)
CREATE OR REPLACE EDITIONABLE SYNONYM "${user}"."${name}" FOR "OAX$DW"."${name}";
`
    ).join("\n");

    const selectScript = tableNames.map(name =>
      `GRANT SELECT ON "OAX$DW"."${name}" TO ${user};`
    ).join("\n");

    const selectAdminScript = tableNames.map(name =>
      `GRANT SELECT ON "OAX$DW"."${name}" TO ADMIN;`
    ).join("\n");

    const synonymScript = tableNames.map(name =>
      `CREATE OR REPLACE EDITIONABLE SYNONYM "${user}"."${name}" FOR "OAX$DW"."${name}";`
    ).join("\n");

    onScriptsGenerated({ outputScript, selectScript, selectAdminScript, synonymScript });
  };


    const performRegexSearch = () => {
        const pattern = new RegExp(regexPattern, 'i');
        console.log(regexPattern);
        const simulatedFiles: Record<string, string[]> = {
            DW_FA_BANK_ACCOUNT_ALL_D: ['GROSS_PAY', 'NET_INCOME'],
            DW_BALANCING_SEGMENT_D: ['ALLOWANCE', 'DEPARTMENT'],
            DW_WRKFRC_ASG_SNAPSHOT_F: ['OVERTIME_HOURS', 'EMPLOYEE_ID']
        };

        let results = '';

        tableNames.forEach(name => {
            const columns = simulatedFiles[name];
            if (!columns) {
                results += `File not found for ${name}\n\n`;
                return;
            }

            const matches = columns.filter(col => pattern.test(col));
            if (matches.length > 0) {
                results += `Matches in ${name}:\n`;
                matches.forEach(match => {
                    results += `  - ${match}\n`;
                });
                results += '\n';
            } else {
                results += `No matches found in ${name}\n\n`;
            }
        });

        onRegexResults(results);
    };

    return (
        <div style={{ marginTop: '20px' }}>
            <button onClick={generateScripts} style={{ backgroundColor: '#5e5e5e', color: '#ffffff', marginRight: '10px' }}>
                Generate Scripts
            </button>
            <button onClick={performRegexSearch} style={{ backgroundColor: '#5e5e5e', color: '#ffffff' }}>
                Search Columns with Regex
            </button>
        </div>
    );
};

export default ScriptGenerator;