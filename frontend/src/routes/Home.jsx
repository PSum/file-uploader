import axios from 'axios';
import { useState, useEffect } from 'react';
import fileImage from '../images/document.png'
import folderImage from '../images/folder.png'

// Home Component
export default function Home() {
  const [entries, setEntries] = useState([]);

  // Fetch data from the API
  async function fetchData() {
    try {
      const { data } = await axios.get('http://localhost:3000/api/items/home');
      setEntries(data);
    } catch (error) {
      console.error('Error accessing protected route:', error);
    }
  }

  return (
    <>
      <Contents entries={entries} fetchData={fetchData} />
    </>
  );
}

// BlockEntry Component
function BlockEntry({ fileType }) {
  let imageSrc;

  switch (fileType) {
    case 'FILE':
      imageSrc = fileImage;
      break;
    case 'FOLDER':
      imageSrc = folderImage;
      break;
    default:
      imageSrc = null;
  }

  return (
    <div>
      {imageSrc ? (
        <img src={imageSrc} alt={fileType} style={{ width: '100px', height: '100px' }} />
      ) : (
        <p>No status image available</p>
      )}
    </div>
  );
}

// Contents Component
function Contents({ entries, fetchData }) {
  useEffect(() => {
    fetchData();
  }, [fetchData]); // Include fetchData in dependency array

  return (
    <>
      {entries.map((entry) => (
        <div className='entry' key={entry.id}>
          <BlockEntry fileType={entry.type} />
          <div>Name of entry: {entry.name}</div>
        </div>
      ))}
    </>
  );
}