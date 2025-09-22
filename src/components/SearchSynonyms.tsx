import React from 'react';

interface Props {
  searchTerm: string;
  onSynonymsFetched: (synonyms: string[]) => void;
  showToast: (message: string) => void;
}

const SearchSynonyms: React.FC<Props> = ({ searchTerm, onSynonymsFetched, showToast }) => {
  const handleSearch = async () => {
    try {
      const filterTerm = `DW_${searchTerm.toUpperCase()}_`;
      console.log(filterTerm);
      const mockSynonyms = [
        "DW_FA_BANK_ACCOUNT_ALL_D",
        "DW_FA_BALANCING_SEGMENT_D",
        "DW_FA_WRKFRC_ASG_SNAPSHOT_F",
        "DW_BALANCING_SEGMENT_D",
        "DW_WRKFRC_ASG_SNAPSHOT_F"
      ].filter(s => s.startsWith(filterTerm));
      if (mockSynonyms.length > 0) {
        onSynonymsFetched(mockSynonyms);
      } else {
        showToast("No synonyms found.");
      }
    } catch (error) {
      showToast(`Error fetching synonyms. ${error}`);
    }
  };

  return (
    <div>
      <button onClick={handleSearch} style={{ backgroundColor: '#5e5e5e', color: '#ffffff' }}>
        Search Synonyms
      </button>
    </div>
  );
};

export default SearchSynonyms;