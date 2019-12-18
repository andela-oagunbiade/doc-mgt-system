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

export const addNigeriaCountryPrefix = (number) => {
  const numArray = number.split('');
  if (numArray[0] === '0') {
    numArray.splice(0, 1);
  }
  return `+234${numArray.join('')}`;
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
      to: addNigeriaCountryPrefix(receiver),
      text: message
    });
};
