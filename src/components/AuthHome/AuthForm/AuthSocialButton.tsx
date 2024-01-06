import { Button } from "../../../@/components/ui/button";
import { IconType } from "react-icons";

interface AuthSocialButtonProps {
  icon: IconType;
  onClick: () => void;
}

const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({
  icon: Icon,
  onClick,
}) => {
  return (
    <div className="pt-5">
      <Button className="border w-full " onClick={onClick}>
        <Icon />
      </Button>
    </div>
  );
};

export default AuthSocialButton;
