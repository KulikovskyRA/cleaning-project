import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Button, Form, Input, Typography, Select } from 'antd';
const { Title } = Typography;
const { Option } = Select;
import { LockOutlined } from '@ant-design/icons';

import styles from './LandingCleanerStyles.module.css';
import { authReducer } from '../../redux/authSlice';
import CleanerFooter from '../../components/CleanerFooter/CleanerFooter';

const CleanerLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [err, setErr] = React.useState({ status: false, message: '' });

  const onFinishStatus = (err, errorInfo: any) => {
    setErr({ err, message: errorInfo });
    setTimeout(() => {
      setErr({ err: false, message: '' });
    }, 3000);
  };

  const prefixSelector = (
    <Form.Item
      name="prefix"
      noStyle
      rules={[{ required: true, message: 'Выберите префикс!' }]}
    >
      <Select style={{ width: 70 }}>
        <Option value="+998">+998</Option>
        <Option value="+996">+996</Option>
        <Option value="+992">+992</Option>
        <Option value="+7">+7</Option>
      </Select>
    </Form.Item>
  );

  const onFinish = async (values: any): Promise<void> => {
    const phoneNumber = values.prefix + values.phone;

    const res = await fetch(import.meta.env.VITE_URL + 'cleaner/login', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ password: values.password, phoneNumber }),
    });

    if (res.ok) {
      const result = await res.json();
      dispatch(
        authReducer({
          type: 'cleaner',
          name: result.name,
          id: result.id,
          email: '',
          img: result.img,
          phoneNumber: result.phoneNumber,
        })
      );

      navigate('/cleaner');
    } else if (res.status === 403) {
      onFinishStatus(true, 'Неверно указан номер телефона или пароль');
    } else {
      onFinishStatus(true, 'Произошла ошибка, попробуйте позже');
    }
  };

  return (
    <>
      <div className={styles.cleanerHeaderDiv}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          {!err.status && (
            <Form.Item validateStatus="error" help={err.message} />
          )}
          <Title>Войдите и зарабатывайте!</Title>
          <Form.Item
            name="phone"
            rules={[
              {
                required: true,
                message: 'Введите номер телефона! ',
              },
            ]}
          >
            <Input
              placeholder="Введите номер телефона"
              addonBefore={prefixSelector}
              style={{ width: '100%' }}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Вы забыли ввести пароль!' }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Введите пароль"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
      <CleanerFooter />
    </>
  );
};

export default CleanerLogin;
