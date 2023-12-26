import { func } from 'prop-types';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import LoginInput from '../components/LoginInput';
import LocaleContext from '../context/LocaleContext';
import { login } from '../utils/network-data';

const Login = ({ loginSuccess }) => {
  const { locale } = useContext(LocaleContext);
  async function onLogin({ email, password }) {
    const { error, data } = await login({ email, password });

    if (!error) {
      loginSuccess(data);
    }
  }

  return (
    <section className="login-page">
      <div>
        <h2>Login Page</h2>
        <p>{locale === 'id' ? 'Silakan masuk untuk melanjutkan ...' : 'Please log in to continue ...'}</p>
      </div>
      <LoginInput login={onLogin} />
      <p>
        {locale === 'id' ? 'Belum punya akun ?' : "Don't have an account ?"} <Link to="/register">{locale === 'id' ? 'Daftar di sini.' : 'Register here.'}</Link>
      </p>
    </section>
  );
};

Login.propTypes = {
  loginSuccess: func.isRequired,
};

export default Login;
