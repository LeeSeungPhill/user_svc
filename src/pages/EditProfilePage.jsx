import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function EditProfilePage() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/users/${username}`, form);
      alert("회원정보가 수정되었습니다!");
      navigate("/profile");
    } catch {
      alert("수정 실패");
    }
  };

  return (
    <div className="form-container">
      <h2>회원정보 수정</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="새 이메일" onChange={handleChange} />
        <input name="password" type="password" placeholder="새 비밀번호" onChange={handleChange} />
        <button type="submit">저장</button>
      </form>
    </div>
  );
}

export default EditProfilePage;
