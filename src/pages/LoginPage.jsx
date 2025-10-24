import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/users/login", form);
      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("username", form.username);
      navigate("/profile");
    } catch {
      setError("로그인 실패: 아이디 또는 비밀번호를 확인하세요.");
    }
  };

  return (
    <div className="form-container">
      <h2>로그인</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="아이디" onChange={handleChange} />
        <input name="password" type="password" placeholder="비밀번호" onChange={handleChange} />
        {error && <p className="error">{error}</p>}
        <button type="submit">로그인</button>
      </form>
      <button onClick={() => navigate("/register")}>회원가입</button>
    </div>
  );
}

export default LoginPage;
