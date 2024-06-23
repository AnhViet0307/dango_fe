import { createNewProduct } from "@/apis/product.api";
import { app,auth } from "@/firebase";
import { useBrandStore } from "@/stores/useBrandStore";
import { useCategoriesStore } from "@/stores/useCategoryStore";
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
  Space,
  Upload,
  message,
  notification,
} from "antd";
import { RcFile, UploadFile, UploadProps } from "antd/es/upload";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useProductStore } from "@/stores/useProductStore";
import React, { useRef, useState } from "react";
//import { useNavigate } from "react-router-dom";
import { useRouter } from "next/navigation";
interface IAddProductModalProps {
  show: boolean;
  setShow: any;
}
import { onAuthStateChanged } from "firebase/auth";
import { createNewDish } from "@/apis/dish.api";
const AddDishModal: React.FunctionComponent<IAddProductModalProps> = ({
  show,
  setShow,
}) => {
  
  const brands = useBrandStore((state) => state.brands);
  const [items, setItems] = useState<string[]>(brands.map((item) => item.name));
  const [name, setName] = useState("");
  const inputRef = useRef<InputRef>(null);

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const addItem = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    e.preventDefault();
    setItems([...items, name || `New item`]);
    setName("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const navigate = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const products = useProductStore((state) => state.products);

  const productOptions = products.map((item) => ({
    value: item.id.toString(),
    label: item.name,
  }));

  enum DishCategories{
    Pizza='Pizza',
      Pasta='Pasta',
      Burgers='Burgers',
     Sushi= 'Sushi',
      INDIAN='Indian',
      Chinese='Chinese',
      Mexican='Mexican',
      Thai='Thai',
      Sandwiches='Sandwiches',
      Salads= 'Salads',
      Korean_Food='Korean Food',
      Seafood='Seafood',
      Soups='Soups',
     Breakfast= 'Breakfast',
      Desserts='Desserts',
    Vegetarian=  'Vegetarian',
    Vegan=  'Vegan',
    BBQ=  'BBQ',
     Italian= 'Italian',
     Japanese= 'Japanese',
  }
  const categoryOptions = Object.values(DishCategories).map((category) => ({
        value: category,
        label: category
    }));

  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onChangeFile: UploadProps["onChange"] = async ({ fileList }) => {
    if (fileList.length > 3) {
      message.error('You can only upload up to 3 images at a time.');
      return;
    }
    
    setFileList(fileList);
  };

 const beforeUploadFile = (file: RcFile) => {
   
    
    const msgs = validator(file);
    msgs.map((msg)=> message.error(msg));
    
    return msgs.length == 0||Upload.LIST_IGNORE; // Allow upload if no validation messages
  };

  const handleAddNewDish = async (values: any) => {
    const { images,aaa ,name, ...rest } = values;
    const storage = getStorage(app);
    const user = auth.currentUser;  //get current auth user

    ///const pIdToString= aaa.map()

    const imageURLs = await Promise.all(
      images.fileList.map(async (image: any) => {
        const storageRef = ref(
          storage,
          `dishes/${name}/${image.name}`
        );
        await uploadBytes(storageRef, image.originFileObj);
        const imageURL = await getDownloadURL(storageRef);
        return imageURL;
      })
    );

    const payload = {
      ...rest,
      name: name,
      productid: aaa,
      score:0,
      images: [...imageURLs],
      
    };

    console.log(payload);

    setIsLoading(true);
    try {
      await createNewDish(payload);
      setIsLoading(false);
      notification.success({
        message: "Create new dish successfully!",
        duration: 0.5,
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
      title="Add new dish"
      centered
      open={show}
      footer={[
        // eslint-disable-next-line react/jsx-key
        <Button onClick={() => setShow(false)}>Cancel</Button>,
        // eslint-disable-next-line react/jsx-key
        <Button
          type="primary"
          className="bg-primary_blue"
          loading={isLoading}
          onClick={() => {
            setIsLoading(true);
            form.submit();
          }}
        >
          Create
        </Button>,
      ]}
      onCancel={() => setShow(false)}
      width={800}
    >
      <Form
        form={form}
        labelCol={{ span: 24 }}
        onFinish={(values) => handleAddNewDish(values)}
      >
        <Form.Item name="name" label="Name">
          <Input placeholder="Dish name" />
        </Form.Item>
        <Row>
          <Col span={24}>
            <Form.Item name="description" label="Description">
              <Input.TextArea
                rows={5}
                autoSize={false}
                placeholder="Description"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={18}>
          <Col span={18}>
          <Form.Item name="category" label="Category">
              <Select options={categoryOptions} placeholder="Category" />
            </Form.Item>
            </Col>  
        </Row>
        <Row gutter={18}>
          <Col span={18}>
            <Form.Item name="aaa" label="Product">
              <Select mode="multiple" allowClear options={productOptions} placeholder="Product" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="images" label="Dish images">
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
    </Modal>
  );
};

export default AddDishModal;
