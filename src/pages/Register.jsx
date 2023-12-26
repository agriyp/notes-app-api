import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RegisterInput from '../components/RegisterInput';
import LocaleContext from '../context/LocaleContext';
import { register } from '../utils/network-data';

const Register = () => {
  const { locale } = useContext(LocaleContext);
  const navigate = useNavigate();
  async function onRegisterHandler(user) {
    const { error } = await register(user);
    if (!error) {
      navigate('/');
    }
  }

  return (
    <section className="register-page">
      <div>
        <h2>Register Page</h2>
        <p>{locale === 'id' ? 'Silahkan masukan data anda ...' : 'Please enter your data ...'}</p>
      </div>
      <RegisterInput register={onRegisterHandler} />
      <p>
        {locale === 'id' ? 'Sudah punya akun ?' : 'Already have an account ?'} <Link to="/">{locale === 'id' ? 'Masuk' : 'Login'}</Link>
      </p>
    </section>
  );
};

export default Register;
