import CategoryTag from "@/components/CategoryTag";
import { IDish } from "@/interfaces/IDish";

import { useDishStore } from "@/stores/useDishStore";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, InputRef, Rate, Space, Table } from "antd";
import {
  ColumnType,
  ColumnsType,
  FilterConfirmProps,
} from "antd/es/table/interface";
import React, { useRef, useState } from "react";
// import Highlighter from "react-highlight-words";
import EditProductModal from "./EditDishModal";

type DataIndex = keyof IDish;

const DishTable: React.FunctionComponent = () => {
  const [show, setShow] = useState<boolean>(false);
  const [edittedDish, setEdittedDish] = useState<IDish>();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const products = useDishStore((state) => state.dishes);


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
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<IDish> => ({
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

  const columns: ColumnsType<IDish> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "15%",
      ...getColumnSearchProps("name"),
      render: (value, record, index) => (
        <span className="font-medium">{value}</span>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: "20%",
    },
    
    {
      title: "",
      dataIndex: "edit",
      key: "edit",
      width: "5%",
      render: (value, record, index) => (
        <span
          className="cursor-pointer text-primary"
          onClick={() => {
            setEdittedDish(record);
            console.log(record);
            setShow(true);
          }}
        >
          Edit
        </span>
      ),
    },
  ];

  return (
    <>
      <Table
        rowKey={"id"}
        columns={columns}
        dataSource={products}
        pagination={{
          pageSize: 6,
          position: ["bottomCenter"],
        }}
        scroll={{ x: true }}
        className="mb-10"
      />
      {show && edittedDish && (
        <EditProductModal show={show} setShow={setShow} data={edittedDish} />
      )}
    </>
  );
};

export default DishTable;
