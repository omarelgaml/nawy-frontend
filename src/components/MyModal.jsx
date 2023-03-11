/* eslint-disable react/prop-types */
import { Form, Input, Modal } from 'antd';
import { useState } from 'react';
import MyDropDown from './MyDropDown';

function MyModal(props) {
  const [selectedMerchant, setSelectedMerchant] = useState(null);
  const [selectedCompany, setselectedCompany] = useState(null);

  const onCreate = (values) => {
    if (props.isMerchants) props.closeModal({ name: values.name });
    else if (props.isCompanies) props.closeModal({ name: values.name, merchant: selectedMerchant });
    else if (props.isTransactions)
      props.closeModal({ cost: values.cost, company: selectedCompany });
    else if (props.updateMerchant) props.closeModal();
  };
  const handleSelectValue = (id) => {
    if (props.isCompanies) setSelectedMerchant(id);
    if (props.isTransactions) setselectedCompany(id);
    if (props.updateMerchant) props.changeVal(id);
  };
  const [form] = Form.useForm();
  const types = ['transaction', 'company', 'merchant'];

  return (
    <Modal
      open={props.open}
      title={
        props.updateMerchant
          ? 'All Transactions from this company will be changed'
          : `Create a new ${types[props.selectedTab]}`
      }
      okText="Create"
      cancelText="Cancel"
      onCancel={() => props.closeModal('none')}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}>
      {props.updateMerchant ? (
        <Form.Item name="merchant" label="New Merchant (could be empty)">
          <MyDropDown selectValue={(id) => handleSelectValue(id)} data={props.data} />
        </Form.Item>
      ) : (
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{ modifier: 'public' }}>
          {props.isTransactions ? (
            <Form.Item
              name="cost"
              label="Cost"
              rules={[{ required: true, message: 'Please input the cost!' }]}>
              <Input />
            </Form.Item>
          ) : (
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: 'Please input the name!' }]}>
              <Input />
            </Form.Item>
          )}
          {props.isCompanies && (
            <Form.Item name="merchant" label="Merchant (could be empty)">
              <MyDropDown selectValue={(id) => handleSelectValue(id)} data={props.data} />
            </Form.Item>
          )}
          {props.isTransactions && (
            <Form.Item name="company" validateStatus="" label="Company">
              <MyDropDown
                selectValue={(id) => handleSelectValue(id)}
                isTransactions={props.isTransactions}
                isCompanies={props.isCompanies}
              />
            </Form.Item>
          )}
        </Form>
      )}
    </Modal>
  );
}

export default MyModal;
