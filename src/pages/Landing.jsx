import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addMerchant, getAllMerchants } from '../redux/merchantsSlice';
import { getAllCompanies, addCompany } from '../redux/companiesSlice';
import { addTransaction, getAllTransactions } from '../redux/transactionsSlice';

import { Layout, Menu, Button, Row, Col, Select } from 'antd';
import DataTable from '../components/Table';
import MyModal from '../components/MyModal';

var months = [
  { value: 1, label: 'Jan' },
  { value: 2, label: 'Feb' },
  { value: 3, label: 'Mar' },
  { value: 4, label: 'Apr' },
  { value: 5, label: 'May' },
  { value: 6, label: 'Jun' },
  { value: 7, label: 'Jul' },
  { value: 8, label: 'Aug' },
  { value: 9, label: 'Sep' },
  { value: 10, label: 'Oct' },
  { value: 11, label: 'Nov' },
  { value: 12, label: 'Dec' }
];
const { Header, Content, Footer } = Layout;

function Landing() {
  const dispatch = useDispatch();

  const merchants = useSelector((state) => state.merchants.merchants);
  const companies = useSelector((state) => state.companies.companies);
  const transactions = useSelector((state) => state.transactions.transactions);
  const [open, setOpen] = useState(false);
  const [selectedTab, setselectedTab] = useState(0);
  const [merchantsWithStat, setMerchantsWithStat] = useState({});
  const tabs = ['Transactions', 'Companies', 'Merchants'];
  const [filteredTrans, setFilteredTrans] = useState([]);

  const displayData = [filteredTrans, companies, merchantsWithStat];
  const [years, setYears] = useState({});
  const [yearFilter, setYearFilter] = useState(2023);
  const [monthFilter, setMonthFilter] = useState(3);
  useEffect(() => {
    dispatch(getAllMerchants());
    dispatch(getAllCompanies());
    dispatch(getAllTransactions());
    let y = [];
    for (let i = 2023; i < 2035; i++) y.push({ value: i, label: i });
    setYears(y);
  }, []);
  useEffect(() => {
    var tmp = [];

    for (let trans in transactions) {
      var da = new Date(transactions[trans].createdAt);
      if (da.getUTCFullYear() == yearFilter && da.getMonth() + 1 == monthFilter)
        tmp.push(transactions[trans]);
    }
    setFilteredTrans(tmp);
  }, [monthFilter, yearFilter, transactions]);
  useEffect(() => {
    let t = [];
    let totalSpent = 0;
    for (let trans in transactions) {
      totalSpent += transactions[trans].cost;
    }

    for (let mer in merchants) {
      let total = 0;
      for (let trans in transactions) {
        if (transactions[trans].company?.merchant?._id == merchants[mer]._id)
          total += transactions[trans].cost;
      }
      t.push({
        ...merchants[mer],
        moneySpent: total,
        percentage: total == 0 ? 0 : ((total / totalSpent) * 100).toFixed(2)
      });
      // merchants[mer].moneySpent = total;
    }

    setMerchantsWithStat(t);
  }, [merchants, transactions]);
  const closeModal = (data) => {
    if (data != 'none' && selectedTab == 2) dispatch(addMerchant(data));
    if (data != 'none' && selectedTab == 1) dispatch(addCompany(data));
    if (data != 'none' && selectedTab == 0) dispatch(addTransaction(data));

    setOpen(false);
  };
  const changeTab = (item) => {
    setselectedTab(item.key);
  };
  return (
    <Layout className="layout">
      <Header>
        <Menu
          onClick={(item) => changeTab(item)}
          defaultSelectedKeys={['0']}
          theme="dark"
          mode="horizontal"
          items={tabs.map((val, index) => {
            const key = index;
            return {
              key,
              label: `${val}`
            };
          })}
        />
      </Header>
      <Content style={{ padding: '3%', background: 'white' }}>
        <MyModal
          open={open}
          isCompanies={selectedTab == 1}
          isTransactions={selectedTab == 0}
          isMerchants={selectedTab == 2}
          closeModal={(merchant) => closeModal(merchant)}
          selectedTab={selectedTab}
        />
        <Row style={{ marginBottom: '2%' }}>
          <Col span={2}>
            <Button onClick={() => setOpen(true)}>Add</Button>
          </Col>
          <Col style={{ textAlign: 'right' }} span={4} offset={18}>
            <Select
              onChange={(value) => {
                setYearFilter(value);
              }}
              defaultValue={'2023'}
              style={{ width: 80 }}
              options={years.length && years}
            />
            <Select
              onChange={(value) => setMonthFilter(value)}
              defaultValue={monthFilter}
              style={{ width: 80 }}
              options={months}
            />
          </Col>
        </Row>

        <DataTable selectedTab={selectedTab} data={displayData[selectedTab]} />
      </Content>
      <Footer style={{ textAlign: 'center', background: 'white' }}>
        Nawy ©2023 Created by omar elgaml
      </Footer>
    </Layout>
  );
}

export default Landing;
