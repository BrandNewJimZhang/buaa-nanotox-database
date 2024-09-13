// components/DirectoryList.js
import { useState } from 'react';
import PieChart from '@/components/pie-chart';

export default function DirectoryList() {
  const [selectedDir, setSelectedDir] = useState('');
  const [selectedFile, setSelectedFile] = useState('');

  const directories = ['Arthrobacter_globiformis', 'Bacillus_altitudinis', 'Bacillus_subtilis', 'Brachionus_calyciflorus', 'Caenorhabditis_elegans', 'Chlorella_vulgaris', 'Daphnia_Pulex', 'Daphnia_galeata', 'Diat', 'Lolium_per', 'Lytechinus_pictus', 'Mytilus_galloprovincialis', 'Nitrosomonas_europaea ATCC 19718', 'Oncorhynchus_mykiss', 'Oreochromis_niloticus', 'Phaeodactylum_tricornutu', 'Photobacterium_phosphoreu', 'Pseudomonas _aeruginosa', 'Pseudomonas_putida', 'Raphanus_sativus', 'Raphidocelis_Subcapitata', 'Sea_urchi', 'Staphylococcus_aureus', 'Vibrio_Fischeri', 'anabaena', 'cyprinus_carpi', 'danio_reri', 'daphnia_magna', 'ryzias_latipes', 'tetrahymena_thermophila'];

  const dirMappings = {
    'Arthrobacter_globiformis': 'Arthrobacter globiformis',
    'Bacillus_altitudinis': 'Bacillus altitudinis',
    'Bacillus_subtilis': 'Bacillus subtilis',
    'Brachionus_calyciflorus': 'Brachionus calyciflorus',
    'Caenorhabditis_elegans': 'Caenorhabditis elegans',
    'Chlorella_vulgaris': 'Chlorella vulgaris',
    'Daphnia_Pulex': 'Daphnia Pulex',
    'Daphnia_galeata': 'Daphnia galeata',
    'Diat': 'Diat',
    'Lolium_per': 'Lolium per',
    'Lytechinus_pictus': 'Lytechinus pictus',
    'Mytilus_galloprovincialis': 'Mytilus galloprovincialis',
    'Nitrosomonas_europaea ATCC 19718': 'Nitrosomonas europaea ATCC 19718',
    'Oncorhynchus_mykiss': 'Oncorhynchus mykiss',
    'Oreochromis_niloticus': 'Oreochromis niloticus',
    'Phaeodactylum_tricornutu': 'Phaeodactylum tricornutu',
    'Photobacterium_phosphoreu': 'Photobacterium phosphoreu',
    'Pseudomonas _aeruginosa': 'Pseudomonas aeruginosa',
    'Pseudomonas_putida': 'Pseudomonas putida',
    'Raphanus_sativus': 'Raphanus sativus',
    'Raphidocelis_Subcapitata': 'Raphidocelis Subcapitata',
    'Sea_urchi': 'Sea urchi',
    'Staphylococcus_aureus': 'Staphylococcus aureus',
    'Vibrio_Fischeri': 'Vibrio Fischeri',
    'anabaena': 'anabaena',
    'cyprinus_carpi': 'cyprinus carpi',
    'danio_reri': 'danio reri',
    'daphnia_magna': 'daphnia magna',
    'ryzias_latipes': 'ryzias latipes',
    'tetrahymena_thermophila': 'tetrahymena thermophila',
  };

  const files = ['BP.csv', 'MF.csv', 'PC.csv'];

  const fileMappings = {
    'BP.csv': 'Biological Process',
    'MF.csv': 'Molecular Function',
    'PC.csv': 'Protein Class',
  };

  const handleDirClick = (dir) => {
    setSelectedDir(dir);
    setSelectedFile('');  // Reset file selection when directory changes
  };

  const handleFileClick = (file) => {
    setSelectedFile(file);
  };

  return (
    <div className='panther-container'>
      <div className='left-panther-container' style={{'overflow-y': 'auto'}}>
        {directories.map((dir) => (
          <div
            key={dir}
            onClick={() => handleDirClick(dir)}
            style={{
              padding: '3px 10px',
              margin: '5px',
              cursor: 'pointer',
              backgroundColor: selectedDir === dir ? 'darkgray' : 'lightgray',
            }}
          >
            {dirMappings[dir] || dir}
          </div>
        ))}
      </div>
      <div className='right-panther-container'>
        {selectedDir && (
          <div style={{display: 'flex'}}>
            {files.map((file) => (
              <div
                key={file}
                onClick={() => handleFileClick(file)}
                style={{
                  padding: '10px',
                  margin: '5px',
                  cursor: 'pointer',
                  backgroundColor: selectedFile === file ? 'darkgray' : 'lightgray',
                }}
              >
                {fileMappings[file] || file}
              </div>
            ))}
          </div>
        )}
        {selectedDir && selectedFile && (
          <PieChart directory={selectedDir} file={selectedFile} />
        )}
      </div>
      {selectedDir && selectedFile && (
        <PieChart directory={selectedDir} file={selectedFile} />
      )}
    </div>
  );
};


