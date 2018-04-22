import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Button, Icon, List } from 'antd';
import { Radio } from 'antd';
import Ellipsis from 'components/Ellipsis';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

import styles from './Buy.less';

@connect(({ list, loading }) => ({
  list,
  loading: loading.models.list,
}))
export default class Buy extends PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'list/fetch',
      payload: {
        count: 8,
      },
    });
  }

  onFilterChange() {
    console.log('qwe');
  }

  render() {
    const { list: { list }, loading } = this.props;

    const content = (
      <div className={styles.pageHeaderContent}>
        <p>
          你可以借阅或者购买这里的书籍。
        </p>
        <div className={styles.contentLink}>
          <RadioGroup onChange={this.onFilterChange} defaultValue="all">
            <RadioButton value="all">所有书籍</RadioButton>
            <RadioButton value="class">课内教学</RadioButton>
            <RadioButton value="break">课余闲置</RadioButton>
          </RadioGroup>
        </div>
      </div>
    );

    const extraContent = (
      <div className={styles.extraImg}>
        <img
          alt="这是一个标题"
          src="https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png"
        />
      </div>
    );

    return (
      <PageHeaderLayout title="书籍列表" content={content} extraContent={extraContent}>
        <div className={styles.cardList}>
          <List
            rowKey="id"
            loading={loading}
            grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
            dataSource={[...list]}
            renderItem={item =>
              item ? (
                <List.Item key={item.id}>
                  <Card hoverable className={styles.card} actions={[<a>购买</a>, <a>借阅</a>]}>
                    <Card.Meta
                      avatar={<img alt="" className={styles.cardAvatar} src={item.avatar} />}
                      title={<a href="#">{item.title}</a>}
                      description={
                        <Ellipsis className={styles.item} lines={3}>
                          {item.description}
                        </Ellipsis>
                      }
                    />
                  </Card>
                </List.Item>
              ) : (
                  <List.Item>
                    <Button type="dashed" className={styles.newButton}>
                      <Icon type="plus" /> 新增产品
                  </Button>
                  </List.Item>
                )
            }
          />
        </div>
      </PageHeaderLayout>
    );
  }
}
