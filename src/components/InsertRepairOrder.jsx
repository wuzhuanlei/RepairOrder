import React, {Component} from 'react';
import {uuid} from '../common/utils';

class InsertRepairOrder extends Component {
    constructor(props) {
        super(props);
        this.handleSubmitClick = this.handleSubmitClick.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onCreateFault = this.onCreateFault.bind(this);
        this.createOption = this.createOption.bind(this);
        this.onQueryContact=this.onQueryContact.bind(this);
    }

    onBlur(e) {

    }

    //查询联系人信息
    onQueryContact(){

    }

    onChange(e) {
        this.props.onValueChange(e.target.dataset.field, e.target.value.trim());
    }


    handleSubmitClick() {
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
                                                          value={m.get('Id')}>
                    {m.get('value')}
                </option>);
        }
        return null;
    }

    render() {
        const repairOrder = this.props.repairOrder;
        let repairTypeItems = this.createOption('repairTypes');
        let backStatuesItem = this.createOption('backStatues');
        return (
            <div className="insertForm">
                <p>车辆信息</p>
                <table id="demo-table">
                    <tbody>
                    <tr>
                        <td >维修对象</td>
                        <td>
                            <select
                                value={repairOrder.get('repairObjectId')}
                                data-field="repairObjectId">
                                <option value="">整车</option>
                                <option value="">专项发动机</option>
                            </select>
                        </td>
                        <td >出厂编号</td>
                        <td>
                            <input type="text"
                                   onChange={this.onChange}
                                   onBlur={this.onBlur}
                                   value={repairOrder.get('serialNumber')}
                                   data-field="serialNumber"/>
                        </td>
                        <td >车牌号</td>
                        <td>
                            <input type="text"
                                   onChange={this.onChange}
                                   onBlur={this.onBlur}
                                   value={repairOrder.get('vehicleLicensePlate')}
                                   data-field="vehicleLicensePlate"/>
                        </td>
                        <td >VIN码</td>
                        <td>
                            <input type="text"
                                   onChange={this.onChange}
                                   onBlur={this.onBlur}
                                   value={repairOrder.get('vin')}
                                   data-field="vin">
                            </input>
                            <button id="fat-btn" data-loading-text="查询中"
                                    className="icon-search"
                                    onClick={this.onVehicleQuery}/>
                        </td>
                    </tr>
                    <tr>
                        <td>产品系列</td>
                        <td>
                            <input type="text"
                                   readOnly="readonly"
                                   disabled="disabled"
                                   onChange={this.onChange}
                                   value={repairOrder.get('productSeries')}
                                   data-field="productSeries"/>
                        </td>
                        <td >工况类别</td>
                        <td>
                            <input type="text"
                                   readOnly="readonly"
                                   disabled="disabled"
                                   onChange={this.onChange}
                                   value={repairOrder.get('productType')}
                                   data-field="productSeries"/>
                        </td>
                        <td >服务产品线</td>
                        <td>
                            <input type="text"
                                   readOnly="readonly"
                                   onChange={this.onChange}
                                   disabled="disabled"
                                   value={repairOrder.get('productLineName')}
                                   data-field="productLineName"/>
                        </td>
                        <td > 品牌</td>
                        <td>
                            <input type="text"
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
                            <input type="text"
                                   readOnly="readonly"
                                   onChange={this.onChange}
                                   disabled="disabled"
                                   value={repairOrder.get('topsCode')}
                                   data-field="topsCode"/>
                        </td>
                        <td >发动机型号</td>
                        <td>
                            <input type="text"
                                   readOnly="readonly"
                                   disabled="disabled"
                                   onChange={this.onChange}
                                   value={repairOrder.get('engineModel')}
                                   data-field="engineModel"/>
                        </td>
                        <td >发动机编号</td>
                        <td>
                            <input type="text"
                                   readOnly="readonly"
                                   disabled="disabled"
                                   onChange={this.onChange}
                                   value={repairOrder.get('engineSerialNumber')}
                                   data-field="engineSerialNumber"/>
                        </td>
                        <td >车型名称</td>
                        <td>
                            <input type="text"
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
                            <input type="text"
                                   readOnly="readonly"
                                   disabled="disabled"
                                   onChange={this.onChange}
                                   value={repairOrder.get('gearModel')}
                                   data-field="gearModel"/>
                        </td>
                        <td >变速箱序列号</td>
                        <td>
                            <input type="text"
                                   readOnly="readonly"
                                   disabled="disabled"
                                   onChange={this.onChange}
                                   value={repairOrder.get('gearSerialNumber')}
                                   data-field="gearSerialNumber"/>
                        </td>
                        <td >销售日期</td>
                        <td>
                            <input type="text"
                                   readOnly="readonly"
                                   disabled="disabled"
                                   onChange={this.onChange}
                                   value={repairOrder.get('salesDate')}
                                   data-field="salesDate"/>
                        </td>
                        <td > 车桥类型</td>
                        <td>
                            <select
                                onChange={this.onChange}
                                value={repairOrder.get('bridgeType')}
                                data-field="bridgeType">
                                <option value="-1"></option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td > 营销公司</td>
                        <td>
                            <input type="text"
                                   readOnly="readonly"
                                   disabled="disabled"
                                   onChange={this.onChange}
                                   value={repairOrder.get('branchName')}
                                   data-field="branchName"/>
                        </td>
                        <td > 生产工厂</td>
                        <td><select
                            onChange={this.onChange}
                            value={repairOrder.get('factoryPrise')}
                            data-field="factoryPrise">
                            <option value="-1"></option>
                        </select>
                        </td>
                        <td > 客户名称</td>
                        <td><input type="text"
                                   readOnly="readonly"
                                   disabled="disabled"
                                   onChange={this.onChange}
                                   value={repairOrder.get('customerName')}
                                   data-field="customerName"/>
                        </td>
                        <td > 出厂日期</td>
                        <td><input type="text"
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
                            <input type="text"
                                   onChange={this.onChange}
                                   onBlur={this.onBlur}
                                   value={repairOrder.get('vehicleContactPerson')}
                                   data-field="vehicleContactPerson"/>
                            <button onClick={this.onQueryContact} className="icon-popubutton"/>
                        </td>
                        <td > 联系电话</td>
                        <td>
                            <input type="text"
                                   onChange={this.onChange}
                                   onBlur={this.onBlur}
                                   value={repairOrder.get('contactPhone')}
                                   data-field="contactPhone"/>
                        </td>
                        <td >手机号码</td>
                        <td>
                            <input type="text"
                                   readOnly="readonly"
                                   onChange={this.onChange}
                                   disabled="disabled"
                                   value={repairOrder.get('customerCellPhoneNumber')}
                                   data-field="customerCellPhoneNumber"/>
                        </td>
                        <td colSpan="2">
                            <div><label>VIP</label>
                                <input type="checkBox" data-field="vIPVehicle" value={repairOrder.get('vIPVehicle')}/>
                                <label>车队客户</label>
                                <input type="checkBox" data-field="isTeamCustomers" value={repairOrder.get('isTeamCustomers')}/>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td >会员号</td>
                        <td>
                            <input type="text"
                                   onChange={this.onChange}
                                   onBlur={this.onBlur}
                                   value={repairOrder.get('member')}
                                   data-field="member"/>
                            <button onClick={this.onQueryMember} className="icon-popubutton"/>
                        </td>
                        <td >会员等级</td>
                        <td>
                            <input type="text"
                                   onChange={this.onChange}
                                   onBlur={this.onBlur}
                                   disabled="disabled"
                                   value={repairOrder.get('customerType')}
                                   data-field="customerType"/>
                        </td>
                        <td >证件类型</td>
                        <td>
                            <input type="text"
                                   onChange={this.onChange}
                                   onBlur={this.onBlur}
                                   disabled="disabled"
                                   value={repairOrder.get('idDocumentType')}
                                   data-field="idDocumentType"/>
                        </td>
                        <td >证件号码</td>
                        <td>
                            <input type="text"
                                   onChange={this.onChange}
                                   onBlur={this.onBlur}
                                   disabled="disabled"
                                   value={repairOrder.get('idDocumentNumber')}
                                   data-field="idDocumentNumber"/>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <ul className="repairOrderUl">
                    <li className="repairOrderli">
                        <a href="#home" data-toggle="tab">
                            主信息
                        </a>
                    </li>
                    <li className="repairOrderli">
                        <div className="InsertFault">
                            <a href="#InsertFault"
                               onClick={this.onCreateFault}
                               data-toggle="tab" data-toggle="tab">
                            </a>
                        </div>
                    </li>
                </ul>
                <table id="demo-table">
                    <tbody>
                    <tr>
                        <td>车辆状态</td>
                        <td><input
                            value={repairOrder.get('vehicleStatus')}
                            data-field="vehicleStatus"
                            className="input"
                            onChange={this.onChange}/></td>
                        <td>维修类型</td>
                        <td>
                            <select onChange={this.onChange}
                                    value={repairOrder.get('repairType')}
                                    data-field="repairType">
                                <option>普通维修</option>
                                <option>外出服务</option>
                                <option>强制保养</option>
                                <option>普通保养</option>
                                <option>商品车维修</option>
                                <option>事故维修</option>
                                <option>服务活动</option>
                                <option>商品车保养</option>
                                <option>让度服务</option>
                            </select>
                        </td>
                        <td>驳回状态</td>
                        <td>
                            <select onChange={this.onChange}
                                    value={repairOrder.get('rejectStatus')}
                                    data-field="rejectStatus">
                                <option >未驳回</option>
                                <option >维修驳回</option>
                                <option >外出驳回</option>
                                <option >全部驳回</option>
                            </select>
                        </td>
                        <td>保修时间</td>
                        <td><input type="date" value={repairOrder.get('warrantyTime')}
                                   data-field="warrantyTime"
                                   className="input"
                                   onChange={this.onChange}/></td>
                    </tr>
                    <tr>
                        <td>行驶里程</td>
                        <td><input value={repairOrder.get('drivenDistance')}
                                   data-field="drivenDistance"
                                   className="input"
                                   onChange={this.onChange}/></td>
                        <td>工作小时</td>
                        <td><input className="input" value={repairOrder.get('workingHours')}
                                   data-field="workingHours"
                                   onChange={this.onChange}/></td>
                        <td>方量</td>
                        <td><input className="input" value={repairOrder.get('capacity')}
                                   data-field="capacity"
                                   onChange={this.onChange}/></td>
                        <td>完工时间</td>
                        <td><input type="date"
                                   value={repairOrder.get('finishingTime')}
                                   className="input"
                                   data-field="finishingTime"
                                   onChange={this.onChange}/></td>
                    </tr>
                    <tr>
                        <td >车辆用途说明</td>
                        <td colSpan="5">
                            <input type="text"
                                   className="mutileText"
                                   onBlur={this.onBlur}
                                   onChange={this.onChange}
                                   value={repairOrder.get('vehicleUse')}
                                   data-field="vehicleUse"/>
                        </td>
                        <td >视频手机号</td>
                        <td>
                            <select onChange={this.onChange} value={repairOrder.get('videoMobileNumber')} data-field="videoMobileNumber">
                                <option >13265445699</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td >车辆故障描述</td>
                        <td colSpan="5">
                            <input type="text"
                                   className="mutileText"
                                   onBlur={this.onBlur}
                                   onChange={this.onChange}
                                   value={repairOrder.get('carActuality')}
                                   data-field="carActuality"/>
                        </td>
                        <td >派工单号</td>
                        <td>
                            <select>
                                <option >GD201601223666</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td >客户意见</td>
                        <td colSpan="5">
                            <input type="text"
                                   className="mutileText"
                                   onBlur={this.onBlur}
                                   onChange={this.onChange}
                                   value={repairOrder.get('customOpinion')}
                                   data-field="customOpinion"/>
                        </td>
                        <td >文件上传</td>
                        <td rowSpan="3">
                            <input type="file" name="fileName" className="fileInput"/><input type="submit"/>
                        </td>
                    </tr>
                    <tr>
                        <td >处理意见</td>
                        <td colSpan="5">
                            <input type="text"
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
                <div className="addButton">
                    <button onClick={this.handleSubmitClick}>提交</button>
                </div>
            </div>
        );
    }
}

InsertRepairOrder.propTypes = {
    onSubmit: React.PropTypes.func.isRequired
};


export default InsertRepairOrder;