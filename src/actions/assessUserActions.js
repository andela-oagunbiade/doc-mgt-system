import axios from 'axios';

export const createAssessUser = (user) => {
  return axios
    .post(`/api/v1/assessUsers`, user)
    .catch((error) => {
      const { message } = error.response.data;
      let errorMessage;
      switch (typeof message) {
        case 'string':
          errorMessage = message;
          break;
        default:
          errorMessage = 'Name, Phone Number or Email cannot be empty.';
      }
      return Promise.reject(errorMessage);
    });
};

export const getAssessUser = () => {
  return axios.get(`/api/v1/assessUsers`);
};

export const sendSMS = (sender, receiver, message) => {
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
      from: sender,
      to: receiver,
      text: message
    })
    .then((response) => {
      console.log('response======>', response);
    })
    .catch((error) => {
      console.log('Error======>', error);
    });
};
