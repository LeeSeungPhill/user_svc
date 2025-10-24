import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function ProfilePage() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const [user, setUser] = useState(null);

  useEffect(() => {
    api.get(`/users/${username}`)
      .then((res) => setUser(res.data))
      .catch(() => alert("사용자 정보를 불러올 수 없습니다."));
  }, [username]);

  if (!user) return <p>로딩중...</p>;

  return (
    <div className="p-6">
      <h2>{user.username}님의 정보</h2>
      <p>이메일: {user.email}</p>
      <button onClick={() => navigate("/edit-profile")}>수정하기</button>
      <button onClick={() => { localStorage.clear(); navigate("/"); }}>로그아웃</button>
    </div>
  );
}

export default ProfilePage;
