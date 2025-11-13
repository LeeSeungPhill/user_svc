import React, { useEffect, useState } from "react";
import api from "../api/api";
import { logout } from "../auth";
import { useNavigate } from "react-router-dom";
import UserList from "./UserList";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [form, setForm] = useState({ nick_name: "", tel_no: "", change_pw: "",  app_key: "", app_secret: "", bot_token1: "", bot_token2: ""});
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProfile() {
      try {
        const token = localStorage.getItem("access_token");
        const res = await api.get("/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(res.data);
        setForm({
          nick_name: res.data.nick_name || "",
          tel_no: res.data.tel_no || "",
          change_pw: "",
          app_key: res.data.app_key || "",
          app_secret: res.data.app_secret || "",
          bot_token1: res.data.bot_token1 || "",
          bot_token2: res.data.bot_token2 || "",
        });
      } catch {
        logout();
        navigate("/login");
      }
    }
    fetchProfile();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const res = await api.put(
        "/me",
        {
          nick_name: form.nick_name,
          tel_no: form.tel_no,
          change_pw: form.change_pw || null,
          app_key: form.app_key,
          app_secret: form.app_secret,
          bot_token1: form.bot_token1,
          bot_token2: form.bot_token2,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("프로필이 수정되었습니다.");
      setProfile(res.data);
      setEditMode(false);
      setForm({ ...form, change_pw: "" });
      // UserList 리프레시 트리거
      setRefreshKey((prev) => prev + 1);
    } catch (err) {
      console.error(err);
      alert("프로필 수정에 실패했습니다.");
    }
  };

  if (!profile) return <p>Loading...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>내 정보</h2>
      {!editMode ? (
        <>
          <p><b>계좌번호 :</b> {profile.acct_no}</p>
          <p><b>닉네임 :</b> {profile.nick_name}</p>
          <p><b>전화번호 :</b> {profile.tel_no}</p>
          <p><b>app_key :</b> {profile.app_key}</p>
          <p><b>app_secret :</b> {profile.app_secret}</p>
          <p><b>텔레그램 토큰 :</b> {profile.bot_token1}</p>
          <p><b>종목검색 토큰 :</b> {profile.bot_token2}</p>
          <p><b>시스템 토큰 생성일시 :</b> {profile.token_publ_date}</p>

          <button
            onClick={() => setEditMode(true)}
            style={{ marginRight: "1rem" }}
          >
            프로필 수정
          </button>
          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            로그아웃
          </button>
        </>
      ) : (
        <>
          <div style={{ marginBottom: "1rem" }}>
            <label>닉네임 : </label>
            <input
              type="text"
              name="nick_name"
              value={form.nick_name}
              onChange={handleChange}
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label>전화번호 : </label>
            <input
              type="text"
              name="tel_no"
              value={form.tel_no}
              onChange={handleChange}
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label>비밀번호 변경 : </label>
            <input
              type="password"
              name="change_pw"
              value={form.change_pw}
              onChange={handleChange}
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label>app_key : </label>
            <input
              type="text"
              name="app_key"
              value={form.app_key}
              onChange={handleChange}
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label>app_secret : </label>
            <input
              type="text"
              name="app_secret"
              value={form.app_secret}
              onChange={handleChange}
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label>텔레그램 토큰 : </label>
            <input
              type="text"
              name="bot_token1"
              value={form.bot_token1}
              onChange={handleChange}
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label>종목검색 토큰 : </label>
            <input
              type="text"
              name="bot_token2"
              value={form.bot_token2}
              onChange={handleChange}
            />
          </div>
          <button onClick={handleUpdate} style={{ marginRight: "1rem" }}>
            저장
          </button>
          <button onClick={() => setEditMode(false)}>취소</button>
        </>
      )}

      <hr style={{ margin: "2rem 0" }} />
      <UserList key={profile?.updated_at || Date.now()} />
      {/* - key: 프로필이 업데이트될 때마다 컴포넌트를 강제로 리렌더링하도록 함
          - profile.updated_at 값이 없을 경우, Date.now()를 사용해 새 키를 생성함
          - 이렇게 하면 프로필 수정 후 UserList가 자동 새로고침됨 */}
    </div>
  );
}
