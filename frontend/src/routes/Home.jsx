import axios from 'axios';
import { useState, useEffect } from 'react';
import fileImage from '../images/document.png'
import folderImage from '../images/folder.png'

export default function Home() {
  const [entries, setEntries] = useState([]);


async function fetchData () {
        try {
            const { data } = await axios.get('http://localhost:3000/api/items/home', )
            setEntries(data);
            console.log('Data fetched succesfull')
        } catch (error) {
            console.error('Error accessing protected route:', error);
        }
    } 


  return (
    <div>
      <Contents entries={entries} fetchData={fetchData} blockEntry={BlockEntry}></Contents>
    </div>
  );

}


  function BlockEntry ({ fileType }) {
    let imageSrc;
    switch(fileType) {
      case 'FILE':
        imageSrc = fileImage;
        break;
      case 'Folder':
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

function Contents ({ entries, fetchData, BlockEntry }) {
  useEffect(() => {
    fetchData()
  }, [])
    const data =  entries.map((entry) => {
      return (
        <div key={entry.key}>
          <div>Name of entry: {entry.name}</div>
          <div>
            <BlockEntry fileType={entry.type}></BlockEntry>
          </div>
        </div>
      );
    })
    console.log(data);

  return (
    <div>{data}</div>
  )
}