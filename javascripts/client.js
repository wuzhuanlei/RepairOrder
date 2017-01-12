webpackJsonp([0],{

/***/ 0:
/*!***********************!*\
  !*** ./src/client.js ***!
  \***********************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(/*! react-dom */ 32);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 178);
	
	var _redux = __webpack_require__(/*! redux */ 189);
	
	var _reduxThunk = __webpack_require__(/*! redux-thunk */ 216);
	
	var _reduxThunk2 = _interopRequireDefault(_reduxThunk);
	
	var _utils = __webpack_require__(/*! ./common/utils */ 217);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	var _reducer = __webpack_require__(/*! ./reducers/reducer */ 219);
	
	var _reducer2 = _interopRequireDefault(_reducer);
	
	var _App = __webpack_require__(/*! ./components/App */ 227);
	
	var _App2 = _interopRequireDefault(_App);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var STORE_NAMESPACE = 'redux-repairOrders';
	
	var middleWares = (0, _redux.compose)((0, _redux.applyMiddleware)(_reduxThunk2.default), window.devToolsExtension ? window.devToolsExtension() : function (f) {
	    return f;
	});
	
	var store = (0, _redux.createStore)(_reducer2.default, _utils2.default.store(STORE_NAMESPACE), middleWares);
	
	store.subscribe(function () {
	    var state = store.getState();
	    _utils2.default.store(STORE_NAMESPACE, state);
	});
	
	_reactDom2.default.render(_react2.default.createElement(
	    _reactRedux.Provider,
	    { store: store },
	    _react2.default.createElement(_App2.default, null)
	), document.getElementById('root'));

/***/ },

/***/ 217:
/*!*****************************!*\
  !*** ./src/common/utils.js ***!
  \*****************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.uuid = uuid;
	exports.store = store;
	
	var _immutable = __webpack_require__(/*! immutable */ 218);
	
	var _immutable2 = _interopRequireDefault(_immutable);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function uuid() {
	    var i = void 0,
	        random = void 0;
	    var uuid = '';
	    for (i = 0; i < 32; i++) {
	        random = Math.random() * 16 | 0;
	        if (i === 8 || i === 12 || i === 16 || i === 20) uuid += '-';
	        uuid += (i === 12 ? 4 : i === 16 ? random & 3 | 8 : random).toString(16);
	    }
	    return uuid;
	}
	
	function store(namespace, state) {
	    if (state) return localStorage.setItem(namespace, JSON.stringify(state.toJS()));
	
	    var store = localStorage.getItem(namespace);
	    return store ? _immutable2.default.fromJS(JSON.parse(store)) : _immutable2.default.fromJS({
	        route: {
	            routeName: '',
	            routeParameters: ''
	        }
	
	    });
	}
	
	exports.default = {
	    uuid: uuid,
	    store: store
	};

/***/ },

