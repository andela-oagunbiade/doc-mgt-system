import axios from 'axios';

export const createAssessUser = (user) => {
  return axios.post(`/api/v1/assessUsers`, user)
    .then((response) => {
      return response;
    }).catch((error) => {
      return Promise.reject(error);
    });
};

