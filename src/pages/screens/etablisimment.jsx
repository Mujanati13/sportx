import React from "react";
import TableEtablisimment from "../equipments/etablisimment/table";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

function Etablisiment() {
  return (
    <div className="w-full p-2">
      <div className="mt-3 w-52">
        <Input prefix={<SearchOutlined />} placeholder="Search Etablisimment" />
      </div>
      <div className="mt-5">
        <TableEtablisimment />
      </div>
    </div>
  );
}

export default Etablisiment;
