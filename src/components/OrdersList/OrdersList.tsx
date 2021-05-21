import React from 'react';
import './OrdersList.css';
import {IResults, IStatus} from '../../types/types';
import {Link} from 'react-router-dom';

const OrdersList: React.FC<any> = props => {
    const statusClass: (item: any) => string = (item: any) => {
        switch (item && item[0]?.id) {
            case 1:
                return 'badge badge-pill bg-danger'
            case 2:
                return 'badge badge-pill bg-success'
            case 3:
                return 'badge badge-pill bg-primary'
            case 4:
                return 'badge badge-pill bg-warning'
            default:
                return 'badge badge-pill bg-dark'
        }
    }
    return (
        <div className='order-list'>
            {(!props?.results?.length) ? 'No orders found' :
                <table className='table table-light my-3'>
                    <thead className='table-dark'>
                    <tr>
                        <th>Id</th>
                        <th>Device type</th>
                        <th>Created</th>
                        <th>Device Manufacturer</th>
                        <th>Device Brand</th>
                        <th>Status</th>
                        <th>Technician</th>
                    </tr>
                    </thead>
                    <tbody className="orders">
                    {
                        props?.results
                            .map((order: IResults) => (
                                <tr className='orders-table-row' key={order?.id}>
                                    <td><Link to={`/orders/${order?.id}`}>{order?.id}</Link></td>
                                    <td>{order?.deviceType}</td>
                                    <td>{order?.created}</td>
                                    <td>{order?.deviceManufacturer}</td>
                                    <td>{order?.deviceBrand}</td>
                                    <td>
                                        <span
                                            className={statusClass(props?.statuses.filter((st: IStatus) => (st?.id === order?.status) && order?.id))}>
                                                {props?.statuses.map((st: IStatus) => (st?.id === order?.status) && st?.description).filter(Boolean)}
                                        </span>
                                    </td>
                                    <td>{order?.technician}</td>
                                </tr>

                            ))
                    }
                    </tbody>
                </table>
            }
        </div>
    );
}
export default OrdersList;
