import React, { useContext } from "react";
import { Button, Form, Input } from "antd";
import img_login from "../../access/img/img_login.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { loginAccount } from "../../apis/product.api";
import { AppContext } from "../../contexts/app.context";
import { setProfileFromLS } from "../../utils/utils";

export default function LoginPage() {
  const { setProfile, setIsAuthenticated } = useContext(AppContext);

  const navigate = useNavigate();
  const onFinish = (values) => {
    console.log("Success:", values);
    mutation.mutate(values, {
      onSuccess: (dataUser) => {
        setProfile(dataUser);
        alert(dataUser.data.message);
        setIsAuthenticated(true);
        navigate("/");
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
    return loginAccount(body);
  });
  return (
    <div className=" w-screen h-screen bg-gradient-to-r from-black via-blue-400 to-pink-300  flex justify-center items-center p-20 ">
      <div className="bg-white w-full h-full  justify-center rounded-xl flex ">
        <div className="w-1/2 h-full p-10 sm:hidden lg:block">
          <img
            src={img_login}
            className="w-full h-full object-cover"
            alt="#img"
          />
        </div>
        <div className="w-1/2 mt-10 h-full p-10">
          <Form
            name="basic"
            className="w-full"
            labelCol={{
              span: 10,
            }}
            wrapperCol={{
              span: 20,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            layout="vertical"
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Email:"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password:"
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

            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            ></Form.Item>

            <Form.Item
              className="flex justify-start"
              style={{ position: "relative", bottom: "40px", right: "12px" }}
              wrapperCol={{
                offset: 2,
                span: 30,
              }}
            >
              <Button
                className="medium border-none bg-black text-white mb-3 "
                htmlType="submit"
              >
                Submit
              </Button>
              <br />
              <NavLink to={"/register"}>
                <a>Bạn chưa có có tài khoản?</a>
              </NavLink>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
