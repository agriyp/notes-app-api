import { func } from 'prop-types';
import { useContext } from 'react';
import LocaleContext from '../context/LocaleContext';
import { useInput } from '../hooks/useInput';

const RegisterInput = ({ register }) => {
  const [name, handleNameChange] = useInput('');
  const [email, handleEmailChange] = useInput('');
  const [password, handlePasswordChange] = useInput('');
  const [confirmPassword, handleConfirmPasswordChange] = useInput('');
  const { locale } = useContext(LocaleContext);

  const onSubmitHandler = (event) => {
    event.preventDefault();

    password === confirmPassword
      ? register({
          name,
          email,
          password,
        })
      : alert('Password not match');
  };

  return (
    <form onSubmit={onSubmitHandler} className="note-input">
      <input type="text" placeholder={locale === 'id' ? 'Masukan nama ...' : 'Enter name ...'} value={name} onChange={handleNameChange} required />
      <input type="email" placeholder={locale === 'id' ? 'Masukan email ...' : 'Enter email ...'} value={email} onChange={handleEmailChange} required />
      <input type="password" placeholder={locale === 'id' ? 'Masukan password ...' : 'Enter password ...'} autoComplete="current-password" value={password} onChange={handlePasswordChange} required />
      <input
        type="password"
        placeholder={locale === 'id' ? 'Masukan konfirmasi password ...' : 'Enter confirm password ...'}
        autoComplete="current-password"
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
        required
      />
      <button>Register</button>
    </form>
  );
};

RegisterInput.propTypes = {
  register: func.isRequired,
};

export default RegisterInput;
