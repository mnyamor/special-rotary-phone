import React, {useEffect, useState} from 'react';
import './Invoices.css';
import axios from 'axios';
import Cookies from 'universal-cookie';

const Invoices: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [totalInvoices, setTotalInvoices] = useState<any[]>([]);
    const [invoicedAmount, setInvoicedAmount] = useState<number>(0);
    const [allInvoices, setAllInvoices] = useState<any[]>([]);
    const currentPage: number = 1; //active page
    const itemsPerPage: number = 10;

    const bodyFormData = new FormData();
    bodyFormData.append('Code', '34333417');

    const cookies = new Cookies();
    const accessToken = cookies.get('token');

    const fetchInvoices = async (page: number = 1): Promise<[]> => {
        setIsLoading(true);
        const response = await axios.post(`/report/2020-11-01/2020-11-30?page=${page}`, bodyFormData, {
            headers: {
                'X-Fixably-Token': `${accessToken}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        const data = response.data;
        const maxPages = Math.ceil(data.total / itemsPerPage);
        setTotalInvoices(data);
        if (response.data.length !== 0 && page !== maxPages && !totalInvoices?.length) {
            page++;
            setTotalInvoices(data.results);
            return data.results.concat(await fetchInvoices(page))
        } else {
            setTotalInvoices(data.results);
            setIsLoading(false);
            return data.results;
        }

    }

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const allInvoices = await fetchInvoices();
                setAllInvoices(allInvoices);

                const sum = allInvoices.map((item: { amount: any; }) => item.amount)
                    .reduce((acc: any, curr: any) => acc + curr, 0)
                    .toFixed(2);
                setInvoicedAmount(sum);

            } catch (err) {
                console.error(err.message);
            } finally {
                setIsLoading(false);
            }
        })();
    }, [currentPage]);

    return (

        <div className='container-fluid'>
            {
                (isLoading) ? 'Loading...' :
                    <div id='invoiceholder'>
                        <div id='invoice' className='effect2'>
                            <div id='invoice-top'>
                                <div className='title'>
                                    <h1>Invoice #94112</h1>
                                    <p>Issued: May 27, 2021</p>
                                </div>
                            </div>
                            <div id='invoice-mid'>
                                <div className='clientlogo'/>
                                <div className='info'>
                                    <h2>Client Name</h2>
                                    <p>JohnDoe@gmail.com</p>
                                </div>

                                <div id='project'>
                                    <h2>Project Description</h2>
                                    <p>Proin cursus, dui non tincidunt elementum, tortor ex feugiat enim, at elementum
                                        enim quam
                                        vel
                                        purus. Curabitur semper malesuada urna ut suscipit.
                                    </p>
                                </div>
                                <div id='invoice-bot'>
                                    <div id='table'>
                                        <table>
                                            <tbody>
                                            <tr className='tabletitle'>
                                                <td className='item'>
                                                    <h2>CREATED</h2>
                                                </td>
                                                <td className='id'>
                                                    <h2>ID</h2>
                                                </td>
                                                <td className='order id'>
                                                    <h2>ORDER ID</h2>
                                                </td>
                                                <td className='subtotal'>
                                                    <h2>AMOUNT</h2>
                                                </td>
                                            </tr>
                                            {
                                                allInvoices?.map(item => (
                                                    <tr className='service' key={item.id}>
                                                        <td className='tableitem'>
                                                            <p className='itemtext'>{item.created}</p>
                                                        </td>
                                                        <td className='tableitem'>
                                                            <p className='itemtext'>{item.id}</p>
                                                        </td>
                                                        <td className='tableitem'>
                                                            <p className='itemtext'>item.orderId</p>
                                                        </td>
                                                        <td className='tableitem'>
                                                            <p className='itemtext'>{item.amount}</p>
                                                        </td>
                                                    </tr>
                                                ))
                                            }

                                            <tr className='tabletitle'>
                                                <td/>
                                                <td/>
                                                <td className='Rate'>
                                                    <h2>Total</h2>
                                                </td>
                                                <td className='payment'>
                                                    <h2>&euro;{invoicedAmount}</h2>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </div>)
};
export default Invoices;
