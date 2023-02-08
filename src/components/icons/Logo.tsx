import Logo from '../../assets/logo.png';

interface LogoIconProps {
  className?: string;
}

export default function LogoIcon({ className }: LogoIconProps) {
  return <img src={Logo} alt="happyshop" className={className} />;
}
