import axios from 'axios';

const apiUrl = 'http://127.0.0.1:8000/api/promts/'; // Reemplaza con la URL real de tu API

const ApiService = {
  getSocialData: async (accessToken:any, page: number) => {
    try {
      const response = await axios.post(
        apiUrl,
        { page: page },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error('Error al obtener los datos');
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },
};

export default ApiService;
