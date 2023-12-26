import { func } from 'prop-types';
import { useContext } from 'react';
import LocaleContext from '../context/LocaleContext';
import { useInput } from '../hooks/useInput';

const LoginInput = ({ login }) => {
  const [email, handleEmailChange] = useInput('');
  const [password, handlePasswordChange] = useInput('');
  const { locale } = useContext(LocaleContext);

  const onSubmitHandler = (event) => {
    event.preventDefault();

    login({
      email,
      password,
    });
  };

  return (
    <form onSubmit={onSubmitHandler} className="note-input">
      <input type="email" placeholder={locale === 'id' ? 'Masukan email ...' : 'Enter email ...'} value={email} onChange={handleEmailChange} required />
      <input type="password" placeholder={locale === 'id' ? 'Masukan password ...' : 'Enter password ...'} value={password} onChange={handlePasswordChange} required />
      <button>Masuk</button>
    </form>
  );
};

LoginInput.propTypes = {
  login: func.isRequired,
};

export default LoginInput;
