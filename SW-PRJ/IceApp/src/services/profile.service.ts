import clientApi from './api';

const getProfile = async () => {
  try {
    const response = await clientApi.get('/profile');
    return response.data;
  } catch (error) {
    console.log(error);
  }

  // return response.data;
};

const updateProfile = async profile => {
  try {
    const res = await clientApi.put('/profile', profile);
    if (res.status === 200) {
      return {
        status: 'OK',
        message: res.data.message,
      };
    } else {
      return {
        status: 'Failed',
        message: 'No content',
      };
    }
  } catch (error) {
    console.log(error);
    return {
      status: error.response.status,
      message: error.response.data.message,
    };
  }
};