/***/ 219:
/*!**********************************!*\
  !*** ./src/reducers/reducer.jsx ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _immutable = __webpack_require__(/*! immutable */ 218);
	
	var _immutable2 = _interopRequireDefault(_immutable);
	
	var _reduxImmutable = __webpack_require__(/*! redux-immutable */ 220);
	
	var _actions = __webpack_require__(/*! ../actions/actions */ 226);
	
	var _actions2 = _interopRequireDefault(_actions);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var createEmptyState = function createEmptyState(state) {
	    return state === undefined || state === null ? _immutable2.default.Map() : state;
	};
	
	function repairOrders(state, action) {
	    if (state === undefined || state === null) state = _immutable2.default.List.of();
	    switch (action.type) {
	        case _actions2.default.ADD_REPAIR_ORDER:
	            return state.push(_immutable2.default.Map({
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
	        case _actions2.default.DESTROY:
	            return state.filter(function (repairOrder) {
	                return repairOrder.get('id') !== action.payload.id;
	            });
	        // case actions.UPDATE_REPAIRORDER:
	        //     return state.first(repairOrder => repairOrder.get('id') === action.parameters);
	        case _actions2.default.QUERY:
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
	    if (state === undefined || state === null) state = _immutable2.default.Map();
	    switch (action.type) {
	        case _actions2.default.SET_REPAIRORDER_EDITITEM:
	            return state.set(action.fieldName, action.fieldValue);
	        default:
	            return state;
	    }
	}
	
	function route(state, action) {
	    if (state === undefined || state === null) state = _immutable2.default.Map();
	    switch (action.type) {
	        case _actions2.default.SET_ROUTE:
	            if (action.route) {
	                state = state.set('routeName', action.route);
	                state = state.set('routeParameters', _immutable2.default.fromJS(action.parameters));
	            } else {
	                state = state.delete('routeName');
	                state = state.delete('routeParameters');
	            }
	            return state;
	    }
	    return state;
	}
	
	function repairOrderDetail(state, action) {
	    if (state === undefined || state === null) state = createEmptyState(state);
	    switch (action.type) {
	        case _actions2.default.GET_REPAIR_ORDER_DETAIL:
	            return state.set('data', _immutable2.default.fromJS(action.data));
	        case _actions2.default.SET_REPAIRORDER_EDITITEM:
	            return state.set(action.fieldName, action.fieldValue);
	        case _actions2.default.SAVE:
	            var currentRepairOrder = state.map(function (r) {
	                return r.get('id') === action.repairOrder.id;
	            });
	            if (currentRepairOrder) {
	                var editRepairOrder = action.repairOrder;
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
	
	var domainData = (0, _reduxImmutable.combineReducers)({
	    repairOrders: repairOrders,
	    repairOrder: repairOrder,
	    repairOrderDetail: repairOrderDetail
	
	});
	
	function queryPanelPage(state, action) {
	    state = createEmptyState(state);
	    switch (action.type) {
	        case _actions2.default.INIT_KEYVALUEITEMS_SUCCEED:
	            var keyValueItems = _immutable2.default.fromJS(action.keyValueItems);
	            return state.set('keyValueItems', keyValueItems);
	        case _actions2.default.INIT_COLUMNS_SUCCEED:
	            var coulmns = null;
	            return state.set('columns', coulmns);
	
	    }
	    return state;
	}
	
	var updatePanelPage = function updatePanelPage(state, action) {
	    state = createEmptyState(state);
	    switch (action.type) {
	        default:
	            return state;
	    }
	};
	
	var uiState = (0, _reduxImmutable.combineReducers)({
	    queryPanelPage: queryPanelPage,
	    updatePanelPage: updatePanelPage
	});
	
	exports.default = (0, _reduxImmutable.combineReducers)({
	    route: route,
	    domainData: domainData,
	    uiState: uiState
	});

/***/ },

/***/ 226:
/*!*********************************!*\
  !*** ./src/actions/actions.jsx ***!
  \*********************************/
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	var SET_ROUTE = 'SET_ROUTE';
	var ADD_REPAIR_ORDER = 'ADD_REPAIR_ORDER';
	var DESTROY = 'DESTROY';
	var QUERY = 'QUERY';
	var SAVE = 'SAVE';
	var SET_REPAIRORDER_EDITITEM = 'SET_REPAIRORDER_EDITITEM';
	var GET_REPAIR_ORDER_DETAIL = 'GET_REPAIR_ORDER_DETAIL';
	var GET_REPAIR_ORDER_DETAIL_BEGIN = 'GET_REPAIR_ORDER_DETAIL_BEGIN';
	var GET_REPAIR_ORDER_DETAIL_SUCCESS = 'GET_REPAIR_ORDER_DETAIL_SUCCESS';
	var INIT_KEYVALUEITEMS_SUCCEED = 'INIT_KEYVALUEITEMS_SUCCEED';
	var INIT_COLUMNS_SUCCEED = 'INIT_COLUMNS_SUCCEED';
	var ADD_FAULT = 'ADD_FAULT';
	
	var setRoute = function setRoute(route) {
	    for (var _len = arguments.length, parameters = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        parameters[_key - 1] = arguments[_key];
	    }
	
	    return {
	        type: SET_ROUTE,
	        route: route,
	        parameters: parameters
	    };
	};
	
	var addRepairOrder = function addRepairOrder(newRepairOrder) {
	    return {
	        type: ADD_REPAIR_ORDER,
	        repairOrder: newRepairOrder
	    };
	};
	
	var save = function save(editRepairOrder) {
	    return {
	        type: SAVE,
	        repairOrder: editRepairOrder
	    };
	};
	
	var query = function query(vehiclePlate, code, outOfFactoryCode, brandName, repairType, createTime, rejectStatus, vin, branchName, status, productLine) {
	    return {
	        type: QUERY,
	        payload: {
	            vehiclePlate: vehiclePlate,
	            code: code,
	            outOfFactoryCode: outOfFactoryCode,
	            brandName: brandName,
	            repairType: repairType,
	            createTime: createTime,
	            rejectStatus: rejectStatus,
	            vin: vin,
	            branchName: branchName,
	            status: status,
	            productLine: productLine
	        }
	    };
	};
	
	var destroy = function destroy(repairOrder) {
	    return {
	        type: DESTROY,
	        payload: repairOrder
	    };
	};
	
	var setRepairOrderEditItem = function setRepairOrderEditItem(fieldName, fieldValue) {
	    return {
	        type: SET_REPAIRORDER_EDITITEM,
	        fieldName: fieldName,
	        fieldValue: fieldValue
	    };
	};
	
	var getRepairOrderDetail = function getRepairOrderDetail(id) {
	    return _defineProperty({
	        dispatch: getRepairOrderDetailBegin(),
	        type: GET_REPAIR_ORDER_DETAIL
	    }, 'dispatch', fetch('/Update/' + id).then(function (resp) {
	        return resp.json();
	    }).then(function (data) {
	        return dispatch(getRepairOrderDetailSuccess(data));
	    }));
	};
	
	var getRepairOrderDetailBegin = function getRepairOrderDetailBegin() {
	    return {
	        type: GET_REPAIR_ORDER_DETAIL_BEGIN
	    };
	};
	
	var getRepairOrderDetailSuccess = function getRepairOrderDetailSuccess(data) {
	    return {
	        type: GET_REPAIR_ORDER_DETAIL_SUCCESS,
	        data: data
	    };
	};
	
	var REPAIR_ORDER_QUERY_SUCCESS = exports.REPAIR_ORDER_QUERY_SUCCESS = 'REPAIR_ORDER_QUERY_SUCCESS';
	var localJsonData = JSON.parse(localStorage.getItem('./repairOrderForDealer.json'));
	var repairOrderQuerySuccess = function repairOrderQuerySuccess() {
	    return {
	        type: REPAIR_ORDER_QUERY_SUCCESS,
	        data: localJsonData
	    };
	};
	
	function initKeyValueItems() {
	    return function getKeyValueItems(dispatch) {
	        fetch('./keyValueItems.json').then(function (response) {
	            return response.json();
	        }).then(function (json) {
	            dispatch(initKeyValueItemsSucceed(json));
	        });
	    };
	};
	
	var initKeyValueItemsSucceed = function initKeyValueItemsSucceed(keyValueItems) {
	    return {
	        type: INIT_KEYVALUEITEMS_SUCCEED,
	        keyValueItems: keyValueItems
	    };
	};
	
	var initColumnsSucceed = function initColumnsSucceed(columns) {
	    return {
	        type: INIT_COLUMNS_SUCCEED,
	        columns: columns
	    };
	};
	
	var addFault = function addFault() {
	    return {
	        type: ADD_FAULT
	    };
	};
	
	exports.default = {
	    SET_ROUTE: SET_ROUTE,
	    ADD_REPAIR_ORDER: ADD_REPAIR_ORDER,
	    DESTROY: DESTROY,
	    QUERY: QUERY,
	    SAVE: SAVE,
	    SET_REPAIRORDER_EDITITEM: SET_REPAIRORDER_EDITITEM,
	    GET_REPAIR_ORDER_DETAIL: GET_REPAIR_ORDER_DETAIL,
	    GET_REPAIR_ORDER_DETAIL_BEGIN: GET_REPAIR_ORDER_DETAIL_BEGIN,
	    GET_REPAIR_ORDER_DETAIL_SUCCESS: GET_REPAIR_ORDER_DETAIL_SUCCESS,
	    INIT_KEYVALUEITEMS_SUCCEED: INIT_KEYVALUEITEMS_SUCCEED,
	    INIT_COLUMNS_SUCCEED: INIT_COLUMNS_SUCCEED,
	    ADD_FAULT: ADD_FAULT,
	    setRoute: setRoute,
	    addRepairOrder: addRepairOrder,
	    save: save,
	    destroy: destroy,
	    query: query,
	    initKeyValueItems: initKeyValueItems,
	    initColumnsSucceed: initColumnsSucceed,
	    setRepairOrderEditItem: setRepairOrderEditItem,
	    getRepairOrderDetail: getRepairOrderDetail,
	    repairOrderQuerySuccess: repairOrderQuerySuccess,
	    addFault: addFault
	};

/***/ },

/***/ 227:
/*!********************************!*\
  !*** ./src/components/App.jsx ***!
  \********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _QueryPanel = __webpack_require__(/*! ./QueryPanel */ 228);
	
	var _QueryPanel2 = _interopRequireDefault(_QueryPanel);
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 178);
	
	var _reselect = __webpack_require__(/*! reselect */ 230);
	
	var _Menu = __webpack_require__(/*! ../components/Menu */ 231);
	
	var _Menu2 = _interopRequireDefault(_Menu);
	
	var _DataList = __webpack_require__(/*! ../components/DataList */ 233);
	
	var _DataList2 = _interopRequireDefault(_DataList);
	
	var _director = __webpack_require__(/*! director */ 234);
	
	var _director2 = _interopRequireDefault(_director);
	
	var _actions = __webpack_require__(/*! ../actions/actions */ 226);
	
	var _actions2 = _interopRequireDefault(_actions);
	
	var _UpdateRepairOrder = __webpack_require__(/*! ../components/UpdateRepairOrder */ 235);
	
	var _UpdateRepairOrder2 = _interopRequireDefault(_UpdateRepairOrder);
	
	var _InsertRepairOrder = __webpack_require__(/*! ../components/InsertRepairOrder */ 237);
	
	var _InsertRepairOrder2 = _interopRequireDefault(_InsertRepairOrder);
	
	var _redux = __webpack_require__(/*! redux */ 189);
	
	var _routeNames = __webpack_require__(/*! ../common/routeNames */ 236);
	
	var _routeNames2 = _interopRequireDefault(_routeNames);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var App = function (_PureComponent) {
	    _inherits(App, _PureComponent);
	
	    function App(props) {
	        _classCallCheck(this, App);
	
	        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));
	
	        _this.query = _this.query.bind(_this);
	        return _this;
	    }
	
	    _createClass(App, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var _ref;
	
	            var props = this.props;
	            var router = new _director2.default.Router((_ref = {}, _defineProperty(_ref, _routeNames2.default.DEFAULT_ROUTE, this.props.setRoute.bind(this, _routeNames2.default.DEFAULT_ROUTE)), _defineProperty(_ref, _routeNames2.default.REPAIR_ORDER_INSERT_ROUTE, this.props.setRoute.bind(this, _routeNames2.default.REPAIR_ORDER_INSERT_ROUTE)), _defineProperty(_ref, _routeNames2.default.REPAIR_ORDER_UPDATE_ROUTE, function (id) {
	                return props.setRoute(_routeNames2.default.REPAIR_ORDER_UPDATE_ROUTE, id);
	            }), _ref));
	            router.init(_routeNames2.default.DEFAULT_ROUTE);
	            //初始化字典项
	            this.props.initKeyValueItems();
	        }
	    }, {
	        key: 'query',
	        value: function query(vehiclePlate, code, outOfFactoryCode, brandName, repairType, createTime, rejectStatus, vin, branchName, status, productLine) {
	            this.props.query(vehiclePlate, code, outOfFactoryCode, brandName, repairType, createTime, rejectStatus, vin, branchName, status, productLine);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;
	
	            var queryPanel = null;
	            var main = null;
	            var insert = null;
	            var update = null;
	            switch (this.props.routeName) {
	                case _routeNames2.default.REPAIR_ORDER_INSERT_ROUTE:
	                    insert = _react2.default.createElement(_InsertRepairOrder2.default, { onSubmit: this.props.addRepairOrder,
	                        repairOrder: this.props.repairOrder,
	                        onValueChange: this.props.setRepairOrderEditItem,
	                        keyValueItems: this.props.queryPanelPage.keyValueItems });
	                    break;
	                case _routeNames2.default.REPAIR_ORDER_UPDATE_ROUTE:
	                    update = _react2.default.createElement(_UpdateRepairOrder2.default, { onSave: this.props.save, repairOrderDetail: this.props.repairOrderDetail, onValueChange: this.props.setRepairOrderEditItem });
	                    break;
	                default:
	                    queryPanel = _react2.default.createElement(_QueryPanel2.default, { onQuery: this.query, queryPanelPage: this.props.queryPanelPage });
	                    var dataLists = void 0;
	                    if (this.props.filterRepairOrders) dataLists = this.props.filterRepairOrders.map(function (repairOrder) {
	                        return _react2.default.createElement(_DataList2.default, { key: repairOrder.id,
	                            repairOrder: repairOrder,
	                            onDestroy: _this2.props.destroy });
	                    }, this);
	                    main = _react2.default.createElement(
	                        'section',
	                        { className: 'main' },
	                        _react2.default.createElement(
	                            'table',
	                            { className: 'dataTable' },
	                            _react2.default.createElement(
	                                'thead',
	                                null,
	                                _react2.default.createElement(
	                                    'tr',
	                                    { className: 'dataHeader' },
	                                    _react2.default.createElement(
	                                        'td',
	                                        null,
	                                        '\u7EF4\u4FEE\u5355\u7F16\u53F7'
	                                    ),
	                                    _react2.default.createElement(
	                                        'td',
	                                        null,
	                                        '\u8F66\u8F86\u72B6\u6001'
	                                    ),
	                                    _react2.default.createElement(
	                                        'td',
	                                        null,
	                                        '\u7EF4\u4FEE\u7C7B\u578B'
	                                    ),
	                                    _react2.default.createElement(
	                                        'td',
	                                        null,
	                                        '\u9A73\u56DE\u72B6\u6001'
	                                    ),
	                                    _react2.default.createElement(
	                                        'td',
	                                        null,
	                                        '\u4FDD\u4FEE\u65F6\u95F4'
	                                    ),
	                                    _react2.default.createElement(
	                                        'td',
	                                        null,
	                                        '\u884C\u9A76\u91CC\u7A0B'
	                                    ),
	                                    _react2.default.createElement(
	                                        'td',
	                                        null,
	                                        'VIN\u7801'
	                                    ),
	                                    _react2.default.createElement(
	                                        'td',
	                                        null,
	                                        '\u5BA2\u6237\u540D\u79F0'
	                                    ),
	                                    _react2.default.createElement(
	                                        'td',
	                                        null,
	                                        '\u5206\u516C\u53F8'
	                                    ),
	                                    _react2.default.createElement(
	                                        'td',
	                                        null,
	                                        '\u4EA7\u54C1\u7EBF'
	                                    ),
	                                    _react2.default.createElement(
	                                        'td',
	                                        null,
	                                        '\u54C1\u724C'
	                                    ),
	                                    _react2.default.createElement(
	                                        'td',
	                                        null,
	                                        '\u4E8C\u7EA7\u7AD9\u7F16\u53F7'
	                                    ),
	                                    _react2.default.createElement(
	                                        'td',
	                                        null,
	                                        '\u4E8C\u7EA7\u7AD9\u540D\u79F0'
	                                    ),
	                                    _react2.default.createElement(
	                                        'td',
	                                        null,
	                                        '\u8D39\u7528\u5408\u8BA1'
	                                    ),
	                                    _react2.default.createElement(
	                                        'td',
	                                        null,
	                                        '\u5DE5\u65F6\u8D39'
	                                    ),
	                                    _react2.default.createElement(
	                                        'td',
	                                        null,
	                                        '\u6750\u6599\u8D39'
	                                    ),
	                                    _react2.default.createElement(
	                                        'td',
	                                        null,
	                                        '\u64CD\u4F5C'
	                                    )
	                                )
	                            ),
	                            dataLists
	                        )
	                    );
	                    break;
	            }
	            return _react2.default.createElement(
	                'div',
	                null,
	                _react2.default.createElement(_Menu2.default, { nowShowing: this.props.visibility }),
	                queryPanel,
	                main,
	                insert,
	                update
	            );
	        }
	    }]);
	
	    return App;
	}(_react.PureComponent);
	
	var mapStateToProps = (0, _reselect.createSelector)(function (state) {
	    return state.getIn(['domainData', 'repairOrders']);
	}, function (state) {
	    return state.getIn(['route', 'routeName']);
	}, function (state) {
	    return state.getIn(['uiState', 'queryPanelPage']);
	}, function (state) {
	    return state.getIn(['domainData', 'repairOrder']);
	}, function (repairOrders, routeName, queryPanelPage, repairOrder) {
	    var filterRepairOrders = null;
	    switch (routeName) {
	        default:
	            //查询界面所有数据
	            filterRepairOrders = repairOrders;
	            break;
	    }
	    return {
	        routeName: routeName,
	        queryPanelPage: queryPanelPage,
	        repairOrder: repairOrder,
	        filterRepairOrders: filterRepairOrders.toJS()
	    };
	});
	
	//换成这种写法，等同于下面的写法
	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	    return (0, _redux.bindActionCreators)(_actions2.default, dispatch);
	};
	// ({
	//     setRoute: (route, ...params) => dispatch(actions.setRoute(route, ...params)),
	//     addRepairOrder: (Id, VehicleStatus, RepairType, RepairCategory, WarrantyTime, DrivenDistance, RejectStatus) =>
	//         dispatch(actions.addRepairOrder(Id, VehicleStatus, RepairType, RepairCategory, WarrantyTime, DrivenDistance, RejectStatus)),
	//     save: (VehicleStatus, RepairType, RepairCategory, WarrantyTime, DrivenDistance, RejectStatus) =>
	//         dispatch(actions.save(VehicleStatus, RepairType, RepairCategory, WarrantyTime, DrivenDistance, RejectStatus)),
	// });
	
	
	App.propTypes = {
	    addRepairOrder: _react2.default.PropTypes.func.isRequired,
	    routeName: _react2.default.PropTypes.string,
	    save: _react2.default.PropTypes.func.isRequired,
	    setRoute: _react2.default.PropTypes.func.isRequired,
	    destroy: _react2.default.PropTypes.func.isRequired,
	    query: _react2.default.PropTypes.func,
	    repairOrderQuerySuccess: _react2.default.PropTypes.func
	};
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(App);

