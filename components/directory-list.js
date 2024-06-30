// components/DirectoryList.js
import { useState } from 'react';
import PieChart from '@/components/pie-chart';

export default function DirectoryList() {
  const [selectedDir, setSelectedDir] = useState('');
  const [selectedFile, setSelectedFile] = useState('');

  const directories = ['anabaena', 'E. Coli', 'xxx'];
  const files = ['BP.csv', 'MF.csv', 'PC.csv'];

  const fileMappings = {
    'BP.csv': 'Biological Process',
    'MF.csv': 'Molecular Function',
    'PC.csv': 'Protain Class',
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
      <div className='left-panther-container'>
        {directories.map((dir) => (
          <div
            key={dir}
            onClick={() => handleDirClick(dir)}
            style={{
              padding: '10px',
              margin: '5px',
              cursor: 'pointer',
              backgroundColor: selectedDir === dir ? 'darkgray' : 'lightgray',
            }}
          >
            {dir}
          </div>
        ))}
      </div>
      <div className='right-panther-container'>
        {selectedDir && (
          <div>
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


