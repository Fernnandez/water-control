import api from '../config/axios';
function useDevice() {
  async function createDevice(data: any) {
    try {
      const response = await api.post('/devices/', data);
      return response;
    } catch (err: any) {
      throw new Error(err);
    }
  }
  async function getAll() {
    try {
      const response = await api.get('/devices');
      if (response) return response.data;
    } catch (err: any) {
      throw new Error(err);
    }
  }
  // async function destroyThing(id: string) {
  //   try {
  //     const response = await api.delete(`/devices/${id}`);
  //     if (response) return response.data;
  //   } catch (err: any) {
  //     throw new Error(err);
  //   }
  // }
  return {
    createDevice,
    getAll,
  };
}

export default useDevice;
