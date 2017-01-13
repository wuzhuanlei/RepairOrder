import React, {Component} from 'react';
import {uuid} from '../common/utils';
import 'antd/dist/antd.css';
import {DatePicker, Checkbox, Form, Modal, Upload, Input, Button, Icon, Select, Tabs} from 'antd';

const Option = Select.Option;
const dateFormat = 'YYYY/MM/DD';
import moment from 'moment';
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const index = 1;

const CollectionCreateForm = Form.create()(
    (props) => {
        const {visible, onCancel, onCreate} = props;
        return (
            <Modal
                visible={visible}
                title="Create a new collection"
                okText="Create"
                onCancel={onCancel}
                onOk={onCreate}
            >
                <Form vertical>
                    <FormItem label="Title">
                        <Input />
                    </FormItem>
                    <FormItem label="Description">
                        <Input type="textarea"/>
                    </FormItem>
                </Form>
            </Modal>
        );
    }
);


class InsertRepairOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileList: [{
                uid: -1,
                name: '',
                status: '',
                url: '',
            }],
            visible: false
        };
        this.handleSubmitClick = this.handleSubmitClick.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onCreateFault = this.onCreateFault.bind(this);
        this.createOption = this.createOption.bind(this);
        this.onQueryContact = this.onQueryContact.bind(this);
        this.callback = this.callback.bind(this);
        this.showModal = this.showModal.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.onVehicleQuery = this.onVehicleQuery.bind(this);
    }

    showModal() {
        this.setState({visible: true});
    }

    handleCancel() {
        this.setState({visible: false});
    }


    callback(key) {
        console.log(key);
    }

    onVehicleQuery() {
        this.props.onVehicleQuery(this.props.repairOrder);
    }

    onBlur(e) {

    }

    //查询联系人信息
    onQueryContact() {

    }

    onChange(e) {
        this.props.onValueChange(e.target.dataset.field, e.target.value.trim());
    }

    handleSelectChange(e) {
        // this.props.onValueChange(e.dataset.field, e.value.trim());
    }

    handleSubmitClick() {
        let newIndex = index + 1;
        this.props.repairOrder.code = 'REPFT0007962017011300' + newIndex;
        this.props.repairOrder.id = uuid();
        this.props.onSubmit(this.props.repairOrder);
    }

    onCreateFault() {
        this.props.addFault();
    }

    createOption(name) {
        const keyValueItems = this.props.keyValueItems;
        if(keyValueItems) {
            const mapKeyValuesItems = keyValueItems.get(name);
            if(mapKeyValuesItems)
                return mapKeyValuesItems.map(m => <option key={m.get('key')}
                                                          value={m.get('value')}>
                    {m.get('value')}
                </option>);
        }
        return null;
    }

    handleChange(info) {
        let fileList = info.fileList;

        // 1. Limit the number of uploaded files
        //    Only to show two recent uploaded files, and old ones will be replaced by the new
        fileList = fileList.slice(-2);

        // 2. read from response and show file link
        fileList = fileList.map((file) => {
            if(file.response) {
                // Component will show file.url as link
                file.url = file.response.url;
            }
            return file;
        });

        // 3. filter successfully uploaded files according to response from server
        fileList = fileList.filter((file) => {
            if(file.response) {
                return file.response.status === 'success';
            }
            return true;
        });

        this.setState({fileList});
    }

    render() {
        const repairOrder = this.props.repairOrder;
        // let repairTypeItems = this.createOption('repairTypes');
        // let backStatuesItem = this.createOption('backStatues');
        const props = {
            action: '/upload.do',
            onChange: this.handleChange,
            multiple: true,
        };

        return (
            <div className="insertForm">
                <p>车辆信息</p>
                <table id="demo-table">
                    <tbody>
                    <tr>
                        <td >维修对象</td>
                        <td>
                            <Select style={{width: 180}}
                                    data-field="repairObjectId">
                                {/*
                                 value={repairOrder.get('repairObjectId')}*/}
                                <Option value="1">整车
                                </Option>
                                <Option value="2">专项发动机
                                </Option>
                            </Select>
                        </td>
                        <td >出厂编号</td>
                        <td>
                            <Input type="text"
                                   onChange={this.onChange}
                                   onBlur={this.onBlur}
                                   value={repairOrder.get('serialNumber')}
                                   data-field="serialNumber"/>
                        </td>
                        <td >车牌号</td>
                        <td>
                            <Input type="text"
                                   onChange={this.onChange}
                                   onBlur={this.onBlur}
                                   value={repairOrder.get('vehicleLicensePlate')}
                                   data-field="vehicleLicensePlate"/>
                        </td>
                        <td >VIN码</td>
                        <td>
                            <Input style={{width: '170px'}}
                                   onChange={this.onChange}
                                   onBlur={this.onBlur}
                                   value={repairOrder.get('vin')}
                                   data-field="vin">
                            </Input>
                            {/*<button id="fat-btn" data-loading-text="查询中"*/}
                            {/*className="icon-search"*/}
                            {/*onClick={this.onVehicleQuery}/>*/}
                            <a>
                                <Icon type="search" onClick={this.onVehicleQuery}/></a>
                        </td>
                    </tr>
                    <tr>
                        <td>产品系列</td>
                        <td>
                            <Input type="text"
                                   readOnly="readonly"
                                   onChange={this.onChange}
                                   value={repairOrder.get('productSeries')}
                                   data-field="productSeries"/>
                        </td>
                        <td >工况类别</td>
                        <td>
                            <Input type="text"
                                   readOnly="readonly"
                                   onChange={this.onChange}
                                   value={repairOrder.get('productType')}
                                   data-field="productSeries"/>
                        </td>
                        <td >服务产品线</td>
                        <td>
                            <Input type="text"
                                   readOnly="readonly"
                                   onChange={this.onChange}
                                   disabled="disabled"
                                   value={repairOrder.get('productLineName')}
                                   data-field="productLineName"/>
                        </td>
                        <td > 品牌</td>
                        <td>
                            <Input type="text"
                                   readOnly="readonly"
                                   disabled="disabled"
                                   onChange={this.onChange}
                                   value={repairOrder.get('brandName')}
                                   data-field="brandName"/>
                        </td>
                    </tr>
                    <tr>
                        <td >整车编码</td>
                        <td>
                            <Input type="text"
                                   readOnly="readonly"
                                   onChange={this.onChange}
                                   disabled="disabled"
                                   value={repairOrder.get('topsCode')}
                                   data-field="topsCode"/>
                        </td>
                        <td >发动机型号</td>
                        <td>
                            <Input type="text"
                                   readOnly="readonly"
                                   disabled="disabled"
                                   onChange={this.onChange}
                                   value={repairOrder.get('engineModel')}
                                   data-field="engineModel"/>
                        </td>
                        <td >发动机编号</td>
                        <td>
                            <Input type="text"
                                   readOnly="readonly"
                                   disabled="disabled"
                                   onChange={this.onChange}
                                   value={repairOrder.get('engineSerialNumber')}
                                   data-field="engineSerialNumber"/>
                        </td>
                        <td >车型名称</td>
                        <td>
                            <Input type="text"
                                   readOnly="readonly"
                                   disabled="disabled"
                                   onChange={this.onChange}
                                   value={repairOrder.get('productCategoryName')}
                                   data-field="productCategoryName"/>
                        </td>
                    </tr>
                    <tr>
                        <td >变速箱型号</td>
                        <td>
                            <Input type="text"
                                   readOnly="readonly"
                                   disabled="disabled"
                                   onChange={this.onChange}
                                   value={repairOrder.get('gearModel')}
                                   data-field="gearModel"/>
                        </td>
                        <td >变速箱序列号</td>
                        <td>
                            <Input type="text"
                                   readOnly="readonly"
                                   disabled="disabled"
                                   onChange={this.onChange}
                                   value={repairOrder.get('gearSerialNumber')}
                                   data-field="gearSerialNumber"/>
                        </td>
                        <td >销售日期</td>
                        <td>
                            <Input type="text"
                                   readOnly="readonly"
                                   disabled="disabled"
                                   onChange={this.onChange}
                                   value={repairOrder.get('salesDate')}
                                   data-field="salesDate"/>
                        </td>
                        <td > 车桥类型</td>
                        <td>
                            <Select style={{width: 180}}
                                    onChange={this.onChange}
                                    data-field="bridgeType">
                                {/*value={repairOrder.get('bridgeType')}*/}
                                <Option value="-1">商务型</Option>
                            </Select>
                        </td>
                    </tr>
                    <tr>
                        <td > 营销公司</td>
                        <td>
                            <Input type="text"
                                   readOnly="readonly"
                                   disabled="disabled"
                                   onChange={this.onChange}
                                   value={repairOrder.get('branchName')}
                                   data-field="branchName"/>
                        </td>
                        <td > 生产工厂</td>
                        <td>
                            <Select style={{width: 180}}
                                    onChange={this.onChange}
                                    data-field="factoryPrise">
                                {/*
                                 value={repairOrder.get('factoryPrise')}*/}
                                <Option value="-1">GC001</Option>
                            </Select>
                        </td>
                        <td > 客户名称</td>
                        <td><Input type="text"
                                   readOnly="readonly"
                                   disabled="disabled"
                                   onChange={this.onChange}
                                   value={repairOrder.get('customerName')}
                                   data-field="customerName"/>
                        </td>
                        <td > 出厂日期</td>
                        <td><Input type="text"
                                   readOnly="readonly"
                                   disabled="disabled"
                                   onChange={this.onChange}
                                   value={repairOrder.get('outOfFactoryDate')}
                                   data-field="outOfFactoryDate"/>
                        </td>
                    </tr>
                    <tr>
                        <td >联系人</td>
                        <td>
                            <Input style={{width: '170px'}}
                                   onChange={this.onChange}
                                   onBlur={this.onBlur}
                                   value={repairOrder.get('vehicleContactPerson')}
                                   data-field="vehicleContactPerson"/>
                            <a>
                                <Icon type="search" onClick={this.showModal}/></a>
                            <CollectionCreateForm
                                visible={this.state.visible}
                                onCancel={this.handleCancel}
                            />
                        </td>
                        <td> 联系电话</td>
                        <td>
                            <Input type="text"
                                   onChange={this.onChange}
                                   onBlur={this.onBlur}
                                   value={repairOrder.get('contactPhone')}
                                   data-field="contactPhone"/>
                        </td>
                        <td >手机号码</td>
                        <td>
                            <Input type="text"
                                   readOnly="readonly"
                                   onChange={this.onChange}
                                   value={repairOrder.get('customerCellPhoneNumber')}
                                   data-field="customerCellPhoneNumber"/>
                        </td>
                        <td colSpan="2">
                            <Checkbox data-field="vIPVehicle" value={repairOrder.get('vIPVehicle')}>VIP</Checkbox>
                            <Checkbox data-field="isTeamCustomers" value={repairOrder.get('isTeamCustomers')}>车队客户</Checkbox>
                        </td>
                    </tr>
                    <tr>
                        <td >会员号</td>
                        <td>
                            <Input style={{width: '170px'}}
                                   onChange={this.onChange}
                                   onBlur={this.onBlur}
                                   value={repairOrder.get('member')}
                                   data-field="member"/>
                            <a>
                                <Icon type="search" onClick={this.showModal}/></a>
                            <CollectionCreateForm
                                visible={this.state.visible}
                                onCancel={this.handleCancel}
                            />
                        </td>
                        <td >会员等级</td>
                        <td>
                            <Input type="text"
                                   onChange={this.onChange}
                                   onBlur={this.onBlur}
                                   disabled="disabled"
                                   value={repairOrder.get('customerType')}
                                   data-field="customerType"/>
                        </td>
                        <td >证件类型</td>
                        <td>
                            <Input type="text"
                                   onChange={this.onChange}
                                   onBlur={this.onBlur}
                                   disabled="disabled"
                                   value={repairOrder.get('idDocumentType')}
                                   data-field="idDocumentType"/>
                        </td>
                        <td >证件号码</td>
                        <td>
                            <Input type="text"
                                   onChange={this.onChange}
                                   onBlur={this.onBlur}
                                   disabled="disabled"
                                   data-field="idDocumentNumber"/>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <Tabs defaultActiveKey="1" onChange={this.callback} renderTabBar="..." renderTabContent="...">
                    <TabPane tab="主信息" key="1">
                        <table id="demo-table">
                            <tbody>
                            <tr>
                                <td>车辆状态</td>
                                <td><Input
                                    value={repairOrder.get('vehicleStatus')}
                                    data-field="vehicleStatus"
                                    className="Input"
                                    onChange={this.onChange}/></td>
                                <td>维修类型</td>
                                <td>
                                    <Select style={{width: 180}}
                                            onChange={this.handleSelectChange}
                                            data-field="repairType">
                                        {/*{repairTypeItems}*/}
                                        <Option value="1">普通维修 </Option>
                                        <Option value="2">外出服务 </Option>
                                        <Option value="3">强制保养 </Option>
                                        <Option value="4">普通保养 </Option>
                                        <Option value="5">商品车维修</Option>
                                        <Option value="6">事故维修</Option>
                                        <option value="7">服务活动</option>
                                        <Option value="8">商品车保养</Option>
                                        <option value="9">让度服务</option>
                                    </Select>
                                </td>
                                <td>驳回状态</td>
                                <td>
                                    <Select style={{width: 180}}
                                            onChange={this.handleSelectChange}
                                            data-field="rejectStatus">
                                        {/*
                                         value={repairOrder.get('rejectStatus')}*/}
                                        <Option value="1">未驳回</Option>
                                        <Option value="2">维修驳回</Option>
                                        <Option value="3">外出驳回</Option>
                                        <Option value="4">全部驳回</Option>
                                    </Select>
                                </td>
                                <td>保修时间</td>
                                <td>
                                    {/*value={repairOrder.get('warrantyTime')}*/}
                                    <DatePicker
                                        defaultValue={moment('2017/01/01', dateFormat)}
                                        data-field="warrantyTime"/></td>
                            </tr>
                            <tr>
                                <td>行驶里程</td>
                                <td><Input value={repairOrder.get('drivenDistance')}
                                           data-field="drivenDistance"
                                           className="Input"
                                           onChange={this.onChange}/></td>
                                <td>工作小时</td>
                                <td><Input className="Input" value={repairOrder.get('workingHours')}
                                           data-field="workingHours"
                                           onChange={this.onChange}/></td>
                                <td>方量</td>
                                <td><Input className="Input" value={repairOrder.get('capacity')}
                                           data-field="capacity"
                                           onChange={this.onChange}/></td>
                                <td>完工时间</td>
                                <td>
                                    {/*value={repairOrder.get('finishingTime')}*/}
                                    <DatePicker
                                        defaultValue={moment('2017/01/01', dateFormat)}
                                        data-field="finishingTime"/></td>
                            </tr>
                            <tr>
                                <td >车辆用途说明</td>
                                <td colSpan="5">
                                    <Input type="text"
                                           className="mutileText"
                                           onBlur={this.onBlur}
                                           onChange={this.onChange}
                                           value={repairOrder.get('vehicleUse')}
                                           data-field="vehicleUse"/>
                                </td>
                                <td >视频手机号</td>
                                <td>
                                    <Select style={{width: 180}}
                                            onChange={this.Select} data-field="videoMobileNumber">
                                        {/*value={repairOrder.get('videoMobileNumber')}*/}
                                        <Option value="1">13265445699</Option>
                                    </Select>
                                </td>
                            </tr>
                            <tr>
                                <td >车辆故障描述</td>
                                <td colSpan="5">
                                    <Input type="text"
                                           className="mutileText"
                                           onBlur={this.onBlur}
                                           onChange={this.onChange}
                                           value={repairOrder.get('carActuality')}
                                           data-field="carActuality"/>
                                </td>
                                <td >派工单号</td>
                                <td>
                                    <Select style={{width: 180}} onChange={this.handleSelectChange}>
                                        <Option value="1">GD201601223666</Option>
                                    </Select>
                                </td>
                            </tr>
                            <tr>
                                <td >客户意见</td>
                                <td colSpan="5">
                                    <Input type="text"
                                           className="mutileText"
                                           onBlur={this.onBlur}
                                           onChange={this.onChange}
                                           value={repairOrder.get('customOpinion')}
                                           data-field="customOpinion"/>
                                </td>
                                <td rowSpan="3">文件上传</td>
                                <td rowSpan="3">
                                    <Upload {...props} fileList={this.state.fileList} style={{minHeight: '60px'}}>
                                        <Button type="ghost">
                                            <Icon type="upload"/> 上传
                                        </Button>
                                    </Upload>
                                </td>
                            </tr>
                            <tr>
                                <td >处理意见</td>
                                <td colSpan="5">
                                    <Input type="text"
                                           className="mutileText"
                                           onChange={this.onChange}
                                           onBlur={this.onBlur}
                                           value={repairOrder.get('callOpinion')}
                                           data-field="callOpinion"/>
                                </td>
                            </tr>
                            <tr>
                                <td >备注</td>
                                <td colSpan="5">
                            <textarea
                                className="mutileTextRemark"
                                onChange={this.onChange}
                                onBlur={this.onBlur}
                                value={repairOrder.get('remark')}
                                data-field="remark"/>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </TabPane>
                    <TabPane tab="+" key="2">故障原因</TabPane>
                </Tabs>
                {/*<ul className="repairOrderUl">*/}
                {/*<li className="repairOrderli">*/}
                {/*<a href="#home" data-toggle="tab">*/}
                {/*主信息*/}
                {/*</a>*/}
                {/*</li>*/}
                {/*<li className="repairOrderli">*/}
                {/*<a href="#InsertFault"*/}
                {/*onClick={this.onCreateFault}*/}
                {/*data-toggle="tab" data-toggle="tab">*/}
                {/*</a><Icon type="plus"/>*/}
                {/*</li>*/}
                {/*</ul>*/}
                <div className="addButton">
                    <Button onClick={this.handleSubmitClick}>提交</Button>
                </div>
            </div>
        )
            ;
    }
}

InsertRepairOrder.propTypes = {
    onSubmit: React.PropTypes.func.isRequired,
    queryVehicleByParameters: React.PropTypes.func
};


export default InsertRepairOrder;