import React, {Component} from 'react';
import 'antd/dist/antd.css';
import {Form, Modal, Select, Input, Button, Col, Row, Table} from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;
import actions from '../actions/actions';
import {createSelector} from 'reselect';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class VehicleContactPersonQueryForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expand: false,
            columns: [
                {
                    title: '联系人姓名',
                    dataIndex: 'name',
                    key: 'name',
                }, {
                    title: '手机号码',
                    dataIndex: 'cellPhoneNumber',
                    key: 'cellPhoneNumber',
                }, {
                    title: '固定电话',
                    dataIndex: 'telephone',
                    key: 'telephone',
                }, {
                    title: '其他电话',
                    dataIndex: 'otherPhone',
                    key: 'otherPhone',
                }, {
                    title: '性别  ',
                    dataIndex: 'gender',
                    key: 'gender',
                }, {
                    title: '联系人类型',
                    dataIndex: 'type',
                    key: 'type',
                }, {
                    title: 'VIN码    ',
                    dataIndex: 'vin',
                    key: 'vin',
                }, {
                    title: '车牌号  ',
                    dataIndex: 'vehicleLicensePlate',
                    key: 'vehicleLicensePlate',
                }, {
                    title: '省  ',
                    dataIndex: 'province',
                    key: 'province',
                }, {
                    title: '市  ',
                    dataIndex: 'cityName',
                    key: 'cityName',
                }, {
                    title: '区县  ',
                    dataIndex: 'countyName',
                    key: 'countyName',
                }, {
                    title: '状态  ',
                    dataIndex: 'status',
                    key: 'status',
                }, {
                    title: '创建人  ',
                    dataIndex: 'creatorName',
                    key: 'creatorName',
                }, {
                    title: '创建时间  ',
                    dataIndex: 'createTime',
                    key: 'createTime',
                }, {
                    title: '修改人  ',
                    dataIndex: 'modifierName',
                    key: 'modifierName',
                }, {
                    title: '修改时间  ',
                    dataIndex: 'modifyTime',
                    key: 'modifyTime',
                },
            ],
            rowSelection: {
                onChange: (selectedRowKeys, selectedRows) => {
                    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);

                },
                onSelect: (record, selected, selectedRows) => {
                    console.log(record, selected, selectedRows);
                },
                onSelectAll: (selected, selectedRows, changeRows) => {
                    console.log(selected, selectedRows, changeRows);
                },
                getCheckboxProps: record => ({
                    disabled: record.name === 'Disabled User',    // Column configuration not to be checked
                }),
            }
        };
        this.onSearch = this.onSearch.bind(this);
        this.onCreate = this.onCreate.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    onSearch() {

    }

    onCreate() {

    }

    handleSearch(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            this.props.queryVehicleLinkMans(values);
        });
    };

    render() {
        const formItemLayout = {
            labelCol: {span: 8},
            wrapperCol: {span: 15},
        };
        const {getFieldDecorator} = this.props.form;
        const children = [];
        children.push(
            <Col span={8}>
                <FormItem {...formItemLayout} label='VIN'>
                    {getFieldDecorator('vin')(
                        <Input disabled={true}/>
                    )}
                </FormItem>
            </Col>,
            <Col span={8}>
                <FormItem {...formItemLayout} label='联系人姓名'>
                    {getFieldDecorator('name')(
                        <Input />
                    )}
                </FormItem>
            </Col>,
            <Col span={8}>
                <FormItem {...formItemLayout} label='联系人类型'>
                    {getFieldDecorator('type')(
                        <Select >
                            <Option value="车主">车主</Option>
                            <Option value="司机">司机</Option>
                            <Option value="联络人">联络人</Option>
                            <Option value="送修人">送修人</Option>
                            <Option value="车队人">车队人</Option>
                            <Option value="设备经理">设备经理</Option>
                            <Option value="实际车主">实际车主</Option>
                        </Select>
                    )}
                </FormItem>
            </Col>,
            <Col span={8}>
                <FormItem {...formItemLayout} label='车牌号'>
                    {getFieldDecorator('vehicleLicensePlate')(
                        <Input />
                    )}
                </FormItem>
            </Col>,
            <Col span={8}>
                <FormItem {...formItemLayout} label='手机号码'>
                    {getFieldDecorator('cellPhoneNumber')(
                        <Input />
                    )}
                </FormItem>
            </Col>,
            <Col span={8}>
                <FormItem {...formItemLayout} label='状态'>
                    {getFieldDecorator('status')(
                        <Select >
                            <Option value="有效">有效</Option>
                            <Option value="作废">作废</Option>
                        </Select>
                    )}
                </FormItem>
            </Col>
        );

        const expand = this.state.expand;
        const shownCount = expand ? children.length : 9;
        return (
            <Modal style={{
                minWidth: '1200px',
                minHeight: '1000px'
            }}
                   visible={this.props.visible}
                   title="选择车辆联系人"
                   onCancel={this.props.onCancel}
            >
                <Form onSubmit={this.handleSearch}>
                    <Row gutter={50}>
                        {children.slice(0, shownCount)}
                    </Row>
                    <Row>
                        <Col span={24} style={{textAlign: 'right'}}>
                            <Button type="primary" htmlType="submit">查询</Button>
                            {' '}
                            <Button type="primary">新增</Button>
                            {' '}
                            <Button type="primary">修改</Button>
                        </Col>
                    </Row>
                    <Row style={{
                        marginTop: '5px'
                    }}>
                        <Table dataSource={this.props.vehicleLinkMans}
                               columns={this.state.columns} size="small"
                               rowSelection={this.state.rowSelection}
                               scroll={{x: 1200}}/>
                    </Row>
                </Form>
            </Modal>
        );
    }
}


const mapStateToProps = createSelector(
    state => state.getIn(['domainData', 'vehicleLinkMans']),
    (vehicleLinkMans) => {
        return {
            vehicleLinkMans: vehicleLinkMans.toJS(),
        };
    }
);


VehicleContactPersonQueryForm.propTypes = {
    queryVehicleLinkMans: React.PropTypes.func
};


const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export  default  Form.create()(connect(mapStateToProps, mapDispatchToProps)(VehicleContactPersonQueryForm));

