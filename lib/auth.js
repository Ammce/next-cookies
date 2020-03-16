import axios from 'axios';

axios.defaults.withCredentials = true;

export const autuUser = async (email, password) => {
  const { data, status } = await axios.post('/api/login', { email, password });
  console.log(data, status);
};

export const getUserProfile = async () => {
  const { data } = await axios.get('/api/profile');
  return data;
};
