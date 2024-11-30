// Add function to "Home"-Button to go back to the home-level of files
import axios from 'axios';
import { useState, useEffect } from 'react';
import fileImage from '../images/document.png'
import folderImage from '../images/folder.png'
import fetchData from '../api/fetchData.jsx'

// Home Component
export default function Home() {
  const [entries, setEntries] = useState([]);

  // Fetch data from the API
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchData();
        setEntries(data);
      } catch (error) {
        console.log("Error in fetching data", error);
      }
    };
    getData();
  }, []);
  
  return (
    <>
      <Contents setEntries={setEntries} entries={entries} fetchData={fetchData} />
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
function Contents({ setEntries, entries, fetchData }) {
  useEffect(() => {
    fetchData();
  }, []); 

  return (
    <>
      {entries.map((entry) => (
        <div onClick={() => changeAddress(entry, setEntries)} className='entry' key={entry.id}>
          <BlockEntry fileType={entry.type} />
          <div>Name of entry: {entry.name}</div>
        </div>
      ))}
    </> 
  );
}

async function changeAddress( entry, setEntries ) {
  if (entry.type == "FOLDER") {
    try {
      console.log(entry.id)
      const { data } = await axios.get(`http://localhost:3000/api/items/${entry.id}`);
      setEntries(data);
    } catch (error) {
      console.error('Error accessing protected route:', error);
    }

    // setEntries([])
  }
  else {
    console.log("not folder")
  }
}