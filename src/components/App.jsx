import React, {PureComponent}  from 'react';
import QueryPanel from './QueryPanel';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import Menu from '../components/Menu';
import DataList from  '../components/DataList';
import director from 'director';
import actions from '../actions/actions';
import UpdateRepairOrder from '../components/UpdateRepairOrder';
import InsertRepairOrder from '../components/InsertRepairOrder';
import {bindActionCreators} from 'redux';
import routeNames  from '../common/routeNames';


class App extends PureComponent {
    constructor(props) {
        super(props);

        this.query = this.query.bind(this);
    }


    componentDidMount() {
        const props = this.props;
        const router = new director.Router({
            [routeNames.DEFAULT_ROUTE]: this.props.setRoute.bind(this, routeNames.DEFAULT_ROUTE),
            [routeNames.REPAIR_ORDER_INSERT_ROUTE]: this.props.setRoute.bind(this, routeNames.REPAIR_ORDER_INSERT_ROUTE),
            [routeNames.REPAIR_ORDER_UPDATE_ROUTE]: id => props.setRoute(routeNames.REPAIR_ORDER_UPDATE_ROUTE, id),
        });
        router.init(routeNames.DEFAULT_ROUTE);
        //初始化字典项
        this.props.initKeyValueItems();
    }


    query(vehiclePlate, code, outOfFactoryCode, brandName, repairType, createTime, rejectStatus, vin, branchName, status, productLine) {
        this.props.query(vehiclePlate, code, outOfFactoryCode, brandName, repairType, createTime, rejectStatus, vin, branchName, status, productLine);
    }


    render() {
        let queryPanel = null;
        let main = null;
        let insert = null;
        let update = null;
        switch(this.props.routeName) {
            case routeNames.REPAIR_ORDER_INSERT_ROUTE:
                insert = (<InsertRepairOrder onSubmit={this.props.addRepairOrder}
                                             repairOrder={this.props.repairOrder}
                                             onValueChange={this.props.setRepairOrderEditItem}
                                             keyValueItems={this.props.queryPanelPage.keyValueItems}/>);
                break;
            case routeNames.REPAIR_ORDER_UPDATE_ROUTE:
                update = (<UpdateRepairOrder onSave={this.props.save} repairOrderDetail={this.props.repairOrderDetail} onValueChange={this.props.setRepairOrderEditItem}/>);
                break;
            default:
                queryPanel = (<QueryPanel onQuery={this.query} queryPanelPage={this.props.queryPanelPage}/>);
                let dataLists;
                if(this.props.filterRepairOrders)
                    dataLists = this.props.filterRepairOrders.map(repairOrder => (
                        <DataList key={repairOrder.id}
                                  repairOrder={repairOrder}
                                  onDestroy={this.props.destroy}/>
                    ), this);
                main = (
                    <section className="main">
                        <table className="dataTable">
                            <thead>
                            <tr className="dataHeader">
                                <td>维修单编号</td>
                                <td>车辆状态</td>
                                <td>维修类型</td>
                                <td>驳回状态</td>
                                <td>保修时间</td>
                                <td>行驶里程</td>
                                <td>VIN码</td>
                                <td>客户名称</td>
                                <td>分公司</td>
                                <td>产品线</td>
                                <td>品牌</td>
                                <td>二级站编号</td>
                                <td>二级站名称</td>
                                <td>费用合计</td>
                                <td>工时费</td>
                                <td>材料费</td>
                                <td>操作</td>
                            </tr>
                            </thead>
                            {dataLists}
                        </table>

                    </section>
                );
                break;
        }
        return (
            <div>
                <Menu nowShowing={this.props.visibility}/>
                {queryPanel}
                {main}
                {insert}
                {update}
            </div>
        );
    }
}


const mapStateToProps = createSelector(
    state => state.getIn(['domainData', 'repairOrders']),
    state => state.getIn(['route', 'routeName']),
    state => state.getIn(['uiState', 'queryPanelPage']),
    state => state.getIn(['domainData', 'repairOrder']),
    (repairOrders, routeName, queryPanelPage, repairOrder) => {
        let filterRepairOrders = null;
        switch(routeName) {
            default:
                //查询界面所有数据
                filterRepairOrders = repairOrders;
                break;
        }
        return {
            routeName,
            queryPanelPage,
            repairOrder,
            filterRepairOrders: filterRepairOrders.toJS()
        };
    }
);


//换成这种写法，等同于下面的写法
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);
// ({
//     setRoute: (route, ...params) => dispatch(actions.setRoute(route, ...params)),
//     addRepairOrder: (Id, VehicleStatus, RepairType, RepairCategory, WarrantyTime, DrivenDistance, RejectStatus) =>
//         dispatch(actions.addRepairOrder(Id, VehicleStatus, RepairType, RepairCategory, WarrantyTime, DrivenDistance, RejectStatus)),
//     save: (VehicleStatus, RepairType, RepairCategory, WarrantyTime, DrivenDistance, RejectStatus) =>
//         dispatch(actions.save(VehicleStatus, RepairType, RepairCategory, WarrantyTime, DrivenDistance, RejectStatus)),
// });


App.propTypes = {
    addRepairOrder: React.PropTypes.func.isRequired,
    routeName: React.PropTypes.string,
    save: React.PropTypes.func.isRequired,
    setRoute: React.PropTypes.func.isRequired,
    destroy: React.PropTypes.func.isRequired,
    query: React.PropTypes.func,
    repairOrderQuerySuccess: React.PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(App);