import api from '../config/axios';
function useDevice() {
  async function createDevice(data: any) {
    const response = await api.post('/devices/', data);
    return response.data;
  }
  async function getAll() {
    const response = await api.get('/devices');
    if (response) return response.data;
  }

  return {
    createDevice,
    getAll,
  };
}

export default useDevice;
