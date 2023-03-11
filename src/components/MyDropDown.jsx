/* eslint-disable react/prop-types */
import { Select } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const onSearch = (value) => {
  console.log('search:', value);
};

function MyDropDown(props) {
  const [items, setItems] = useState([]);
  const merchants = useSelector((state) => state.merchants.merchants);
  const companies = useSelector((state) => state.companies.companies);

  const onChange = (value) => {
    props.selectValue(value);
  };

  useEffect(() => {
    let tmp = [];
    if (props.isTransactions) {
      for (let comp in companies) {
        tmp.push({
          value: companies[comp]._id,
          label: companies[comp].name
        });
      }
    } else {
      for (let mer in merchants) {
        tmp.push({
          value: merchants[mer]._id,
          label: merchants[mer].name
        });
      }
    }
    setItems(tmp);
  }, [props]);
  return (
    <>
      <Select
        showSearch
        placeholder="Select a merchant"
        optionFilterProp="children"
        onChange={onChange}
        onSearch={onSearch}
        filterOption={(input, option) =>
          (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
        }
        allowClear
        options={items}
      />
    </>
  );
}
export default MyDropDown;
