import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [acct_no, setAcctNo] = useState("");
  const [nick, setNick] = useState("");
  const [tel, setTel] = useState("");
  const [password, setPassword] = useState("");
  const [app_key, setAppKey] = useState("");
  const [app_secret, setAppSecret] = useState("");
  const [bot_token1, setBotToken1] = useState("");
  const [bot_token2, setBotToken2] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post("/register", {
        acct_no: parseInt(acct_no),
        nick_name: nick,
        tel_no: tel,
        login_pw: password,
        app_key: app_key,
        app_secret: app_secret,
        bot_token1: bot_token1,
        bot_token2: bot_token2,
      });
      alert("회원가입 완료! 로그인해주세요.");
      navigate("/login");
    } catch (err) {
      alert("회원가입 실패");
    }
  };

  return (
    <div>
      <h2>회원가입</h2>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="계좌번호" value={acct_no} onChange={(e) => setAcctNo(e.target.value)} />
        <input type="text" placeholder="닉네임" value={nick} onChange={(e) => setNick(e.target.value)} />
        <input type="text" placeholder="전화번호" value={tel} onChange={(e) => setTel(e.target.value)} />
        <input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="text" placeholder="app_key" value={app_key} onChange={(e) => setAppKey(e.target.value)} />
        <input type="text" placeholder="app_secret" value={app_secret} onChange={(e) => setAppSecret(e.target.value)} />
        <input type="text" placeholder="텔레그램 토큰" value={bot_token1} onChange={(e) => setBotToken1(e.target.value)} />
        <input type="text" placeholder="종목검색 토큰" value={bot_token2} onChange={(e) => setBotToken2(e.target.value)} />
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
}
