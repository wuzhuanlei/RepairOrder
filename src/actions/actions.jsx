const SET_ROUTE = 'SET_ROUTE';
const ADD_REPAIR_ORDER = 'ADD_REPAIR_ORDER';
const DESTROY = 'DESTROY';
const QUERY = 'QUERY';
const SAVE = 'SAVE';
const SET_REPAIRORDER_EDITITEM = 'SET_REPAIRORDER_EDITITEM';
const GET_REPAIR_ORDER_DETAIL = 'GET_REPAIR_ORDER_DETAIL';
const GET_REPAIR_ORDER_DETAIL_BEGIN = 'GET_REPAIR_ORDER_DETAIL_BEGIN';
const GET_REPAIR_ORDER_DETAIL_SUCCESS = 'GET_REPAIR_ORDER_DETAIL_SUCCESS';
const INIT_KEYVALUEITEMS_SUCCEED = 'INIT_KEYVALUEITEMS_SUCCEED';
const INIT_COLUMNS_SUCCEED = 'INIT_COLUMNS_SUCCEED';
const ADD_FAULT = 'ADD_FAULT';
const QUERY_VEHICLE_BY_PARAMETERS = 'QUERY_VEHICLE_BY_PARAMETERS';

const setRoute = (route, ...parameters) => ({
    type: SET_ROUTE,
    route,
    parameters
});


const addRepairOrder = (newRepairOrder) => ({
    type: ADD_REPAIR_ORDER,
    repairOrder: newRepairOrder
});


const save = (editRepairOrder) => ({
    type: SAVE,
    repairOrder: editRepairOrder
});

const query = (vehiclePlate, code, outOfFactoryCode, brandName, repairType, createTime, rejectStatus, vin, branchName, status, productLine) => ({
    type: QUERY,
    payload: {
        vehiclePlate,
        code,
        outOfFactoryCode,
        brandName,
        repairType,
        createTime,
        rejectStatus,
        vin,
        branchName,
        status,
        productLine
    }
});

const destroy = repairOrder => ({
    type: DESTROY,
    payload: repairOrder
});

const setRepairOrderEditItem = (fieldName, fieldValue) => ({
    type: SET_REPAIRORDER_EDITITEM,
    fieldName,
    fieldValue
});

const getRepairOrderDetail = (id) => ({
    dispatch: getRepairOrderDetailBegin(),
    type: GET_REPAIR_ORDER_DETAIL,
    dispatch: fetch(`/Update/${id}`).then(resp => resp.json()).then(data => dispatch(getRepairOrderDetailSuccess(data)))
});


const getRepairOrderDetailBegin = () => ({
    type: GET_REPAIR_ORDER_DETAIL_BEGIN
});

const getRepairOrderDetailSuccess = data => ({
    type: GET_REPAIR_ORDER_DETAIL_SUCCESS,
    data
});


export const REPAIR_ORDER_QUERY_SUCCESS = 'REPAIR_ORDER_QUERY_SUCCESS';
const localJsonData = JSON.parse(localStorage.getItem('./repairOrderForDealer.json'));
const repairOrderQuerySuccess = () => ({
    type: REPAIR_ORDER_QUERY_SUCCESS,
    data: localJsonData
});


function initKeyValueItems() {
    return function getKeyValueItems(dispatch) {
        fetch('./keyValueItems.json')
            .then(response => response.json())
            .then(json => {
                dispatch(initKeyValueItemsSucceed(json));
            });
    };
}


const initKeyValueItemsSucceed = (keyValueItems) => ({
    type: INIT_KEYVALUEITEMS_SUCCEED,
    keyValueItems
});


const initColumnsSucceed = (columns) => ({
    type: INIT_COLUMNS_SUCCEED,
    columns
});

const addFault = () => ({
    type: ADD_FAULT
});


const queryVehicleByParameters = (repairOrder) => ({
    type: QUERY_VEHICLE_BY_PARAMETERS,
    queryParameters: repairOrder
});


export default {
    SET_ROUTE,
    ADD_REPAIR_ORDER,
    DESTROY,
    QUERY,
    SAVE,
    SET_REPAIRORDER_EDITITEM,
    GET_REPAIR_ORDER_DETAIL,
    GET_REPAIR_ORDER_DETAIL_BEGIN,
    GET_REPAIR_ORDER_DETAIL_SUCCESS,
    INIT_KEYVALUEITEMS_SUCCEED,
    INIT_COLUMNS_SUCCEED,
    ADD_FAULT,
    QUERY_VEHICLE_BY_PARAMETERS,
    setRoute,
    addRepairOrder,
    save,
    destroy,
    query,
    initKeyValueItems,
    initColumnsSucceed,
    setRepairOrderEditItem,
    getRepairOrderDetail,
    repairOrderQuerySuccess,
    addFault,
    queryVehicleByParameters
}
