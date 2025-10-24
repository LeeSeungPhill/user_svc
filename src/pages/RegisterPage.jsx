import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "", email: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/users/register", form);
      alert("회원가입 완료!");
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.detail || "회원가입 실패");
    }
  };

  return (
    <div className="form-container">
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="아이디" onChange={handleChange} />
        <input name="password" type="password" placeholder="비밀번호" onChange={handleChange} />
        <input name="email" placeholder="이메일" onChange={handleChange} />
        {error && <p className="error">{error}</p>}
        <button type="submit">등록</button>
      </form>
    </div>
  );
}

export default RegisterPage;
