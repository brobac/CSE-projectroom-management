import { useLogout } from "@services";
import { useUserState } from "@stores";
import { Link } from "react-router-dom";

export const Footer = () => {
  const { mutate: logout } = useLogout();
  const { hasAuth } = useUserState();
  return (
    <footer className="footer mt-auto bg-base-200 py-8 px-4">
      <div className="flex gap-6">
        {hasAuth && (
          <button onClick={() => logout()} className="link-hover link">
            로그아웃
          </button>
        )}
      </div>
    </footer>
  );
};
