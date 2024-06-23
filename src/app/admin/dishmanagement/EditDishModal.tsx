'use client'
import {
  deleteProductById,
  getProductById,
  updateProductById,
} from "@/apis/product.api";

import {
  deleteDishById,
  getDishById,
  updateDishById,
  
}from "@/apis/dish.api"
import { app } from "@/firebase";
import { IProduct } from "@/interfaces/IProduct";
import { useBrandStore } from "@/stores/useBrandStore";
import { useCategoriesStore } from "@/stores/useCategoryStore";
import { useProductStore } from "@/stores/useProductStore";
import validator from "@/utils/validateImage";
import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  InputRef,
  Modal,
  Row,
  Select,
  Skeleton,
  Space,
  Upload,
  message,
  notification,
} from "antd";
import { RcFile, UploadFile, UploadProps } from "antd/es/upload";
import {
  getBlob,
  getDownloadURL,
  getMetadata,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useDishStore } from "@/stores/useDishStore";

interface IEditDishModalProps {
  show: boolean;
  setShow: any;
  data: IProduct;
}

const EditDishModal: React.FunctionComponent<IEditDishModalProps> = ({
  show,
  setShow,
  data,
}) => {
  const storage = getStorage(app);
  console.log(storage);
  const navigate = useRouter();
  //const categories = useCategoriesStore((state) => state.categories);
  //const brands = useBrandStore((state) => state.brands);
  const dish = useDishStore((state) => state.dish);
  const setDish = useDishStore((state) => state.setDish);

  const products = useProductStore((state) => state.products);
  const setProduct = useProductStore((state) => state.setProduct);

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  //const [items, setItems] = useState<string[]>(products.map((item) => item.name));
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [recproduct, setRecProduct] = useState<string[]>([]);

  const fetchDishData = useRef<any>();
  const inputRef = useRef<InputRef>(null);

  const [form] = Form.useForm();

  // const categoryOptions = categories.map((item) => ({
  //   value: item.id,
  //   label: item.name,
  // }));

  // const brandOptions = brands.map((item) => ({
  //   value: item.name,
  //   label: item.name,
  // }));

  useEffect(() => {
    fetchDishData.current = async () => {
      setIsLoading(true);
      try {
        const { data: dishData } = await getDishById(data.id);
        const files: any = await Promise.all(
          dishData.images.map(async (item: any) => {
            const fileRef = ref(storage, item);
            const blob = await getBlob(fileRef);
            const fileData = await getMetadata(fileRef);
            const file = new File([blob], fileData.name, {
              type: fileData.contentType,
            });
            const RcFile: UploadFile = {
              name: fileData.name,
              uid: new Date(file.lastModified).toISOString(),
              originFileObj: file as RcFile,
            };
            return RcFile;
          })
        );

        setDish(dishData);

        setFileList(files);
        console.log(dish);
        if (dish) setIsLoading(false);
      } catch (error) {
        setTimeout(() => {
          setShow(false);
        }, 5000);
        console.log(error);
      }
    };
    fetchDishData.current();
  }, []);

  const productOptions = products.map((product) => ({
    value: product.id.toString(),
    label: product.name,
  }));
  
  const selectedProductIds = dish?.productid?.map((id) => id.toString()) || [];

  const onChangeFile: UploadProps["onChange"] = async ({ fileList:newFileList }) => {
    if (newFileList.length > 3) {
      message.error('You can only upload up to 3 images at a time.');
      return;
    }
    setFileList(fileList);
  };

  const beforeUploadFile = (file: RcFile) => {
    const msgs = validator(file);
    msgs.map((msg) => message.error(msg));
    return msgs.length == 0 || Upload.LIST_IGNORE;
  };

  const handleEditNewDish = async (values: any) => {
    const { images,aaa,  ...rest } = values;
    const imageURLs =
      images &&
      (await Promise.all(
        images?.fileList.map(async (image: any) => {
          const storageRef = ref(
            storage,
             `dishes/${name}/${image.name}`
          );
          await uploadBytes(storageRef, image.originFileObj);
          const imageURL = await getDownloadURL(storageRef);
          return imageURL;
        })
      ));

    const payload = {
      ...rest,
      productid: aaa,
      ...(imageURLs && { images: [...imageURLs] }),
    };

    setIsLoading(true);
    try {
      await updateDishById(data.id, payload);
      setIsLoading(false);
      notification.success({
        message: "Update dish successfully!",
        duration: 1,
        onClose: () => setShow(false),
      });
    } catch (error: any) {
      console.log(error);
      setIsLoading(false);
      notification.error({
        message: error.message,
      });
    }
  };

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  // const addItem = (
  //   e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  // ) => {
  //   e.preventDefault();
  //   // setItems([...items, name || `New item`]);
  //   setName("");
  //   setTimeout(() => {
  //     inputRef.current?.focus();
  //   }, 0);
  // };

  const handleDeleteProduct = async () => {
    setIsLoading(true);
    try {
      await deleteDishById(data.id);
      setIsLoading(false);
      notification.success({
        message: "Delete dish successfully!",
        duration: 1,
        onClose: () => setShow(false),
      });
    } catch (error: any) {
      console.log(error);
      setIsLoading(false);
      notification.error({
        message: error.message,
      });
    }
  };

  return (
    <Modal
      title="Edit dish"
      centered
      open={show}
      footer={[
        <></>,
        // eslint-disable-next-line react/jsx-key
        <div className="flex justify-between">
          <Button
            loading={isLoading}
            onClick={() => handleDeleteProduct()}
            danger
            type="primary"
          >
            Delete
          </Button>
          <div className="flex gap-2">
            <Button onClick={() => setShow(false)}>Cancel</Button>
            <Button
              className="bg-primary_blue"
              type="primary"
              loading={isLoading}
              onClick={() => {
                setIsLoading(true);
                form.submit();
              }}
            >
              Save
            </Button>
          </div>
        </div>,
      ]}
      onCancel={() => setShow(false)}
      width={800}
    >
      {isLoading ? (
        <Skeleton />
      ) : (
        <Form
          form={form}
          labelCol={{ span: 24 }}
          onFinish={(values) => handleEditNewDish(values)}
        >
          <Row>
          <Col span={18}>
          <Form.Item name="name" label="Name" initialValue={dish?.name}>
            <Input placeholder="Product name" />
          </Form.Item>
          </Col>
            
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Description"
                initialValue={dish?.description}
              >
                <Input.TextArea rows={3} placeholder="Description" />
              </Form.Item>
            </Col>
          </Row>
          
          {/* <Row gutter={18}>
            <Col span={12}>
              <Form.Item
                name="brandName"
                label="Brand"
                initialValue={
                  brands.find((item) => item.id === product?.brandId)?.name
                }
              >
                <Select
                  placeholder="Brand"
                  dropdownRender={(menu) => (
                    <>
                      {menu}
                      <Divider style={{ margin: "8px 0" }} />
                      <Space style={{ padding: "0 8px 4px" }}>
                        <Input
                          placeholder="Please enter item"
                          ref={inputRef}
                          value={name}
                          onChange={onNameChange}
                        />
                        <Button
                          type="primary"
                          onClick={addItem}
                          className="bg-primary"
                        >
                          Add
                        </Button>
                      </Space>
                    </>
                  )}
                  options={brandOptions}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="categoryId"
                label="Categories"
                initialValue={product?.categoryId}
              >
                <Select options={categoryOptions} placeholder="Category" />
              </Form.Item>
            </Col>
          </Row> */}
            <Row gutter={18}>
                <Col span={18}>
                  <Form.Item name="aaa" label="Related Product">
                    <Select mode="multiple" allowClear options={productOptions} placeholder="Product" defaultValue={selectedProductIds}/>
                  </Form.Item>
                </Col>
            </Row>
          <Form.Item name="images" label="Product images">
            <Upload
              listType="picture-card"
              fileList={fileList}
              multiple={true}
              beforeUpload={beforeUploadFile}
              onChange={onChangeFile}
            >
              {fileList.length >= 3 ? null : (
                <div>
                  <UploadOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};

export default EditDishModal;