/***/ },

/***/ 228:
/*!***************************************!*\
  !*** ./src/components/QueryPanel.jsx ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _constants = __webpack_require__(/*! ../common/constants */ 229);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var QueryPanel = function (_Component) {
	    _inherits(QueryPanel, _Component);
	
	    function QueryPanel(props) {
	        _classCallCheck(this, QueryPanel);
	
	        var _this = _possibleConstructorReturn(this, (QueryPanel.__proto__ || Object.getPrototypeOf(QueryPanel)).call(this, props));
	
	        _this.state = {
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
	        _this.handleQueryClick = _this.handleQueryClick.bind(_this);
	        _this.handleValueChange = _this.handleValueChange.bind(_this);
	        _this.handleSelected = _this.handleSelected.bind(_this);
	        _this.createOption = _this.createOption.bind(_this);
	        return _this;
	    }
	
	    _createClass(QueryPanel, [{
	        key: 'createOption',
	        value: function createOption(name) {
	            var keyValueItems = this.props.queryPanelPage.getIn(['keyValueItems', name]);
	            if (keyValueItems) {
	                return keyValueItems.map(function (m) {
	                    return _react2.default.createElement(
	                        'option',
	                        { key: m.get('key'),
	                            value: m.get('Id') },
	                        m.get('value')
	                    );
	                });
	            }
	            return null;
	        }
	    }, {
	        key: 'handleQueryClick',
	        value: function handleQueryClick() {
	            var vehiclePlate = this.state.vehiclePlate.trim();
	            var code = this.state.code.trim();
	            var outOfFactoryCode = this.state.outOfFactoryCode.trim();
	            var brandName = this.state.brandName;
	            var repairType = this.state.repairType;
	            var createTime = this.state.createTime;
	            var rejectStatus = this.state.rejectStatus;
	            var vin = this.state.vin;
	            var branchName = this.state.branchName;
	            var status = this.state.status;
	            var productLine = this.state.productLine;
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
	    }, {
	        key: 'handleSelected',
	        value: function handleSelected(e) {
	            var getselected = e.target;
	            var selectedIndex = getselected.selectedIndex;
	            var selectedvalue = getselected.options[selectedIndex].innerHTML;
	            switch (getselected.name) {
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
	    }, {
	        key: 'handleValueChange',
	        value: function handleValueChange(e) {
	            var getInput = e.target;
	            switch (getInput.name) {
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
	    }, {
	        key: 'render',
	        value: function render() {
	            var repairTypeItems = this.createOption('repairTypes');
	            var backStatusItems = this.createOption('backStatues');
	            var repairStatusItems = this.createOption('repairStatus');
	            var branchItems = null;
	            var brandItems = null;
	            var serviceProductLineViewItems = null;
	            if (this.props.queryPanelPage) {
	                var branches = this.props.queryPanelPage.getIn(['keyValueItems', 'branches']);
	                if (branches) branchItems = branches.map(function (m) {
	                    return _react2.default.createElement(
	                        'option',
	                        { key: m.get('name'),
	                            value: m.get('Id') },
	                        m.get('name')
	                    );
	                });
	                var brands = this.props.queryPanelPage.getIn(['keyValueItems', 'brands']);
	                if (brands) brandItems = brands.map(function (m) {
	                    return _react2.default.createElement(
	                        'option',
	                        { key: m.get('name'),
	                            value: m.get('Id') },
	                        m.get('name')
	                    );
	                });
	                var serviceProductLines = this.props.queryPanelPage.getIn(['keyValueItems', 'serviceProductLineViews']);
	                if (serviceProductLines !== undefined) serviceProductLineViewItems = serviceProductLines.map(function (m) {
	                    return _react2.default.createElement(
	                        'option',
	                        { key: m.get('productLineName'),
	                            value: m.get('productLineId') },
	                        m.get('productLineName')
	                    );
	                });
	            }
	            return _react2.default.createElement(
	                'div',
	                { className: 'query' },
	                _react2.default.createElement(
	                    'div',
	                    { className: 'queryPanel' },
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'queryItem' },
	                        _react2.default.createElement(
	                            'label',
	                            { className: 'lab' },
	                            '\u8F66\u724C\u53F7\uFF1A'
	                        ),
	                        _react2.default.createElement('input', { className: 'input', value: this.state.vehiclePlate,
	                            name: 'vehiclePlate',
	                            'data-field': 'vehiclePlate',
	                            onChange: this.handleValueChange })
	                    ),
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'queryItem' },
	                        _react2.default.createElement(
	                            'label',
	                            { className: 'lab' },
	                            '\u51FA\u5382\u7F16\u53F7\uFF1A'
	                        ),
	                        _react2.default.createElement('input', { className: 'input', value: this.state.outOfFactoryCode, name: 'outOfFactoryCode', onChange: this.handleValueChange })
	                    ),
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'queryItem' },
	                        _react2.default.createElement(
	                            'label',
	                            { className: 'lab' },
	                            '\u7EF4\u4FEE\u5355\u53F7\uFF1A'
	                        ),
	                        _react2.default.createElement('input', { className: 'input', value: this.state.code, name: 'code', onChange: this.handleValueChange })
	                    ),
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'queryItem' },
	                        _react2.default.createElement(
	                            'label',
	                            { className: 'lab' },
	                            '\u7EF4\u4FEE\u7C7B\u578B\uFF1A'
	                        ),
	                        _react2.default.createElement(
	                            'select',
	                            { name: 'repairType', onChange: this.handleSelected },
	                            repairTypeItems
	                        )
	                    ),
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'queryItem' },
	                        _react2.default.createElement(
	                            'label',
	                            { className: 'lab' },
	                            '\u54C1\u724C\uFF1A'
	                        ),
	                        _react2.default.createElement(
	                            'select',
	                            { name: 'brandName', onChange: this.handleSelected },
	                            brandItems
	                        )
	                    ),
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'queryItem' },
	                        _react2.default.createElement(
	                            'label',
	                            { className: 'lab' },
	                            '\u9A73\u56DE\u72B6\u6001\uFF1A'
	                        ),
	                        _react2.default.createElement(
	                            'select',
	                            { name: 'rejectStatus', onChange: this.handleSelected },
	                            backStatusItems
	                        )
	                    )
	                ),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'queryPanel-second' },
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'queryItem' },
	                        _react2.default.createElement(
	                            'label',
	                            { className: 'lab' },
	                            'VIN\u7801\uFF1A'
	                        ),
	                        _react2.default.createElement('input', { className: 'input', value: this.state.vin, name: 'vin', onChange: this.handleValueChange })
	                    ),
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'queryItem' },
	                        _react2.default.createElement(
	                            'label',
	                            { className: 'lab' },
	                            '\u72B6 \u6001\uFF1A'
	                        ),
	                        _react2.default.createElement(
	                            'select',
	                            { name: 'status', onChange: this.handleSelected },
	                            repairStatusItems
	                        )
	                    ),
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'queryItem' },
	                        _react2.default.createElement(
	                            'label',
	                            { className: 'lab' },
	                            '\u5206\u516C\u53F8\uFF1A'
	                        ),
	                        _react2.default.createElement(
	                            'select',
	                            { name: 'branchName', onChange: this.handleSelected },
	                            branchItems
	                        )
	                    ),
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'queryItem' },
	                        _react2.default.createElement(
	                            'label',
	                            { className: 'lab' },
	                            '\u670D\u52A1\u4EA7\u54C1\u7EBF\uFF1A'
	                        ),
	                        _react2.default.createElement(
	                            'select',
	                            { name: 'productLine', onChange: this.handleSelected },
	                            serviceProductLineViewItems
	                        )
	                    ),
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'queryItem' },
	                        _react2.default.createElement(
	                            'label',
	                            { className: 'lab' },
	                            '\u521B\u5EFA\u65F6\u95F4\uFF1A'
	                        ),
	                        _react2.default.createElement('input', { type: 'date',
	                            className: 'inputDate', value: this.state.createTime,
	                            name: 'createTime',
	                            'data-field': 'beginCreateTime',
	                            onChange: this.handleValueChange }),
	                        _react2.default.createElement(
	                            'label',
	                            { className: 'lab' },
	                            '\u81F3'
	                        ),
	                        _react2.default.createElement('input', { type: 'date',
	                            'data-field': 'endCreateTime',
	                            className: 'inputDate'
	                        })
	                    )
	                ),
	                _react2.default.createElement(
	                    'div',
	                    null,
	                    _react2.default.createElement(
	                        'button',
	                        { className: 'button', type: 'button', onClick: this.handleQueryClick },
	                        '\u67E5 \u8BE2'
	                    )
	                )
	            );
	        }
	    }]);
	
	    return QueryPanel;
	}(_react.Component);
	
	exports.default = QueryPanel;

