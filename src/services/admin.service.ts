import axios from 'axios';

export {
  getUser,
  login,
  register,
  jwtValidate,
  forgotPassword,
  passwordRecovery,
  passwordChange,
  updateUserData,
};

// AXIOS CONFIG
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// GET ADMIN
const getUser = async (jwt: string, id: string) => {
  return axios
    .get('admin/' + id, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error.response;
    });
};

// LOGIN

interface ILoginProps {
  username: string;
  password: string;
}

const login = async (params: ILoginProps) => {
  return axios({
    method: 'post',
    url: 'admin/login',
    data: params,
  })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error.response;
    });
};

// REGISTER

interface IRegister {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const register = async (params: IRegister) => {
  try {
    const data = await axios.post('admin/register', params, {
      headers: {
        Authorization: `Bearer `,
      },
    });
    return data;
  } catch (error: any) {
    return error.response;
  }
};

// JWT/SESSION VALIDATE
const jwtValidate = (jwt: string) => {
  return axios
    .post(
      'session',
      {},
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    )
    .then((data) => {
      if (window.location.pathname === '/no-service') {
        window.location.href = '/';
      }
      return data;
    })
    .catch((error) => {
      if (error.resonse) {
        return error.response;
      } else {
        setTimeout(() => {
          window.location.href = '/no-service';
        }, 10 * 1000);
        return null;
      }
    });
};

// FORGOT/RESET PASSWORD
const forgotPassword = (jwt: string, email: string) => {
  return axios
    .post(
      'admin/password-reset',
      { email },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    )
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error.response;
    });
};

// RECOVERY PASSWORD

interface IPasswordRecovery {
  newPassword: string;
  confirmPassword: string;
  passwordResetToken: string;
}

const passwordRecovery = async (params: IPasswordRecovery) => {
  return axios
    .post('admin/password-recovery', params, {
      headers: {
        Authorization: `Bearer `,
      },
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error.response;
    });
};

// UPDATE PASSWORD

interface IPasswordChange {
  newPassword: string;
  confirmPassword: string;
  currentPassword: string;
}

const passwordChange = async (
  jwt: string,
  id: string,
  params: IPasswordChange
) => {
  return axios
    .put('admin/password-change/' + id, params, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error.response;
    });
};

// UPDATE USER DATA

interface IUserData {
  username: string;
  firstName: string;
  lastName: string;
}

const updateUserData = async (jwt: string, id: string, params: IUserData) => {
  return axios
    .put('admin/' + id, params, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error.response;
    });
};
