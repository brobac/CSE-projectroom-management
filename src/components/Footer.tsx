import { useLogout } from "@services";
import { useUserState } from "@stores";
import { Link } from "react-router-dom";

export const Footer = () => {
  const { mutate: logout } = useLogout();
  const { hasAuth } = useUserState();
  return (
    <footer className="footer mt-auto bg-base-200 py-8 px-4">
      <div className="flex gap-6">
        <a
          href="https://east-character-a95.notion.site/c3e18ec5387046a08d14428afe10c1aa"
          target="_blank"
          rel="noreferrer"
          className="link-hover"
        >
          이용안내
        </a>
        {hasAuth && (
          <button onClick={() => logout()} className="link-hover link">
            로그아웃
          </button>
        )}
      </div>
    </footer>
  );
};
