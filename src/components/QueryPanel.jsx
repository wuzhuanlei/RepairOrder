import React, {Component} from 'react';
import {ALL_REPAIRORDERS} from '../common/constants';

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
            productLine: ''
        };
        this.handleQueryClick = this.handleQueryClick.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleSelected = this.handleSelected.bind(this);
        this.createOption = this.createOption.bind(this);
    }


    createOption(name) {
        const keyValueItems = this.props.queryPanelPage.getIn(['keyValueItems', name]);
        if(keyValueItems) {
            return keyValueItems.map(m => <option key={m.get('key')}
                                                  value={m.get('Id')}>
                {m.get('value')}
            </option>);
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
        let getselected = e.target;
        let selectedIndex = getselected.selectedIndex;
        let selectedvalue = getselected.options[selectedIndex].innerHTML;
        switch(getselected.name) {
            case "repairType":
                this.setState({
                    repairType: selectedvalue
                });
                break;
            case "status":
                this.setState({
                    status: selectedvalue
                });
                break;
            case "rejectStatus":
                this.setState({
                    rejectStatus: selectedvalue
                });
                break;
            case "brandName":
                this.setState({
                    brandName: selectedvalue
                });
                break;
            case "branchName":
                this.setState({
                    branchName: selectedvalue
                });
                break;
            case "productLine":
                this.setState({
                    productLine: selectedvalue
                });
                break;
        }


    }

    handleValueChange(e) {
        let getInput = e.target;
        switch(getInput.name) {
            case "code":
                this.setState({
                    code: getInput.value
                });
                break;
            case "vehiclePlate":
                this.setState({
                    vehiclePlate: getInput.value
                });
                break;
            case "outOfFactoryCode":
                this.setState({
                    outOfFactoryCode: getInput.value
                });
                break;
            case "vin":
                this.setState({
                    vin: getInput.value
                });
                break;
            case "createTime":
                this.setState({
                    createTime: getInput.value
                });
                break;
        }
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
                    <option key={m.get('name')}
                            value={m.get('Id')}>
                        {m.get('name')}
                    </option>
                );
            const brands = this.props.queryPanelPage.getIn(['keyValueItems', 'brands']);
            if(brands)
                brandItems = brands.map(m =>
                    <option key={m.get('name')}
                            value={m.get('Id')}>
                        {m.get('name')}
                    </option>
                );
            const serviceProductLines = this.props.queryPanelPage.getIn(['keyValueItems', 'serviceProductLineViews']);
            if(serviceProductLines !== undefined)
                serviceProductLineViewItems = serviceProductLines.map(m =>
                    <option key={m.get('productLineName')}
                            value={m.get('productLineId')}>
                        {m.get('productLineName')}
                    </option>
                );
        }
        return (
            <div className="query">
                <div className="queryPanel">
                    <div className="queryItem">
                        <label className="lab">车牌号：</label>
                        <input className="input" value={this.state.vehiclePlate}
                               name="vehiclePlate"
                               data-field="vehiclePlate"
                               onChange={this.handleValueChange}/></div>
                    <div className="queryItem">
                        <label className="lab">出厂编号：</label>
                        <input className="input" value={this.state.outOfFactoryCode} name="outOfFactoryCode" onChange={this.handleValueChange}/>
                    </div>
                    <div className="queryItem">
                        <label className="lab">维修单号：</label>
                        <input className="input" value={this.state.code} name="code" onChange={this.handleValueChange}/>
                    </div>
                    <div className="queryItem">
                        <label className="lab">维修类型：</label>
                        <select name="repairType" onChange={this.handleSelected}>
                            {/*<option>普通维修</option>*/}
                            {/*<option>外出服务</option>*/}
                            {/*<option>强制保养</option>*/}
                            {/*<option>普通保养</option>*/}
                            {/*<option>商品车维修</option>*/}
                            {/*<option>事故维修</option>*/}
                            {/*<option>服务活动</option>*/}
                            {/*<option>商品车保养</option>*/}
                            {/*<option>让度服务</option>*/}
                            {repairTypeItems}
                        </select>
                    </div>
                    <div className="queryItem">
                        <label className="lab">品牌：</label>
                        <select name="brandName" onChange={this.handleSelected}>
                            {/*<option></option>*/}
                            {/*<option >欧马可</option>*/}
                            {/*<option >奥铃</option>*/}
                            {/*<option >拓路者萨普</option>*/}
                            {/*<option >七里香</option>*/}
                            {brandItems}
                        </select>
                    </div>
                    <div className="queryItem">
                        <label className="lab">驳回状态：</label>
                        <select name="rejectStatus" onChange={this.handleSelected}>
                            {/*<option >未驳回</option>*/}
                            {/*<option >维修驳回</option>*/}
                            {/*<option >外出驳回</option>*/}
                            {/*<option >全部驳回</option>*/}
                            {backStatusItems}
                        </select>
                    </div>
                </div>
                <div className="queryPanel-second">
                    <div className="queryItem">
                        <label className="lab">VIN码：</label>
                        <input className="input" value={this.state.vin} name="vin" onChange={this.handleValueChange}/>
                    </div>
                    <div className="queryItem">
                        <label className="lab">状 态：</label>
                        <select name="status" onChange={this.handleSelected}>
                            {/*<option >新建</option>*/}
                            {/*<option >二级站新建</option>*/}
                            {/*<option >二级站提交</option>*/}
                            {/*<option >来客登记</option>*/}
                            {/*<option >维修待件</option>*/}
                            {/*<option >维修完工</option>*/}
                            {/*<option >生成索赔</option>*/}
                            {/*<option >已锁定</option>*/}
                            {/*<option >作废</option>*/}
                            {repairStatusItems}
                        </select>
                    </div>
                    <div className="queryItem">
                        <label className="lab">分公司：</label>
                        <select name="branchName" onChange={this.handleSelected}>
                            {branchItems}
                        </select>
                    </div>
                    <div className="queryItem">
                        <label className="lab">服务产品线：</label>
                        <select name="productLine" onChange={this.handleSelected}>
                            {/*<option >奥铃捷运TX</option>*/}
                            {/*<option >奥铃TX</option>*/}
                            {/*<option >奥铃CTX</option>*/}
                            {/*<option >萨普皮卡</option>*/}
                            {/*<option >拓路者皮卡</option>*/}
                            {/*<option >风景客车</option>*/}
                            {serviceProductLineViewItems}
                        </select>
                    </div>
                    <div className="queryItem">
                        <label className="lab">创建时间：</label>
                        <input type="date"
                               className="inputDate" value={this.state.createTime}
                               name="createTime"
                               data-field="beginCreateTime"
                               onChange={this.handleValueChange}/>
                        <label className="lab">至</label>
                        <input type="date"
                               data-field="endCreateTime"
                               className="inputDate"
                        />
                    </div>
                </div>
                <div >
                    <button className="button" type="button" onClick={this.handleQueryClick}>查 询</button>
                </div>
            </div>

        );
    }
}

export  default  QueryPanel;