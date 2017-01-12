import React,  {PureComponent} from 'react';
import {createSelector} from 'reselect';
import {connect} from 'react-redux';
import routeNames  from '../common/routeNames';
import {bindActionCreators} from 'redux';
import actions from '../actions/actions';

class UpdateRepairOrder extends PureComponent {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }


    handleChange(e) {
        this.props.onValueChange(e.target.dataset.field, e.target.value.trim());
    }


    handleSubimtClick() {
        this.props.onSave(this.props.repairOrderDetail);
    }


    componentDidMount() {
        //  this.props.getRepairOrderDetail(this.props.id);
    }

    render() {
        const data = this.props.data;
        if(data === undefined)
            return (<div>没有可修改的数据</div>);
        return (
            <div className="insertForm">
                <p>维修基本信息修改</p>
                <div className="line"/>
                <table id="demo-table">
                    <tbody>
                    <tr>
                        <td>车辆状态</td>
                        <td><input value={data.get('vehicleStatus')} className="input" data-field="vehicleStatus" onChange={this.handleChange}/></td>
                        <td>维修类型</td>
                        <td>
                            <select onChange={this.handleChange}
                                    value={data.get('repairType')}
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
                            <select onChange={this.handleChange}
                                    value={data.get('rejectStatus')}
                                    data-field="rejectStatus">
                                <option >未驳回</option>
                                <option >维修驳回</option>
                                <option >外出驳回</option>
                                <option >全部驳回</option>
                            </select>
                        </td>
                        <td>保修时间</td>
                        <td><input type="date" value={data.get('warrantyTime')} data-field="warrantyTime" className="input" onChange={this.handleChange}/></td>
                    </tr>
                    <tr>
                        <td>行驶里程</td>
                        <td><input value={data.get('drivenDistance')} className="input" data-field="drivenDistance" onChange={this.handleChange}/></td>
                        <td>工作小时</td>
                        <td><input className="input" value={data.get('workingHours')} data-field="workingHours" onChange={this.handleChange}/></td>
                        <td>方量</td>
                        <td><input className="input" value={data.get('capacity')} data-field="capacity" onChange={this.handleChange}/>
                        </td>
                        <td>完工时间</td>
                        <td><input type="date" className="input" value={data.get('finishingTime')} data-field="finishingTime" onChange={this.handleChange}/></td>
                    </tr>
                    </tbody>
                </table>
                <div className="addButton">
                    <button onClick={this.handleSubimtClick}>保存</button>
                </div>
            </div>
        )
            ;
    }
}


const mapDispatchToProps = dispatch => ({
    // getRepairOrderDetail: id => dispatch(actions.getRepairOrderDetail(id))
});


const mapStateToProps = createSelector(
    state => state.getIn(['domainData', 'repairOrders']),
    state => state.getIn(['route', 'routeName']),
    state => state.getIn(['route', 'routeParameters']),
    state => state.getIn(['domainData', 'repairOrderDetail']),
    (repairOrders, routeName, routeParameters, repairOrderDetail) => {
        let data = null;
        let id = routeParameters.toJS().toString();
        switch(routeName) {
            case routeNames.REPAIR_ORDER_UPDATE_ROUTE:
                data = repairOrders.filter(repairOrder => repairOrder.get('id') === id).first();
                break;
            default:
                //查询界面所有数据
                data = null;
                break;
        }
        return {
            routeName,
            repairOrderDetail,
            data
        };
    }
);

UpdateRepairOrder.propTypes = {
    onSave: React.PropTypes.func.isRequired,
    id: React.PropTypes.string,
    data: React.PropTypes.object,
    getRepairOrderDetail: React.PropTypes.func
};

export  default  connect(mapStateToProps, mapDispatchToProps)(UpdateRepairOrder);