/***/ },

/***/ 229:
/*!*********************************!*\
  !*** ./src/common/constants.js ***!
  \*********************************/
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var ESCAPE_KEY = exports.ESCAPE_KEY = 27;
	var ENTER_KEY = exports.ENTER_KEY = 13;
	var ALL_REPAIRORDERS = exports.ALL_REPAIRORDERS = 'all';
	var INSERT_REPAIRORDER = exports.INSERT_REPAIRORDER = 'Insert';
	var UPDATE_REPAIRORDER = exports.UPDATE_REPAIRORDER = 'Update';
	var VIEW_REPAIRORDER_DETAIL = exports.VIEW_REPAIRORDER_DETAIL = 'ViewDetail';

/***/ },

/***/ 231:
/*!*********************************!*\
  !*** ./src/components/Menu.jsx ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(/*! classnames */ 232);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _constants = __webpack_require__(/*! ../common/constants */ 229);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Menu = function Menu(menu) {
	    var nowShowing = menu.nowShowing;
	    return _react2.default.createElement(
	        'footer',
	        { className: 'menu' },
	        _react2.default.createElement(
	            'ul',
	            { className: 'menuUl' },
	            _react2.default.createElement(
	                'li',
	                { className: 'menuli' },
	                _react2.default.createElement(
	                    'a',
	                    { href: '#/', className: (0, _classnames2.default)({ selected: nowShowing === _constants.ALL_REPAIRORDERS }) },
	                    '\u67E5\u8BE2'
	                )
	            ),
	            ' ',
	            _react2.default.createElement(
	                'li',
	                { className: 'menuli' },
	                _react2.default.createElement(
	                    'a',
	                    { href: '#/Insert', className: (0, _classnames2.default)({ selected: nowShowing === _constants.INSERT_REPAIRORDER }) },
	                    '\u65B0\u589E'
	                )
	            ),
	            ' '
	        )
	    );
	};
	
	exports.default = Menu;

/***/ },

