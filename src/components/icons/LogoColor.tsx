import Logo from '../../assets/logo-color.png';

interface LogoColorIconProps {
  className?: string;
}

export default function LogoColorIcon({ className }: LogoColorIconProps) {
  return <img src={Logo} alt="happyshop" className={className} />;
}
