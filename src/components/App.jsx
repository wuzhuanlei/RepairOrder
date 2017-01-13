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
import 'antd/dist/antd.css';
import {Table, Popconfirm} from 'antd';


class App extends PureComponent {
    constructor(props) {
        super(props);
        //noinspection JSAnnotator
        this.state = {
            columns: [
                {
                    title: '维修单编号',
                    dataIndex: 'code',
                    key: 'code',
                }, {
                    title: '车辆状态',
                    dataIndex: 'vehicleStatus',
                    key: 'vehicleStatus',
                }, {
                    title: '维修类型    ',
                    dataIndex: 'repairType',
                    key: 'repairType',
                }, {
                    title: '驳回状态    ',
                    dataIndex: 'rejectStatus',
                    key: 'rejectStatus',
                }, {
                    title: '保修时间    ',
                    dataIndex: 'warrantyTime',
                    key: 'warrantyTime',
                }, {
                    title: '行驶里程    ',
                    dataIndex: 'drivenDistance',
                    key: 'drivenDistance',
                }, {
                    title: 'VIN码    ',
                    dataIndex: 'vin',
                    key: 'vin',
                }, {
                    title: '客户名称    ',
                    dataIndex: 'customerName',
                    key: 'customerName',
                }, {
                    title: '分公司 ',
                    dataIndex: 'branchName',
                    key: 'branchName',
                }, {
                    title: '产品线 ',
                    dataIndex: 'productLineName',
                    key: 'productLineName',
                }, {
                    title: '品牌  ',
                    dataIndex: 'brandName',
                    key: 'brandName',
                }, {
                    title: '备注  ',
                    dataIndex: 'remark',
                    key: 'remark',
                }, {
                    title: '操作  ',
                    dataIndex: 'operation',
                    width: 100,
                    fixed: 'right',
                    render: (text, record) => {
                        return (<div>
                            <a href={`#Update/${record.id}`}>
                                编辑
                            </a>
                            {' | '}
                            <Popconfirm title="确定要删除该结算单信息吗" onConfirm={this.onDestroy}>
                                <a href="#">删除</a>
                            </Popconfirm>
                        </div>)
                    },
                },
            ],
            rowSelection: {
                onChange: (selectedRowKeys, selectedRows) => {
                    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                    if(selectedRows.length > 0)
                        this.props.repairOrder.id = selectedRows[0].id;
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
        this.query = this.query.bind(this);
        this.onDestroy = this.onDestroy.bind(this);
    }

    'use static'
    onDelete(repairOrder) {
        console.log(repairOrder.id);
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

    onDestroy() {
        console.log(this.props.repairOrder.id);
        this.props.destroy(this.props.repairOrder);
    }


    render() {
        const columns = this.state.columns;
        let queryPanel = null;
        let main = null;
        let insert = null;
        let update = null;
        switch(this.props.routeName) {
            case routeNames.REPAIR_ORDER_INSERT_ROUTE:
                insert = (<InsertRepairOrder onSubmit={this.props.addRepairOrder}
                                             repairOrder={this.props.repairOrder}
                                             onValueChange={this.props.setRepairOrderEditItem}
                                             keyValueItems={this.props.queryPanelPage.keyValueItems}
                                             onVehicleQuery={this.props.queryVehicleByParameters}/>);
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
                        <Table dataSource={this.props.repairOrders} columns={columns} rowSelection={this.state.rowSelection} size="small" scroll={{x: 1300}}/>
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
        return {
            routeName,
            queryPanelPage,
            repairOrder,
            repairOrders: repairOrders.toJS(),
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
    repairOrderQuerySuccess: React.PropTypes.func,
    onEdit: React.PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);