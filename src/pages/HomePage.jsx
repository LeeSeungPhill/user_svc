import React from "react";

function HomePage() {
  const token = localStorage.getItem("token");

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">홈 화면</h1>
      <p>현재 로그인 토큰: {token ? token : "로그인 필요"}</p>
    </div>
  );
}

export default HomePage;
