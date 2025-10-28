import { useEffect, useState } from "react";
import api from "../api/api";
import { logout } from "../auth";
import { useNavigate } from "react-router-dom";

export default function UserList() {
  const [userlist, setUserlist] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUserList() {
      try {
        const token = localStorage.getItem("access_token");
        const res = await api.get("/userlist", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserlist(res.data);
      } catch {
        logout();
        navigate("/login");
      }
    }
    fetchUserList();
  }, [navigate]);

  if (!userlist) return <p>Loading...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>사용자 목록</h2>
      {userlist.length === 0 ? (
        <p>등록된 사용자가 없습니다.</p>
      ) : (
        <table border="1" cellPadding="8" style={{ width: "100%", textAlign: "left" }}>
          <thead>
            <tr>
              <th>계좌번호</th>
              <th>닉네임</th>
              <th>전화번호</th>
              <th>app_key</th>
              <th>app_secret</th>
              <th>텔레그램 토큰</th>
              <th>종목검색 토큰</th>
              <th>시스템 토큰 생성일시</th>
            </tr>
          </thead>
          <tbody>
            {userlist.map((acc, index) => (
              <tr key={index}>
                <td>{acc.acct_no}</td>
                <td>{acc.nick_name}</td>
                <td>{acc.tel_no}</td>
                <td>{acc.app_key}</td>
                <td>{acc.app_secret}</td>
                <td>{acc.bot_token1}</td>
                <td>{acc.bot_token2}</td>
                <td>{acc.token_publ_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
