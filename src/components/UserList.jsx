import React, { useEffect, useState, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import api from "../api/api";
import { logout } from "../auth";
import { useNavigate } from "react-router-dom";

export default function UserList() {
  
  ModuleRegistry.registerModules([AllCommunityModule]);

  const [rowData, setRowData] = useState([]);
  const [columnDefs] = useState([
    { headerName: "계좌번호", field: "acct_no", sortable: true, filter: true },
    { headerName: "닉네임", field: "nick_name", sortable: true, filter: true },
    { headerName: "전화번호", field: "tel_no", sortable: true },
    { headerName: "app_key", field: "app_key", sortable: true },
    { headerName: "app_secret", field: "app_secret", sortable: true },
    { headerName: "텔레그램토큰", field: "bot_token1", sortable: true },
    { headerName: "종목검색토큰", field: "bot_token2", sortable: true },
    { headerName: "시스템토큰생성일시", field: "token_publ_date", sortable: true },
  ]);

  const navigate = useNavigate();

  const fetchUserList = useCallback(async () => {
    try {
      const token = localStorage.getItem("access_token");
      const res = await api.get("/userlist", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRowData(res.data);
    } catch {
      logout();
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    fetchUserList();
  }, [fetchUserList]);

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <h2 style={{ margin: "20px" }}>사용자 목록</h2>
      <div
        className="ag-theme-quartz"
        style={{
          height: "80%",
          width: "90%",
          margin: "auto",
          borderRadius: "12px",
        }}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10}
          rowSelection="single"
          animateRows={true}
        />
      </div>
    </div>
  );
}
