import React, {useEffect, useState} from 'react';
import './OrderContainer.css';
import OrdersList from '../OrdersList/OrdersList';
import {IOrder, IResults, IStatus} from '../../types/types';
import axios from 'axios';
import Cookies from 'universal-cookie';
import {Link} from 'react-router-dom';
import {orderBy} from 'lodash';
import {Tab} from 'react-bootstrap/cjs';
import Tabs from 'react-bootstrap/cjs/Tabs';
import CreateOrder from '../CreateOrder/CreateOrder';

const OrderContainer: React.FC<IOrder> = () => {
    const bodyFormData = new FormData();
    bodyFormData.append('Code', '34333417');

    const searchFormData = new FormData();
    searchFormData.append('Criteria', 'iPhone*');

    const cookies = new Cookies();
    const accessToken = cookies.get('token');

    const options = {
        headers: {
            'Content-Type': 'multipart/form-data',
            'X-Fixably-Token': `${accessToken}`
        },
        data: bodyFormData,
        credentials: 'include'
    };

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState('')
    const [validated, setValidated] = useState(false);

    const [status, setStatus] = useState<IStatus[]>([]); //items per page

    const [currentPage, setCurrentPage] = useState<number>(1); //active page

    const [totalOrders, setTotalOrders] = useState<number>(0);
    const [orders, setOrders] = useState<IResults[]>([]);

    const [assignedOrders, setAssignedOrders] = useState<IResults[]>([]);

    const fetchOrdersByPage = async (page: number) => {
        return await axios.get(`/orders?page=${page}`, options);
    }

    ///report/{fromDate}/{toDate}
    const getOrdersWithIphone = async () => {
        return await axios.post(`/search/devices`, searchFormData, {
            headers: {
                'X-Fixably-Token': `${accessToken}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    }




    useEffect(() => {
        //get status...
        (async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`/statuses`, options);
                const responseData = await response.data
                setStatus(responseData);
            } catch (err) {
                console.error(err.message);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }

        })();

        //get orders... sort descending..
        (async () => {
            try {
                setIsLoading(true);
                const response = await fetchOrdersByPage(currentPage);
                const responseData = await response.data;
                const groupedResults: IResults[] = orderBy(responseData.results, ['status'], ['desc']);
                setOrders(groupedResults);
                setTotalOrders(responseData.total);
                setCurrentPage(responseData.page);
            } catch (err) {
                console.error(err.message);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        })();
        //get assigned orders with an iPhone device and currently assigned to a technician...
        (async () => {
            try {
                setIsLoading(true);
                const response = await getOrdersWithIphone();
                const responseData = await response.data;
                const filteredAssignedOrders: IResults[] = responseData.results.filter((a: IResults) => a?.technician);
                setAssignedOrders(filteredAssignedOrders);
            } catch (err) {
                console.error(err.message);
            } finally {
                setIsLoading(false);
            }
        })();
    }, [currentPage]);

    const prevPage = () => (currentPage > 1) && setCurrentPage(currentPage - 1)
    const nextPage = () => (currentPage < totalOrders) && setCurrentPage(currentPage + 1)

    const createNewOrder = (event: any) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);

        const deviceManufacturerVal = event.target.deviceManufacturer.value;
        const deviceBrandVal = event.target.deviceBrand.value;
        const deviceTypeVal = event.target.deviceType.value;

        const data = new FormData();
        data.append('DeviceManufacturer', deviceManufacturerVal);
        data.append('DeviceBrand', deviceBrandVal);
        data.append('DeviceType', deviceTypeVal);

        const createNewOrderPost = async () => {
            return await axios.post(`/orders/create`, data, {
                headers: {
                    'X-Fixably-Token': `${accessToken}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
        }

        (async () => {
            try {
                setIsLoading(true);
                const response = await createNewOrderPost();
                const responseData = await response.data;
                console.log(responseData);
            } catch (err) {
                console.error(err.message);
            } finally {
                setIsLoading(false);
            }
        })();
    };

    return (
        <div className='row'>
            <div> {(error) && 'Error has occurred'}</div>
            {
                (isLoading) ? 'Loading...' :
                    <div className='container mt-3'>
                        <div className='d-flex justify-content-end'>
                            <CreateOrder onSubmit={createNewOrder} validated={validated}/>
                        </div>
                        <Tabs defaultActiveKey='orders' id='orders-tab'>
                            <Tab eventKey='orders' title='Orders'>
                                <OrdersList results={orders} statuses={status}/>
                                <nav aria-label='Page navigation'>
                                    <ul className='pagination justify-content-end pagination-sm'>
                                        <Link to={`?page=${currentPage}`}
                                              onClick={prevPage}
                                              className={`prev ${currentPage === 1 ? 'disabled page-link mx-2' : 'page-link mx-2'}`}>
                                            Previous
                                        </Link>

                                        <Link to={`?page=${currentPage}`}
                                              onClick={nextPage}
                                              className={`next ${currentPage === totalOrders ? 'disabled page-link' : 'page-link'}`}>
                                            Next
                                        </Link>
                                    </ul>
                                </nav>
                            </Tab>
                            <Tab eventKey='assigned' title='Assigned Orders'>
                                <OrdersList results={assignedOrders} statuses={status}/>
                            </Tab>
                        </Tabs>
                    </div>
            }
        </div>
    );
}

export default OrderContainer;
