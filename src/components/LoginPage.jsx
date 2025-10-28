import { useState } from "react";
import api from "../api/api";
import { saveTokens } from "../auth";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [acct_no, setAcctNo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/login", new URLSearchParams({
        username: acct_no,
        password: password,
      }));
      saveTokens(res.data.access_token, res.data.refresh_token);
      navigate("/profile");
    } catch (err) {
      setError("로그인 실패. 아이디 또는 비밀번호 확인.");
    }
  };

  return (
    <div className="login-container">
      <h2>로그인</h2>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="계좌번호 (acct_no)" value={acct_no} onChange={(e) => setAcctNo(e.target.value)} />
        <input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">로그인</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p><a href="/register">회원가입</a></p>
    </div>
  );
}
