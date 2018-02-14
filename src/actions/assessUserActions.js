import axios from 'axios';

export const createAssessUser = (user) => {
  return axios.post(`/api/v1/assessUsers`, user);
};

export const getAssessUser = () => {
  return axios.get(`/api/v1/assessUsers`);
};
