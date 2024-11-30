import axios from 'axios';

export default async function fetchData () {
    try {
      const { data } = await axios.get(`http://localhost:3000/api/items/home`);
      return data;
    } catch (error) {
        throw error
    }
}