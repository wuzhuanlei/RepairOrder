import Immutable from 'immutable';
import {combineReducers} from 'redux-immutable';
import actions from '../actions/actions';
const createEmptyState = state => state === undefined || state === null ? Immutable.Map() : state;


function repairOrders(state, action) {
    if(state === undefined || state === null)
        state = Immutable.List.of();
    switch(action.type) {
        case actions.ADD_REPAIR_ORDER:
            return state.push(Immutable.Map({
                id: action.repairOrder.id,
                vehicleStatus: action.repairOrder.get('vehicleStatus'),
                repairType: action.repairOrder.get('repairType'),
                repairCategory: action.repairOrder.get('repairCategory'),
                warrantyTime: action.repairOrder.get('warrantyTime'),
                drivenDistance: action.repairOrder.get('drivenDistance'),
                rejectStatus: action.repairOrder.get('rejectStatus'),
                finishingTime: action.repairOrder.get('finishingTime'),
                vehicleUse: action.repairOrder.get('vehicleUse'),
                vin: action.repairOrder.get('vin'),
                remark: action.repairOrder.get('remark'),
                workingHours: action.repairOrder.get('workingHours'),
                brandName: action.repairOrder.get('brandName'),
                productSeries: action.repairOrder.get('productSeries'),
                vehicleLicensePlate: action.repairOrder.get('vehicleLicensePlate'),
                engineModel: action.repairOrder.get('engineModel'),
                videoMobileNumber: action.repairOrder.get('videoMobileNumber')
            }));
            break;
        case actions.DESTROY:
            return state.filter(repairOrder => repairOrder.get('id') !== action.payload.id);
        // case actions.UPDATE_REPAIRORDER:
        //     return state.first(repairOrder => repairOrder.get('id') === action.parameters);
        case actions.QUERY:
            // const vehiclePlate = action.payload.vehiclePlate.trim();
            // if(vehiclePlate)
            //     return state.filter(repairOrder => repairOrder.get('vehiclePlate') === vehiclePlate);
            // const code = action.payload.code.trim();
            // if(code)
            //     return state.filter(repairOrder => repairOrder.get('code') === code);
            // const outOfFactoryCode = action.payload.outOfFactoryCode.trim();
            // if(outOfFactoryCode)
            //     return state.filter(repairOrder => repairOrder.get('outOfFactoryCode') === outOfFactoryCode);
            // const brandName = action.payload.brandName.trim();
            // if(brandName)
            //     return state.filter(repairOrder => repairOrder.get('brandName') === brandName);
            // const repairType = action.payload.repairType;
            // if(repairType)
            //     return Object.assign({}, state.filter(repairOrder => repairOrder.get('repairType') === repairType));
            // return state.filter(repairOrder => repairOrder.get('repairType') === repairType);
            // const createTime = action.payload.createTime;
            // if(createTime)
            //     return state.filter(repairOrder => repairOrder.get('createTime').indexOf(createTime));
            // const rejectStatus = action.payload.rejectStatus;
            // if(rejectStatus)
            //     return state.filter(repairOrder => repairOrder.get('rejectStatus') === rejectStatus);
            // const vin = action.payload.vin;
            // if(vin)
            //     return state.filter(repairOrder => repairOrder.get('vin') === vin);
            // const branchName = action.payload.branchName;
            // if(branchName)
            //     return state.filter(repairOrder => repairOrder.get('branchName') === branchName);
            // const status = action.payload.status;
            // if(status)
            //     return state.filter(repairOrder => repairOrder.get('branchName') === status);
            // const productLine = this.state.productLine;
            // if(productLine)
            //     return state.filter(repairOrder => repairOrder.get('productLine') === productLine);
            //  state = Immutable.List.of();
            return state;
        default:
            return state;
    }
}

function repairOrder(state, action) {
    if(state === undefined || state === null)
        state = Immutable.Map();
    switch(action.type) {
        case actions.SET_REPAIRORDER_EDITITEM:
            return state.set(action.fieldName, action.fieldValue);
        default:
            return state;
    }
}


function route(state, action) {
    if(state === undefined || state === null)
        state = Immutable.Map();
    switch(action.type) {
        case actions.SET_ROUTE:
            if(action.route) {
                state = state.set('routeName', action.route);
                state = state.set('routeParameters', Immutable.fromJS(action.parameters));
            } else {
                state = state.delete('routeName');
                state = state.delete('routeParameters');
            }
            return state;
    }
    return state;
}

function repairOrderDetail(state, action) {
    if(state === undefined || state === null)
        state = createEmptyState(state);
    switch(action.type) {
        case actions.GET_REPAIR_ORDER_DETAIL:
            return state.set('data', Immutable.fromJS(action.data));
        case actions.SET_REPAIRORDER_EDITITEM:
            return state.set(action.fieldName, action.fieldValue);
        case actions.SAVE:
            var currentRepairOrder = state.map(r => r.get('id') === action.repairOrder.id);
            if(currentRepairOrder) {
                const editRepairOrder = action.repairOrder;
                state = state.set('vehicleStatus', editRepairOrder.vehicleStatus);
                state = state.set('repairType', editRepairOrder.repairType);
                state = state.set('warrantyTime', editRepairOrder.warrantyTime);
                state = state.set('drivenDistance', editRepairOrder.drivenDistance);
                state = state.set('rejectStatus', editRepairOrder.rejectStatus);
            }
            return state;
    }
    return state;
}

const domainData = combineReducers({
    repairOrders,
    repairOrder,
    repairOrderDetail,

});


function queryPanelPage(state, action) {
    state = createEmptyState(state);
    switch(action.type) {
        case actions.INIT_KEYVALUEITEMS_SUCCEED :
            const keyValueItems = Immutable.fromJS(action.keyValueItems);
            return state.set('keyValueItems', keyValueItems);
        case actions.INIT_COLUMNS_SUCCEED :
            const coulmns = null;
            return state.set('columns', coulmns);

    }
    return state;
}


const updatePanelPage = (state, action) => {
    state = createEmptyState(state);
    switch(action.type) {
        default:
            return state;
    }
};

const uiState = combineReducers({
    queryPanelPage,
    updatePanelPage
});


export  default (combineReducers({
    route,
    domainData,
    uiState
}));
