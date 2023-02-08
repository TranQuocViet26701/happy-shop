import LoginForm from '../LoginForm';

interface LoginProps {
  onCloseDialog?: () => void;
}

export default function Login({ onCloseDialog }: LoginProps) {
  const handleSubmit = async () => {};
  return (
    <div>
      <LoginForm onSubmit={handleSubmit} />
    </div>
  );
}
