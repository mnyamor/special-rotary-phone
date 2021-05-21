import React, {useEffect, useState} from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import axios from 'axios';
import Cookies from 'universal-cookie';
import Invoices from './components/Invoices/Invoices';
import OrderContainer from './components/OrderContainer/OrderContainer';

const App: React.FC = () => {
    const bodyFormData = new FormData();
    bodyFormData.append('Code', '34333417');

    const [accessToken, setAccessToken] = useState('');
    const [requestErr, setRequestErr] = useState('');

    const cookies = new Cookies();

    useEffect(() => {
        const getAccessToken = async () => {
            await axios({
                method: 'post',
                url: '/token',
                data: bodyFormData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            })
                .then((response) => {
                    setAccessToken(response.data.token);
                    cookies.set('token',
                        response.data.token,
                        {
                            path: '/',
                            expires: new Date(new Date().getTime() + 3600 * 1000)
                        });

                })
                .catch((error) => {
                    //handle error
                    setRequestErr(error.message);
                });
        }
        getAccessToken();
    }, []);

    axios.interceptors.request.use(config => {
        config.headers.headers = `X-Fixably-Token ${accessToken}`
        return config;
    }, error => {
        Promise.reject(error).then(r => console.error(r));
    })

    return (
        <div className="page-wrapper">
            <div> {(requestErr) && 'Error has occurred'}</div>
            <Navbar/>
            <div className='container-fluid main-content'>
                <Switch>
                    <Route path={'/'} exact component={OrderContainer}/>
                    <Route path={`/orders/?page=page`} exact component={OrderContainer}/>
                    <Route path={'/invoices'} exact component={Invoices}/>
                    <Route path='*' render={() => <div>404</div>}/>
                </Switch>
            </div>
        </div>
    );
}

export default App;

