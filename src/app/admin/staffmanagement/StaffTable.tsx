import { changeUserStatus } from "@/apis/user.api";

import { IUser } from "@/interfaces/IUser";
import { useStaffStore } from "@/stores/useStaffStore";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, InputRef, Space, Table, notification } from "antd";
import {
  ColumnType,
  ColumnsType,
  FilterConfirmProps,
} from "antd/es/table/interface";
import React, { useRef, useState } from "react";

import { useRouter } from "next/navigation";

type DataIndex = keyof IUser;

const ClientTable: React.FunctionComponent = () => {
  const navigate = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const a = useRouter();

  const staff = useStaffStore((state) => state.staff);
  const filteredstaff = useStaffStore((state) => state.filteredStaff);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
    a.refresh();
  };

  

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<IUser> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    // render: (text) =>
    //   searchedColumn === dataIndex ? (
    //     <Highlighter
    //       highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
    //       searchWords={[searchText]}
    //       autoEscape
    //       textToHighlight={text ? text.toString() : ""}
    //     />
    //   ) : (
    //     text
    //   ),
  });

  const columns: ColumnsType<IUser> = [
    {
      title: "Name",
      dataIndex: "fullname",
      key: "fullname",
      width: "20%",
      ...getColumnSearchProps("fullname"),
      render: (value, record, index) => (
        <div className="flex items-center gap-7">
          <div>
            <img
              src={record.avatar || "/avatar.png"}
              alt="avatar"
              className="object-cover rounded-full w-9 h-9"
            />
          </div>
          <div className="flex flex-col gap-[2px]">
            <span className="text-sm font-medium">{record.fullname}</span>
          </div>
        </div>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      width: "15%",
      ...getColumnSearchProps("phone"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "20%",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: "10%",
    },
   
    
    
  ];

  return (
    <Table
      rowKey={"id"}
      columns={columns}
      //filteredClients ? filteredClients :
      dataSource={ staff}
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 10,
        position: ["bottomCenter"],
      }}
      scroll={{ x: true }}
      className="mb-10"
    />
  );
};

export default ClientTable;