/***/ 233:
/*!*************************************!*\
  !*** ./src/components/DataList.jsx ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var DataList = function (_Component) {
	    _inherits(DataList, _Component);
	
	    function DataList(props) {
	        _classCallCheck(this, DataList);
	
	        var _this = _possibleConstructorReturn(this, (DataList.__proto__ || Object.getPrototypeOf(DataList)).call(this, props));
	
	        _this.state = {
	            editId: _this.props.repairOrder.id
	        };
	        _this.handleQueryClick = _this.handleQueryClick.bind(_this);
	        _this.handleDeleteClick = _this.handleDeleteClick.bind(_this);
	        return _this;
	    }
	
	    _createClass(DataList, [{
	        key: "handleQueryClick",
	        value: function handleQueryClick() {
	            this.props.onQuery(ALL);
	        }
	    }, {
	        key: "handleDeleteClick",
	        value: function handleDeleteClick() {
	            var confirmResult = confirm("确定要删除该结算单信息吗？");
	            if (confirmResult === true) this.props.onDestroy(this.props.repairOrder);
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            return _react2.default.createElement(
	                "tbody",
	                null,
	                _react2.default.createElement(
	                    "tr",
	                    { className: "dataTableRow" },
	                    _react2.default.createElement(
	                        "td",
	                        null,
	                        'REPFT000796201605120002'
	                    ),
	                    _react2.default.createElement(
	                        "td",
	                        null,
	                        this.props.repairOrder.vehicleStatus
	                    ),
	                    _react2.default.createElement(
	                        "td",
	                        null,
	                        this.props.repairOrder.repairType
	                    ),
	                    _react2.default.createElement(
	                        "td",
	                        null,
	                        this.props.repairOrder.rejectStatus
	                    ),
	                    _react2.default.createElement(
	                        "td",
	                        null,
	                        this.props.repairOrder.warrantyTime
	                    ),
	                    _react2.default.createElement(
	                        "td",
	                        null,
	                        this.props.repairOrder.drivenDistance
	                    ),
	                    _react2.default.createElement(
	                        "td",
	                        null,
	                        this.props.repairOrder.vin
	                    ),
	                    _react2.default.createElement("td", null),
	                    _react2.default.createElement("td", null),
	                    _react2.default.createElement("td", null),
	                    _react2.default.createElement("td", null),
	                    _react2.default.createElement("td", null),
	                    _react2.default.createElement("td", null),
	                    _react2.default.createElement("td", null),
	                    _react2.default.createElement("td", null),
	                    _react2.default.createElement("td", null),
	                    _react2.default.createElement(
	                        "td",
	                        null,
	                        _react2.default.createElement(
	                            "button",
	                            { onClick: this.handleDeleteClick },
	                            "\u5220\u9664"
	                        ),
	                        ' ',
	                        _react2.default.createElement(
	                            "a",
	                            { href: "#Update/" + this.props.repairOrder.id },
	                            "\u4FEE\u6539"
	                        )
	                    )
	                )
	            );
	        }
	    }]);
	
	    return DataList;
	}(_react.Component);
	
	exports.default = DataList;

/***/ },

/***/ 235:
/*!**********************************************!*\
  !*** ./src/components/UpdateRepairOrder.jsx ***!
  \**********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reselect = __webpack_require__(/*! reselect */ 230);
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 178);
	
	var _routeNames = __webpack_require__(/*! ../common/routeNames */ 236);
	
	var _routeNames2 = _interopRequireDefault(_routeNames);
	
	var _redux = __webpack_require__(/*! redux */ 189);
	
	var _actions = __webpack_require__(/*! ../actions/actions */ 226);
	
	var _actions2 = _interopRequireDefault(_actions);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var UpdateRepairOrder = function (_PureComponent) {
	    _inherits(UpdateRepairOrder, _PureComponent);
	
	    function UpdateRepairOrder(props) {
	        _classCallCheck(this, UpdateRepairOrder);
	
	        var _this = _possibleConstructorReturn(this, (UpdateRepairOrder.__proto__ || Object.getPrototypeOf(UpdateRepairOrder)).call(this, props));
	
	        _this.handleChange = _this.handleChange.bind(_this);
	        return _this;
	    }
	
	    _createClass(UpdateRepairOrder, [{
	        key: 'handleChange',
	        value: function handleChange(e) {
	            this.props.onValueChange(e.target.dataset.field, e.target.value.trim());
	        }
	    }, {
	        key: 'handleSubimtClick',
	        value: function handleSubimtClick() {
	            this.props.onSave(this.props.repairOrderDetail);
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            //  this.props.getRepairOrderDetail(this.props.id);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var data = this.props.data;
	            if (data === undefined) return _react2.default.createElement(
	                'div',
	                null,
	                '\u6CA1\u6709\u53EF\u4FEE\u6539\u7684\u6570\u636E'
	            );
	            return _react2.default.createElement(
	                'div',
	                { className: 'insertForm' },
	                _react2.default.createElement(
	                    'p',
	                    null,
	                    '\u7EF4\u4FEE\u57FA\u672C\u4FE1\u606F\u4FEE\u6539'
	                ),
	                _react2.default.createElement('div', { className: 'line' }),
	                _react2.default.createElement(
	                    'table',
	                    { id: 'demo-table' },
	                    _react2.default.createElement(
	                        'tbody',
	                        null,
	                        _react2.default.createElement(
	                            'tr',
	                            null,
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                '\u8F66\u8F86\u72B6\u6001'
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                _react2.default.createElement('input', { value: data.get('vehicleStatus'), className: 'input', 'data-field': 'vehicleStatus', onChange: this.handleChange })
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                '\u7EF4\u4FEE\u7C7B\u578B'
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                _react2.default.createElement(
	                                    'select',
	                                    { onChange: this.handleChange,
	                                        value: data.get('repairType'),
	                                        'data-field': 'repairType' },
	                                    _react2.default.createElement(
	                                        'option',
	                                        null,
	                                        '\u666E\u901A\u7EF4\u4FEE'
	                                    ),
	                                    _react2.default.createElement(
	                                        'option',
	                                        null,
	                                        '\u5916\u51FA\u670D\u52A1'
	                                    ),
	                                    _react2.default.createElement(
	                                        'option',
	                                        null,
	                                        '\u5F3A\u5236\u4FDD\u517B'
	                                    ),
	                                    _react2.default.createElement(
	                                        'option',
	                                        null,
	                                        '\u666E\u901A\u4FDD\u517B'
	                                    ),
	                                    _react2.default.createElement(
	                                        'option',
	                                        null,
	                                        '\u5546\u54C1\u8F66\u7EF4\u4FEE'
	                                    ),
	                                    _react2.default.createElement(
	                                        'option',
	                                        null,
	                                        '\u4E8B\u6545\u7EF4\u4FEE'
	                                    ),
	                                    _react2.default.createElement(
	                                        'option',
	                                        null,
	                                        '\u670D\u52A1\u6D3B\u52A8'
	                                    ),
	                                    _react2.default.createElement(
	                                        'option',
	                                        null,
	                                        '\u5546\u54C1\u8F66\u4FDD\u517B'
	                                    ),
	                                    _react2.default.createElement(
	                                        'option',
	                                        null,
	                                        '\u8BA9\u5EA6\u670D\u52A1'
	                                    )
	                                )
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                '\u9A73\u56DE\u72B6\u6001'
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                _react2.default.createElement(
	                                    'select',
	                                    { onChange: this.handleChange,
	                                        value: data.get('rejectStatus'),
	                                        'data-field': 'rejectStatus' },
	                                    _react2.default.createElement(
	                                        'option',
	                                        null,
	                                        '\u672A\u9A73\u56DE'
	                                    ),
	                                    _react2.default.createElement(
	                                        'option',
	                                        null,
	                                        '\u7EF4\u4FEE\u9A73\u56DE'
	                                    ),
	                                    _react2.default.createElement(
	                                        'option',
	                                        null,
	                                        '\u5916\u51FA\u9A73\u56DE'
	                                    ),
	                                    _react2.default.createElement(
	                                        'option',
	                                        null,
	                                        '\u5168\u90E8\u9A73\u56DE'
	                                    )
	                                )
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                '\u4FDD\u4FEE\u65F6\u95F4'
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                _react2.default.createElement('input', { type: 'date', value: data.get('warrantyTime'), 'data-field': 'warrantyTime', className: 'input', onChange: this.handleChange })
	                            )
	                        ),
	                        _react2.default.createElement(
	                            'tr',
	                            null,
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                '\u884C\u9A76\u91CC\u7A0B'
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                _react2.default.createElement('input', { value: data.get('drivenDistance'), className: 'input', 'data-field': 'drivenDistance', onChange: this.handleChange })
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                '\u5DE5\u4F5C\u5C0F\u65F6'
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                _react2.default.createElement('input', { className: 'input', value: data.get('workingHours'), 'data-field': 'workingHours', onChange: this.handleChange })
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                '\u65B9\u91CF'
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                _react2.default.createElement('input', { className: 'input', value: data.get('capacity'), 'data-field': 'capacity', onChange: this.handleChange })
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                '\u5B8C\u5DE5\u65F6\u95F4'
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                _react2.default.createElement('input', { type: 'date', className: 'input', value: data.get('finishingTime'), 'data-field': 'finishingTime', onChange: this.handleChange })
	                            )
	                        )
	                    )
	                ),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'addButton' },
	                    _react2.default.createElement(
	                        'button',
	                        { onClick: this.handleSubimtClick },
	                        '\u4FDD\u5B58'
	                    )
	                )
	            );
	        }
	    }]);
	
	    return UpdateRepairOrder;
	}(_react.PureComponent);
	
	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	    return {
	        // getRepairOrderDetail: id => dispatch(actions.getRepairOrderDetail(id))
	    };
	};
	
	var mapStateToProps = (0, _reselect.createSelector)(function (state) {
	    return state.getIn(['domainData', 'repairOrders']);
	}, function (state) {
	    return state.getIn(['route', 'routeName']);
	}, function (state) {
	    return state.getIn(['route', 'routeParameters']);
	}, function (state) {
	    return state.getIn(['domainData', 'repairOrderDetail']);
	}, function (repairOrders, routeName, routeParameters, repairOrderDetail) {
	    var data = null;
	    var id = routeParameters.toJS().toString();
	    switch (routeName) {
	        case _routeNames2.default.REPAIR_ORDER_UPDATE_ROUTE:
	            data = repairOrders.filter(function (repairOrder) {
	                return repairOrder.get('id') === id;
	            }).first();
	            break;
	        default:
	            //查询界面所有数据
	            data = null;
	            break;
	    }
	    return {
	        routeName: routeName,
	        repairOrderDetail: repairOrderDetail,
	        data: data
	    };
	});
	
	UpdateRepairOrder.propTypes = {
	    onSave: _react2.default.PropTypes.func.isRequired,
	    id: _react2.default.PropTypes.string,
	    data: _react2.default.PropTypes.object,
	    getRepairOrderDetail: _react2.default.PropTypes.func
	};
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(UpdateRepairOrder);

