import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="footer mt-auto bg-base-200 py-8 px-4">
      <div className="flex gap-6">
        <Link to="/" className="link-hover link">
          사용 규칙 • 이용 약관
        </Link>
        <Link to="/" className="link-hover link">
          민원신고
        </Link>
      </div>
    </footer>
  );
};
