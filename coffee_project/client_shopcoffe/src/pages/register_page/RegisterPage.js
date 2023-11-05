import { Button, Form, Input, Select, message } from "antd";
import { useContext } from "react";
import { AppContext } from "../../contexts/app.context";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { registerAccount } from "../../apis/product.api";

const RegisterPage = () => {
  const { setProfile, setIsAuthenticated } = useContext(AppContext);

  const navigate = useNavigate();
  const onFinish = (values) => {
    console.log("Success:", values);
    mutation.mutate(values, {
      onSuccess: (dataUser) => {
        console.log(dataUser);
        alert(dataUser.data.message);
        navigate("/login");
      },
      onError: (data) => {
        alert(data.response.data.errMessage);
      },
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const mutation = useMutation((body) => {
    return registerAccount(body);
  });
  return (
    <div className="p-20 px-60 w-screen h-screen bg-gradient-to-r from-black via-blue-400 to-pink-300 lg:h-full ">
      <div className=" w-full bg-white p-20 flex justify-center flex-col items-center rounded-lg font-medium ">
        <h1>Sign Up</h1>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 10,
          }}
          className="w-full ml-[500px] mt-10"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          {/* ----------------------------- */}
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          {/* -------------------------------------- */}
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          {/* ---------------------------------------- */}
          <Form.Item
            label="Số Điện Thoại"
            name="phoneNumber"
            rules={[
              {
                required: true,
                message: "Please input your telephone number!",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          {/* ----------------------------------------- */}
          <Form.Item
            label="Họ Tên"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your fullname 6!",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          {/* ------------------------------------------- */}
          <Form.Item
            wrapperCol={{
              offset: 0,
              span: 10,
            }}
          >
            <Button
              danger
              type="primary"
              className="bg-green font-bold"
              htmlType="submit"
            >
              Đăng Ký
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default RegisterPage;
