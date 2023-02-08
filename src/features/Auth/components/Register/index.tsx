import { RegisterField } from '../../types';
import RegisterForm from '../RegisterForm';

interface RegisterProps {
  onCloseDialog?: () => void;
}

export default function Register({ onCloseDialog }: RegisterProps) {
  const handleSubmit = async (values: RegisterField) => {};
  return (
    <div>
      <RegisterForm onSubmit={handleSubmit} />
    </div>
  );
}
