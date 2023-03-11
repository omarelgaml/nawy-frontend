/* eslint-disable react/prop-types */
import { Table, Space, Typography } from 'antd';
import { useEffect, useState } from 'react';
import MyModal from '../components/MyModal';
import { updateMerchant } from '../redux/companiesSlice';
import { getAllTransactions } from '../redux/transactionsSlice';

import moment from 'moment-timezone';
import { useDispatch } from 'react-redux';

const { Text } = Typography;
function DataTable(props) {
  const [columns, setColumns] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedMerchant, seStelectedMerchant] = useState('');

  const dispatch = useDispatch();

  const TransactionsColumns = [
    {
      title: 'Cost',
      dataIndex: 'cost',
      key: 'cost',
      render: (text) => <Text>{`${text} $`}</Text>
    },
    {
      title: 'Created at',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => {
        var date2 = moment.utc(text).format('YYYY-MM-DD HH:mm:ss');

        var stillUtc = moment.utc(date2).toDate();
        var local = moment(stillUtc).local().format('YYYY-MM-DD HH:mm:ss');

        return <Text>{local}</Text>;
      }
    },
    {
      title: 'Company',
      dataIndex: 'company',
      key: 'company',
      render: (company) => {
        return <Text>{company && company.name}</Text>;
      }
    },
    {
      title: 'Merchant',
      dataIndex: 'company',
      key: 'merchant',
      render: (company) => {
        return <Text>{company && company.merchant && company.merchant.name}</Text>;
      }
    },

    {
      title: 'Action',
      key: 'action',
      render: (transaction) => {
        return (
          <>
            <Space size="middle">
              <a
                onClick={() => {
                  setSelectedCompany(transaction.company._id);
                  setOpen(true);
                }}>
                Change merchant
              </a>
            </Space>
          </>
        );
      }
    }
  ];
  const companiesColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <Text>{text}</Text>
    },
    {
      title: 'Merchant',
      dataIndex: 'merchant',
      key: 'merchant',
      render: (merchant) => {
        return <Text>{merchant && merchant.name}</Text>;
      }
    },

    {
      title: 'Action',
      key: 'action',
      render: (company) => (
        <Space size="middle">
          <a
            onClick={() => {
              setSelectedCompany(company._id);
              setOpen(true);
            }}>
            Change Merchant
          </a>
        </Space>
      )
    }
  ];
  const merchantsColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <Text>{text}</Text>
    },
    {
      title: 'Created at',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => {
        var date2 = moment.utc(text).format('YYYY-MM-DD HH:mm:ss');
        var stillUtc = moment.utc(date2).toDate();
        var local = moment(stillUtc).local().format('YYYY-MM-DD HH:mm:ss');

        return <Text>{local}</Text>;
      }
    },
    {
      title: 'Money spent',
      dataIndex: 'moneySpent',
      key: 'MoneySpent',
      render: (text) => <Text>{`${text} $`}</Text>
    },
    {
      title: 'Percentage',
      dataIndex: 'percentage',
      key: 'percentage',
      render: (text) => <Text>{`${text} %`}</Text>
    }
  ];
  useEffect(() => {
    if (props.selectedTab == 0) setColumns(TransactionsColumns);
    if (props.selectedTab == 1) setColumns(companiesColumns);
    if (props.selectedTab == 2) setColumns(merchantsColumns);
  }, [props.selectedTab]);
  const closeModal = (data) => {
    if (data != 'none') {
      dispatch(
        updateMerchant({
          id: selectedCompany,
          newMerchant: selectedMerchant ? selectedMerchant : null
        })
      );
      dispatch(getAllTransactions());
    }

    setOpen(false);
  };
  return (
    <>
      <MyModal
        open={open}
        updateMerchant={true}
        closeModal={(merchant) => closeModal(merchant)}
        changeVal={(id) => seStelectedMerchant(id)}
      />
      <Table columns={columns} dataSource={props.data} />
    </>
  );
}
export default DataTable;