/***/ },

/***/ 236:
/*!**********************************!*\
  !*** ./src/common/routeNames.js ***!
  \**********************************/
/***/ function(module, exports) {

	'use strict';
	
	var DEFAULT_ROUTE = '/';
	var REPAIR_ORDER_LIST_ROUTE = '/all';
	var REPAIR_ORDER_UPDATE_ROUTE = '/Update/:id';
	var REPAIR_ORDER_INSERT_ROUTE = '/Insert';
	var REPAIR_ORDER_VIEW_DETAIL = '/ViewDetail/:id';
	
	module.exports = {
	    DEFAULT_ROUTE: DEFAULT_ROUTE,
	    REPAIR_ORDER_LIST_ROUTE: REPAIR_ORDER_LIST_ROUTE,
	    REPAIR_ORDER_INSERT_ROUTE: REPAIR_ORDER_INSERT_ROUTE,
	    REPAIR_ORDER_UPDATE_ROUTE: REPAIR_ORDER_UPDATE_ROUTE,
	    REPAIR_ORDER_VIEW_DETAIL: REPAIR_ORDER_VIEW_DETAIL
	};

/***/ },

/***/ 237:
/*!**********************************************!*\
  !*** ./src/components/InsertRepairOrder.jsx ***!
  \**********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _utils = __webpack_require__(/*! ../common/utils */ 217);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var InsertRepairOrder = function (_Component) {
	    _inherits(InsertRepairOrder, _Component);
	
	    function InsertRepairOrder(props) {
	        _classCallCheck(this, InsertRepairOrder);
	
	        var _this = _possibleConstructorReturn(this, (InsertRepairOrder.__proto__ || Object.getPrototypeOf(InsertRepairOrder)).call(this, props));
	
	        _this.handleSubmitClick = _this.handleSubmitClick.bind(_this);
	        _this.onChange = _this.onChange.bind(_this);
	        _this.onBlur = _this.onBlur.bind(_this);
	        _this.onCreateFault = _this.onCreateFault.bind(_this);
	        _this.createOption = _this.createOption.bind(_this);
	        _this.onQueryContact = _this.onQueryContact.bind(_this);
	        return _this;
	    }
	
	    _createClass(InsertRepairOrder, [{
	        key: 'onBlur',
	        value: function onBlur(e) {}
	
	        //查询联系人信息
	
	    }, {
	        key: 'onQueryContact',
	        value: function onQueryContact() {}
	    }, {
	        key: 'onChange',
	        value: function onChange(e) {
	            this.props.onValueChange(e.target.dataset.field, e.target.value.trim());
	        }
	    }, {
	        key: 'handleSubmitClick',
	        value: function handleSubmitClick() {
	            this.props.repairOrder.id = (0, _utils.uuid)();
	            this.props.onSubmit(this.props.repairOrder);
	        }
	    }, {
	        key: 'onCreateFault',
	        value: function onCreateFault() {
	            this.props.addFault();
	        }
	    }, {
	        key: 'createOption',
	        value: function createOption(name) {
	            var keyValueItems = this.props.keyValueItems;
	            if (keyValueItems) {
	                var mapKeyValuesItems = keyValueItems.get(name);
	                if (mapKeyValuesItems) return mapKeyValuesItems.map(function (m) {
	                    return _react2.default.createElement(
	                        'option',
	                        { key: m.get('key'),
	                            value: m.get('Id') },
	                        m.get('value')
	                    );
	                });
	            }
	            return null;
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var repairOrder = this.props.repairOrder;
	            var repairTypeItems = this.createOption('repairTypes');
	            var backStatuesItem = this.createOption('backStatues');
	            return _react2.default.createElement(
	                'div',
	                { className: 'insertForm' },
	                _react2.default.createElement(
	                    'p',
	                    null,
	                    '\u8F66\u8F86\u4FE1\u606F'
	                ),
	                _react2.default.createElement(
	                    'table',
	                    { id: 'demo-table' },
	                    _react2.default.createElement(
	                        'tbody',
	                        null,
	                        _react2.default.createElement(
	                            'tr',
	                            null,
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                '\u7EF4\u4FEE\u5BF9\u8C61'
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                _react2.default.createElement(
	                                    'select',
	                                    {
	                                        value: repairOrder.get('repairObjectId'),
	                                        'data-field': 'repairObjectId' },
	                                    _react2.default.createElement(
	                                        'option',
	                                        { value: '' },
	                                        '\u6574\u8F66'
	                                    ),
	                                    _react2.default.createElement(
	                                        'option',
	                                        { value: '' },
	                                        '\u4E13\u9879\u53D1\u52A8\u673A'
	                                    )
	                                )
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                '\u51FA\u5382\u7F16\u53F7'
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                _react2.default.createElement('input', { type: 'text',
	                                    onChange: this.onChange,
	                                    onBlur: this.onBlur,
	                                    value: repairOrder.get('serialNumber'),
	                                    'data-field': 'serialNumber' })
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                '\u8F66\u724C\u53F7'
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                _react2.default.createElement('input', { type: 'text',
	                                    onChange: this.onChange,
	                                    onBlur: this.onBlur,
	                                    value: repairOrder.get('vehicleLicensePlate'),
	                                    'data-field': 'vehicleLicensePlate' })
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                'VIN\u7801'
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                _react2.default.createElement('input', { type: 'text',
	                                    onChange: this.onChange,
	                                    onBlur: this.onBlur,
	                                    value: repairOrder.get('vin'),
	                                    'data-field': 'vin' }),
	                                _react2.default.createElement('button', { id: 'fat-btn', 'data-loading-text': '\u67E5\u8BE2\u4E2D',
	                                    className: 'icon-search',
	                                    onClick: this.onVehicleQuery })
	                            )
	                        ),
	                        _react2.default.createElement(
	                            'tr',
	                            null,
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                '\u4EA7\u54C1\u7CFB\u5217'
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                _react2.default.createElement('input', { type: 'text',
	                                    readOnly: 'readonly',
	                                    disabled: 'disabled',
	                                    onChange: this.onChange,
	                                    value: repairOrder.get('productSeries'),
	                                    'data-field': 'productSeries' })
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                '\u5DE5\u51B5\u7C7B\u522B'
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                _react2.default.createElement('input', { type: 'text',
	                                    readOnly: 'readonly',
	                                    disabled: 'disabled',
	                                    onChange: this.onChange,
	                                    value: repairOrder.get('productType'),
	                                    'data-field': 'productSeries' })
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                '\u670D\u52A1\u4EA7\u54C1\u7EBF'
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                _react2.default.createElement('input', { type: 'text',
	                                    readOnly: 'readonly',
	                                    onChange: this.onChange,
	                                    disabled: 'disabled',
	                                    value: repairOrder.get('productLineName'),
	                                    'data-field': 'productLineName' })
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                ' \u54C1\u724C'
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                _react2.default.createElement('input', { type: 'text',
	                                    readOnly: 'readonly',
	                                    disabled: 'disabled',
	                                    onChange: this.onChange,
	                                    value: repairOrder.get('brandName'),
	                                    'data-field': 'brandName' })
	                            )
	                        ),
	                        _react2.default.createElement(
	                            'tr',
	                            null,
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                '\u6574\u8F66\u7F16\u7801'
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                _react2.default.createElement('input', { type: 'text',
	                                    readOnly: 'readonly',
	                                    onChange: this.onChange,
	                                    disabled: 'disabled',
	                                    value: repairOrder.get('topsCode'),
	                                    'data-field': 'topsCode' })
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                '\u53D1\u52A8\u673A\u578B\u53F7'
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                _react2.default.createElement('input', { type: 'text',
	                                    readOnly: 'readonly',
	                                    disabled: 'disabled',
	                                    onChange: this.onChange,
	                                    value: repairOrder.get('engineModel'),
	                                    'data-field': 'engineModel' })
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                '\u53D1\u52A8\u673A\u7F16\u53F7'
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                _react2.default.createElement('input', { type: 'text',
	                                    readOnly: 'readonly',
	                                    disabled: 'disabled',
	                                    onChange: this.onChange,
	                                    value: repairOrder.get('engineSerialNumber'),
	                                    'data-field': 'engineSerialNumber' })
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                '\u8F66\u578B\u540D\u79F0'
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                _react2.default.createElement('input', { type: 'text',
	                                    readOnly: 'readonly',
	                                    disabled: 'disabled',
	                                    onChange: this.onChange,
	                                    value: repairOrder.get('productCategoryName'),
	                                    'data-field': 'productCategoryName' })
	                            )
	                        ),
	                        _react2.default.createElement(
	                            'tr',
	                            null,
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                '\u53D8\u901F\u7BB1\u578B\u53F7'
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                _react2.default.createElement('input', { type: 'text',
	                                    readOnly: 'readonly',
	                                    disabled: 'disabled',
	                                    onChange: this.onChange,
	                                    value: repairOrder.get('gearModel'),
	                                    'data-field': 'gearModel' })
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                '\u53D8\u901F\u7BB1\u5E8F\u5217\u53F7'
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                _react2.default.createElement('input', { type: 'text',
	                                    readOnly: 'readonly',
	                                    disabled: 'disabled',
	                                    onChange: this.onChange,
	                                    value: repairOrder.get('gearSerialNumber'),
	                                    'data-field': 'gearSerialNumber' })
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                '\u9500\u552E\u65E5\u671F'
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                _react2.default.createElement('input', { type: 'text',
	                                    readOnly: 'readonly',
	                                    disabled: 'disabled',
	                                    onChange: this.onChange,
	                                    value: repairOrder.get('salesDate'),
	                                    'data-field': 'salesDate' })
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                ' \u8F66\u6865\u7C7B\u578B'
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                _react2.default.createElement(
	                                    'select',
	                                    {
	                                        onChange: this.onChange,
	                                        value: repairOrder.get('bridgeType'),
	                                        'data-field': 'bridgeType' },
	                                    _react2.default.createElement('option', { value: '-1' })
	                                )
	                            )
	                        ),
	                        _react2.default.createElement(
	                            'tr',
	                            null,
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                ' \u8425\u9500\u516C\u53F8'
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                _react2.default.createElement('input', { type: 'text',
	                                    readOnly: 'readonly',
	                                    disabled: 'disabled',
	                                    onChange: this.onChange,
	                                    value: repairOrder.get('branchName'),
	                                    'data-field': 'branchName' })
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                ' \u751F\u4EA7\u5DE5\u5382'
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                _react2.default.createElement(
	                                    'select',
	                                    {
	                                        onChange: this.onChange,
	                                        value: repairOrder.get('factoryPrise'),
	                                        'data-field': 'factoryPrise' },
	                                    _react2.default.createElement('option', { value: '-1' })
	                                )
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                ' \u5BA2\u6237\u540D\u79F0'
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                _react2.default.createElement('input', { type: 'text',
	                                    readOnly: 'readonly',
	                                    disabled: 'disabled',
	                                    onChange: this.onChange,
	                                    value: repairOrder.get('customerName'),
	                                    'data-field': 'customerName' })
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                ' \u51FA\u5382\u65E5\u671F'
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                _react2.default.createElement('input', { type: 'text',
	                                    readOnly: 'readonly',
	                                    disabled: 'disabled',
	                                    onChange: this.onChange,
	                                    value: repairOrder.get('outOfFactoryDate'),
	                                    'data-field': 'outOfFactoryDate' })
	                            )
	                        ),
	                        _react2.default.createElement(
	                            'tr',
	                            null,
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                '\u8054\u7CFB\u4EBA'
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                _react2.default.createElement('input', { type: 'text',
	                                    onChange: this.onChange,
	                                    onBlur: this.onBlur,
	                                    value: repairOrder.get('vehicleContactPerson'),
	                                    'data-field': 'vehicleContactPerson' }),
	                                _react2.default.createElement('button', { onClick: this.onQueryContact, className: 'icon-popubutton' })
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                ' \u8054\u7CFB\u7535\u8BDD'
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                _react2.default.createElement('input', { type: 'text',
	                                    onChange: this.onChange,
	                                    onBlur: this.onBlur,
	                                    value: repairOrder.get('contactPhone'),
	                                    'data-field': 'contactPhone' })
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                '\u624B\u673A\u53F7\u7801'
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                _react2.default.createElement('input', { type: 'text',
	                                    readOnly: 'readonly',
	                                    onChange: this.onChange,
	                                    disabled: 'disabled',
	                                    value: repairOrder.get('customerCellPhoneNumber'),
	                                    'data-field': 'customerCellPhoneNumber' })
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                { colSpan: '2' },
	                                _react2.default.createElement(
	                                    'div',
	                                    null,
	                                    _react2.default.createElement(
	                                        'label',
	                                        null,
	                                        'VIP'
	                                    ),
	                                    _react2.default.createElement('input', { type: 'checkBox', 'data-field': 'vIPVehicle', value: repairOrder.get('vIPVehicle') }),
	                                    _react2.default.createElement(
	                                        'label',
	                                        null,
	                                        '\u8F66\u961F\u5BA2\u6237'
	                                    ),
	                                    _react2.default.createElement('input', { type: 'checkBox', 'data-field': 'isTeamCustomers', value: repairOrder.get('isTeamCustomers') })
	                                )
	                            )
	                        ),
	                        _react2.default.createElement(
	                            'tr',
	                            null,
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                '\u4F1A\u5458\u53F7'
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                _react2.default.createElement('input', { type: 'text',
	                                    onChange: this.onChange,
	                                    onBlur: this.onBlur,
	                                    value: repairOrder.get('member'),
	                                    'data-field': 'member' }),
	                                _react2.default.createElement('button', { onClick: this.onQueryMember, className: 'icon-popubutton' })
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                '\u4F1A\u5458\u7B49\u7EA7'
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                _react2.default.createElement('input', { type: 'text',
	                                    onChange: this.onChange,
	                                    onBlur: this.onBlur,
	                                    disabled: 'disabled',
	                                    value: repairOrder.get('customerType'),
	                                    'data-field': 'customerType' })
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                '\u8BC1\u4EF6\u7C7B\u578B'
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                _react2.default.createElement('input', { type: 'text',
	                                    onChange: this.onChange,
	                                    onBlur: this.onBlur,
	                                    disabled: 'disabled',
	                                    value: repairOrder.get('idDocumentType'),
	                                    'data-field': 'idDocumentType' })
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                '\u8BC1\u4EF6\u53F7\u7801'
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                _react2.default.createElement('input', { type: 'text',
	                                    onChange: this.onChange,
	                                    onBlur: this.onBlur,
	                                    disabled: 'disabled',
	                                    value: repairOrder.get('idDocumentNumber'),
	                                    'data-field': 'idDocumentNumber' })
	                            )
	                        )
	                    )
	                ),
	                _react2.default.createElement(
	                    'ul',
	                    { className: 'repairOrderUl' },
	                    _react2.default.createElement(
	                        'li',
	                        { className: 'repairOrderli' },
	                        _react2.default.createElement(
	                            'a',
	                            { href: '#home', 'data-toggle': 'tab' },
	                            '\u4E3B\u4FE1\u606F'
	                        )
	                    ),
	                    _react2.default.createElement(
	                        'li',
	                        { className: 'repairOrderli' },
	                        _react2.default.createElement(
	                            'div',
	                            { className: 'InsertFault' },
	                            _react2.default.createElement('a', _defineProperty({ href: '#InsertFault',
	                                onClick: this.onCreateFault,
	                                'data-toggle': 'tab' }, 'data-toggle', 'tab'))
	                        )
	                    )
	                ),
	                _react2.default.createElement(
	                    'table',
	                    { id: 'demo-table' },
	                    _react2.default.createElement(
	                        'tbody',
	                        null,
	                        _react2.default.createElement(
	                            'tr',
	                            null,
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                '\u8F66\u8F86\u72B6\u6001'
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                _react2.default.createElement('input', {
	                                    value: repairOrder.get('vehicleStatus'),
	                                    'data-field': 'vehicleStatus',
	                                    className: 'input',
	                                    onChange: this.onChange })
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                '\u7EF4\u4FEE\u7C7B\u578B'
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                _react2.default.createElement(
	                                    'select',
	                                    { onChange: this.onChange,
	                                        value: repairOrder.get('repairType'),
	                                        'data-field': 'repairType' },
	                                    _react2.default.createElement(
	                                        'option',
	                                        null,
	                                        '\u666E\u901A\u7EF4\u4FEE'
	                                    ),
	                                    _react2.default.createElement(
	                                        'option',
	                                        null,
	                                        '\u5916\u51FA\u670D\u52A1'
	                                    ),
	                                    _react2.default.createElement(
	                                        'option',
	                                        null,
	                                        '\u5F3A\u5236\u4FDD\u517B'
	                                    ),
	                                    _react2.default.createElement(
	                                        'option',
	                                        null,
	                                        '\u666E\u901A\u4FDD\u517B'
	                                    ),
	                                    _react2.default.createElement(
	                                        'option',
	                                        null,
	                                        '\u5546\u54C1\u8F66\u7EF4\u4FEE'
	                                    ),
	                                    _react2.default.createElement(
	                                        'option',
	                                        null,
	                                        '\u4E8B\u6545\u7EF4\u4FEE'
	                                    ),
	                                    _react2.default.createElement(
	                                        'option',
	                                        null,
	                                        '\u670D\u52A1\u6D3B\u52A8'
	                                    ),
	                                    _react2.default.createElement(
	                                        'option',
	                                        null,
	                                        '\u5546\u54C1\u8F66\u4FDD\u517B'
	                                    ),
	                                    _react2.default.createElement(
	                                        'option',
	                                        null,
	                                        '\u8BA9\u5EA6\u670D\u52A1'
	                                    )
	                                )
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                '\u9A73\u56DE\u72B6\u6001'
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                _react2.default.createElement(
	                                    'select',
	                                    { onChange: this.onChange,
	                                        value: repairOrder.get('rejectStatus'),
	                                        'data-field': 'rejectStatus' },
	                                    _react2.default.createElement(
	                                        'option',
	                                        null,
	                                        '\u672A\u9A73\u56DE'
	                                    ),
	                                    _react2.default.createElement(
	                                        'option',
	                                        null,
	                                        '\u7EF4\u4FEE\u9A73\u56DE'
	                                    ),
	                                    _react2.default.createElement(
	                                        'option',
	                                        null,
	                                        '\u5916\u51FA\u9A73\u56DE'
	                                    ),
	                                    _react2.default.createElement(
	                                        'option',
	                                        null,
	                                        '\u5168\u90E8\u9A73\u56DE'
	                                    )
	                                )
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                '\u4FDD\u4FEE\u65F6\u95F4'
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                _react2.default.createElement('input', { type: 'date', value: repairOrder.get('warrantyTime'),
	                                    'data-field': 'warrantyTime',
	                                    className: 'input',
	                                    onChange: this.onChange })
	                            )
	                        ),
	                        _react2.default.createElement(
	                            'tr',
	                            null,
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                '\u884C\u9A76\u91CC\u7A0B'
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                _react2.default.createElement('input', { value: repairOrder.get('drivenDistance'),
	                                    'data-field': 'drivenDistance',
	                                    className: 'input',
	                                    onChange: this.onChange })
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                '\u5DE5\u4F5C\u5C0F\u65F6'
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                _react2.default.createElement('input', { className: 'input', value: repairOrder.get('workingHours'),
	                                    'data-field': 'workingHours',
	                                    onChange: this.onChange })
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                '\u65B9\u91CF'
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                _react2.default.createElement('input', { className: 'input', value: repairOrder.get('capacity'),
	                                    'data-field': 'capacity',
	                                    onChange: this.onChange })
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                '\u5B8C\u5DE5\u65F6\u95F4'
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                _react2.default.createElement('input', { type: 'date',
	                                    value: repairOrder.get('finishingTime'),
	                                    className: 'input',
	                                    'data-field': 'finishingTime',
	                                    onChange: this.onChange })
	                            )
	                        ),
	                        _react2.default.createElement(
	                            'tr',
	                            null,
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                '\u8F66\u8F86\u7528\u9014\u8BF4\u660E'
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                { colSpan: '5' },
	                                _react2.default.createElement('input', { type: 'text',
	                                    className: 'mutileText',
	                                    onBlur: this.onBlur,
	                                    onChange: this.onChange,
	                                    value: repairOrder.get('vehicleUse'),
	                                    'data-field': 'vehicleUse' })
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                '\u89C6\u9891\u624B\u673A\u53F7'
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                _react2.default.createElement(
	                                    'select',
	                                    { onChange: this.onChange, value: repairOrder.get('videoMobileNumber'), 'data-field': 'videoMobileNumber' },
	                                    _react2.default.createElement(
	                                        'option',
	                                        null,
	                                        '13265445699'
	                                    )
	                                )
	                            )
	                        ),
	                        _react2.default.createElement(
	                            'tr',
	                            null,
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                '\u8F66\u8F86\u6545\u969C\u63CF\u8FF0'
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                { colSpan: '5' },
	                                _react2.default.createElement('input', { type: 'text',
	                                    className: 'mutileText',
	                                    onBlur: this.onBlur,
	                                    onChange: this.onChange,
	                                    value: repairOrder.get('carActuality'),
	                                    'data-field': 'carActuality' })
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                '\u6D3E\u5DE5\u5355\u53F7'
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                _react2.default.createElement(
	                                    'select',
	                                    null,
	                                    _react2.default.createElement(
	                                        'option',
	                                        null,
	                                        'GD201601223666'
	                                    )
	                                )
	                            )
	                        ),
	                        _react2.default.createElement(
	                            'tr',
	                            null,
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                '\u5BA2\u6237\u610F\u89C1'
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                { colSpan: '5' },
	                                _react2.default.createElement('input', { type: 'text',
	                                    className: 'mutileText',
	                                    onBlur: this.onBlur,
	                                    onChange: this.onChange,
	                                    value: repairOrder.get('customOpinion'),
	                                    'data-field': 'customOpinion' })
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                '\u6587\u4EF6\u4E0A\u4F20'
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                { rowSpan: '3' },
	                                _react2.default.createElement('input', { type: 'file', name: 'fileName', className: 'fileInput' }),
	                                _react2.default.createElement('input', { type: 'submit' })
	                            )
	                        ),
	                        _react2.default.createElement(
	                            'tr',
	                            null,
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                '\u5904\u7406\u610F\u89C1'
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                { colSpan: '5' },
	                                _react2.default.createElement('input', { type: 'text',
	                                    className: 'mutileText',
	                                    onChange: this.onChange,
	                                    onBlur: this.onBlur,
	                                    value: repairOrder.get('callOpinion'),
	                                    'data-field': 'callOpinion' })
	                            )
	                        ),
	                        _react2.default.createElement(
	                            'tr',
	                            null,
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                '\u5907\u6CE8'
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                { colSpan: '5' },
	                                _react2.default.createElement('textarea', {
	                                    className: 'mutileTextRemark',
	                                    onChange: this.onChange,
	                                    onBlur: this.onBlur,
	                                    value: repairOrder.get('remark'),
	                                    'data-field': 'remark' })
	                            )
	                        )
	                    )
	                ),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'addButton' },
	                    _react2.default.createElement(
	                        'button',
	                        { onClick: this.handleSubmitClick },
	                        '\u63D0\u4EA4'
	                    )
	                )
	            );
	        }
	    }]);
	
	    return InsertRepairOrder;
	}(_react.Component);
	
	InsertRepairOrder.propTypes = {
	    onSubmit: _react2.default.PropTypes.func.isRequired
	};
	
	exports.default = InsertRepairOrder;

/***/ }

});
//# sourceMappingURL=client.js.map