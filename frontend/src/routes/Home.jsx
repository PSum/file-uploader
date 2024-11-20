import axios from 'axios';
import { useState, useEffect } from 'react';

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
      <Contents entries={entries} fetchData={fetchData}></Contents>
    </div>
  );
}

function Contents ({ entries, fetchData }) {
  useEffect(() => {
    fetchData()
    const data =  entries.map((entry) => {
      return (
        (`hallo ${entry.name}`)
      )
    })
    console.log(entries);
    console.log(data);
  }, [])

  return (
    <div>Contents component</div>
  )
}