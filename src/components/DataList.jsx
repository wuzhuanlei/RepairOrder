import React, {Component} from 'react';

class DataList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editId: this.props.repairOrder.id
        }
        this.handleQueryClick = this.handleQueryClick.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
    }

    handleQueryClick() {
        this.props.onQuery(ALL);
    }

    handleDeleteClick() {
        var confirmResult = confirm("确定要删除该结算单信息吗？");
        if(confirmResult === true)
            this.props.onDestroy(this.props.repairOrder);
    }

    render() {
        return (
            <tbody>
            < tr className="dataTableRow">
                <td >
                    {'REPFT000796201605120002'}
                </td>
                <td >
                    {this.props.repairOrder.vehicleStatus}
                </td>
                <td >
                    {this.props.repairOrder.repairType}
                </td>
                <td >
                    {this.props.repairOrder.rejectStatus}
                </td>
                <td >
                    {this.props.repairOrder.warrantyTime}
                </td>
                <td >
                    {this.props.repairOrder.drivenDistance}
                </td>
                <td >
                    {this.props.repairOrder.vin}
                </td>
                <td >
                </td>
                <td >
                </td>
                <td >
                </td>
                <td >
                </td>
                <td >
                </td>
                <td >
                </td>
                <td >
                </td>
                <td >
                </td>
                <td >
                </td>
                <td >
                    <button onClick={this.handleDeleteClick}>删除</button>
                    {' '}
                    <a href={`#Update/${this.props.repairOrder.id}`}>
                        修改
                    </a>
                </td>
            </tr>
            </tbody>
        );
    }
}

export  default  DataList;