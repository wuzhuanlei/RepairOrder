import React, {Component} from 'react';
import 'antd/dist/antd.css';
import {Form, Row, Col, Input, Button, Icon, Select, DatePicker} from 'antd';
const FormItem = Form.Item;
const {RangePicker} = DatePicker;
const Option = Select.Option;

class QueryPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vehiclePlate: '',
            code: '',
            outOfFactoryCode: '',
            brandName: '',
            repairType: '',
            createTime: '',
            rejectStatus: '',
            vin: '',
            branchName: '',
            status: '',
            productLine: '',
            expand: false,
        };
        this.handleQueryClick = this.handleQueryClick.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleSelected = this.handleSelected.bind(this);
        this.createOption = this.createOption.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.toggle = this.toggle.bind(this);
        this.handleChange=this.handleChange.bind(this);
    }


    handleSearch(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log('Received values of form: ', values);
        });
    };


    toggle() {
        const {expand} = this.state;
        this.setState({expand: !expand});
    };


    createOption(name) {
        const keyValueItems = this.props.queryPanelPage.getIn(['keyValueItems', name]);
        if(keyValueItems) {
            return keyValueItems.map(m => <Option key={m.get('key')}
                                                  value={m.get('value')}>
                {m.get('value')}
            </Option>);
        }
        return null;
    }


    handleQueryClick() {
        const vehiclePlate = this.state.vehiclePlate.trim();
        const code = this.state.code.trim();
        const outOfFactoryCode = this.state.outOfFactoryCode.trim();
        const brandName = this.state.brandName;
        const repairType = this.state.repairType;
        const createTime = this.state.createTime;
        const rejectStatus = this.state.rejectStatus;
        const vin = this.state.vin;
        const branchName = this.state.branchName;
        const status = this.state.status;
        const productLine = this.state.productLine;
        this.props.onQuery(vehiclePlate, code, outOfFactoryCode, brandName, repairType, createTime, rejectStatus, vin, branchName, status, productLine);
        this.setState({
            vehiclePlate: '',
            code: '',
            outOfFactoryCode: '',
            brandName: '',
            repairType: '',
            createTime: '',
            rejectStatus: '',
            vin: '',
            branchName: '',
            status: '',
            productLine: ''
        });
    }

    handleSelected(e) {
        // this.props.onValueChange(e.target.dataset.field, e.target.value.trim());

        // let getselected = e.target;
        // let selectedIndex = getselected.selectedIndex;
        // let selectedvalue = getselected.options[selectedIndex].innerHTML;
        // switch(getselected.name) {
        //     case "repairType":
        //         this.setState({
        //             repairType: selectedvalue
        //         });
        //         break;
        //     case "status":
        //         this.setState({
        //             status: selectedvalue
        //         });
        //         break;
        //     case "rejectStatus":
        //         this.setState({
        //             rejectStatus: selectedvalue
        //         });
        //         break;
        //     case "brandName":
        //         this.setState({
        //             brandName: selectedvalue
        //         });
        //         break;
        //     case "branchName":
        //         this.setState({
        //             branchName: selectedvalue
        //         });
        //         break;
        //     case "productLine":
        //         this.setState({
        //             productLine: selectedvalue
        //         });
        //         break;
        // }
    }

    handleValueChange(e) {
        //let getInput = e.target;
        // switch(getInput.name) {
        //     case "code":
        //         this.setState({
        //             code: getInput.value
        //         });
        //         break;
        //     case "vehiclePlate":
        //         this.setState({
        //             vehiclePlate: getInput.value
        //         });
        //         break;
        //     case "outOfFactoryCode":
        //         this.setState({
        //             outOfFactoryCode: getInput.value
        //         });
        //         break;
        //     case "vin":
        //         this.setState({
        //             vin: getInput.value
        //         });
        //         break;
        //     case "createTime":
        //         this.setState({
        //             createTime: getInput.value
        //         });
        //         break;
        // }
    }

    handleChange(e){

    }

    render() {
        let repairTypeItems = this.createOption('repairTypes');
        let backStatusItems = this.createOption('backStatues');
        let repairStatusItems = this.createOption('repairStatus');
        let branchItems = null;
        let brandItems = null;
        let serviceProductLineViewItems = null;
        if(this.props.queryPanelPage) {
            const branches = this.props.queryPanelPage.getIn(['keyValueItems', 'branches']);
            if(branches)
                branchItems = branches.map(m =>
                    <Option key={m.get('name')}
                            value={m.get('name')}>
                        {m.get('name')}
                    </Option>
                );
            const brands = this.props.queryPanelPage.getIn(['keyValueItems', 'brands']);
            if(brands)
                brandItems = brands.map(m =>
                    <Option key={m.get('name')}
                            value={m.get('name')}>
                        {m.get('name')}
                    </Option>
                );
            const serviceProductLines = this.props.queryPanelPage.getIn(['keyValueItems', 'serviceProductLineViews']);
            if(serviceProductLines !== undefined)
                serviceProductLineViewItems = serviceProductLines.map(m =>
                    <Option key={m.get('productLineName')}
                            value={m.get('productLineName')}>
                        {m.get('productLineName')}
                    </Option>
                );
        }
        const formItemLayout = {
            labelCol: {span: 8},
            wrapperCol: {span: 15},
        };
        // To generate mock Form.Item
        const children = [];
        children.push(
            <Col span={4}>
                <FormItem {...formItemLayout} label='车牌号:'>
                    <Input value={this.state.vehiclePlate}
                           data-field="vehiclePlate"
                           onChange={this.handleValueChange}/>
                </FormItem>
            </Col>,
            <Col span={4}>
                <FormItem {...formItemLayout} label='出厂编号:'>
                    <Input value={this.state.outOfFactoryCode}
                           data-field="outOfFactoryCode"
                           onChange={this.handleValueChange}/>
                </FormItem>
            </Col>,
            <Col span={4}>
                <FormItem {...formItemLayout} label='维修单号:'>
                    <Input value={this.state.code}
                           data-field="code"
                           onChange={this.handleValueChange}/>
                </FormItem>
            </Col>,
            <Col span={4}>
                <FormItem {...formItemLayout} label='维修类型:'>
                    <Select data-field="repairType" onChange={this.handleChange}>
                        {repairTypeItems}
                    </Select>
                </FormItem>
            </Col>,
            <Col span={4}>
                <FormItem {...formItemLayout} label='品牌:'>
                    <Select data-field="brandName" onChange={this.handleChange}>
                        {brandItems}
                    </Select>
                </FormItem>
            </Col>,
            <Col span={4}>
                <FormItem {...formItemLayout} label='驳回状态:'>
                    <Select data-field="rejectStatus" onChange={this.handleChange}>
                        {backStatusItems}
                    </Select>
                </FormItem>
            </Col>,
            <Col span={4}>
                <FormItem {...formItemLayout} label='VIN码:'>
                    <Input value={this.state.vin}
                           data-field="vin"
                           onChange={this.handleValueChange}/>
                </FormItem>
            </Col>,
            <Col span={4}>
                <FormItem {...formItemLayout} label='状 态:'>
                    <Select data-field="status" onChange={this.handleChange}>
                        {repairStatusItems}
                    </Select>
                </FormItem>
            </Col>,
            <Col span={4}>
                <FormItem {...formItemLayout} label='分公司:'>
                    <Select data-field="branchName" onChange={this.handleChange}>
                        {branchItems}
                    </Select>
                </FormItem>
            </Col>,
            <Col span={4}>
                <FormItem {...formItemLayout} label='服务产品线:'>
                    <Select data-field="productLine" onChange={this.handleChange}>
                        {serviceProductLineViewItems}
                    </Select>
                </FormItem>
            </Col>,
            <Col span={4}>
                <FormItem {...formItemLayout} label='创建时间:'>
                    <RangePicker  />
                </FormItem>
            </Col>,
        );

        const expand = this.state.expand;
        const shownCount = expand ? children.length : 12;
        return (
            <Form style={{
                marginTop: '5px'
            }}
                  className="ant-advanced-search-form"
                  onSubmit={this.handleSearch}>
                <Row gutter={50}>
                    {children.slice(0, shownCount)}
                </Row>
                {/*<Row gutter={50}>*/}
                {/*{queryPanelChildren.slice(0, shownCount)}*/}
                {/*</Row>*/}
                <Row>
                    <Col span={24} style={{textAlign: 'right'}}>
                        <Button type="primary" htmlType="submit">查询</Button>
                        <Button style={{marginLeft: 8}} onClick={this.handleReset}>
                            清除
                        </Button>
                        <a style={{
                            marginLeft: 8,
                            fontSize: 12
                        }} onClick={this.toggle}>
                            <Icon type={expand ? 'up' : 'down'}/>
                        </a>
                    </Col>
                </Row>
            </Form>
        );
    }
}

export  default  QueryPanel;