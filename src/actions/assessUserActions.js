import axios from 'axios';

export const createAssessUser = (user) => {
  return axios.post(`/api/v1/assessUsers`, user);
};

export const getAssessUser = () => {
  return axios.get(`/api/v1/assessUsers`);
};

export const SMS = (info) => {
  const requestConfig = {
    baseURL: SmsServer.baseUrl,
    auth: {
      username: SmsServer.username,
      password: SmsServer.password
    }
  };
  const request = axios.create(requestConfig);

  return request
    .post('/sms/1/text/single',
    {
      from: 'Assessment App',
      to: '+2348167304897',
      text: 'Test SMS from assessment app'
    })
    .then((response) => {
      console.log('response======>', response);
    })
    .catch((error) => {
      console.log('Error======>', error);
    });
};
