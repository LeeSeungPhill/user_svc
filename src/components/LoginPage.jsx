import { useState, useRef, useEffect } from "react";
import api from "../api/api";
import { saveTokens } from "../auth";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const acct_no_ref = useRef();

  useEffect(() => {
    acct_no_ref.current.focus();
  }, []);

  const handleLogin = async (e) => {
    // debugger;
    e.preventDefault();
    try {
      const res = await api.post("/login", new URLSearchParams({
        username: acct_no_ref.current.value,
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
        <input type="text" ref={acct_no_ref} placeholder="계좌번호 (acct_no)" />
        <input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">로그인</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p><a href="/register">회원가입</a></p>
    </div>
  );
}
