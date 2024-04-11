/* eslint-disable react-hooks/exhaustive-deps */
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


//ICONS
import { FaCloud } from "react-icons/fa6";

//liabare API
import axios from 'axios'

//REACT HOOKS
import { useContext, useEffect, useState, } from 'react';




//Translation 
import { useTranslation } from 'react-i18next';
import { TranseltContext } from '../Context';

let cancelAxios = null;

const CardWeather = () => {


    const { t, i18n } = useTranslation();
    const [tempAPI,setTempAPI]= useState({
        numberTemp:null,
        description:"",
        min:null,
        max:null,
        ICON :null
    })
    

    const {Translat,tiems} = useContext(TranseltContext)
    
    useEffect(() => {
        i18n.changeLanguage(Translat)

        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=33.51&lon=36.27&appid=cb217d961efdd4936ccf5925492ac781`,
            {
                cancelToken: new axios.CancelToken((c) => {
                    cancelAxios = c
                })
            }
        )
            .then(function (response) {
                // handle success

                const temp = Math.round(response.data.main.temp - 271.15);
                const tempMin = Math.round(response.data.main.temp_min - 271.15);
                const tempMax = Math.round(response.data.main.temp_max - 271.15);
                const tempDescription = response.data.weather[0].description
                const tempIcons = response.data.weather[0].icon
                setTempAPI({ ...temp, numberTemp: temp, min: tempMin, max: tempMax, description: tempDescription, ICON: tempIcons })

            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })

        return () => {
            cancelAxios()
        };
    }, [])
    return (
        <Card sx={{ minWidth: 275, background: "rgb(28 52 91 / 36%)", marginTop: "100px" }} >
            <CardContent  >
                <div className='card-haeder' >
                    <h1>{t('Damascus')}</h1>
                    <h4>  {tiems} </h4>
                </div>

                <hr style={{ borderColor: "white" }} />

                <div className='card-body'>
                    <div className=' card-titel'>
                        <div className='card-celseoc'>
                            <h1>{tempAPI.numberTemp}</h1>
                            <img src={`https://openweathermap.org/img/wn/${tempAPI.ICON}@2x.png`} alt='' />
                        </div>

                        <h3>{t(tempAPI.description)}</h3>

                        <ul>
                            <li><h5>  {t('min')} : {tempAPI.min} </h5></li>
                            <li style={{margin:"0px 20px"}}><h5> | </h5></li>
                            <li><h5> {t('max')} : {tempAPI.max}</h5></li>
                        </ul>

                    </div>

                    <div className='card-image'>
                        <span><FaCloud /></span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default CardWeather
