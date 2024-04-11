/* eslint-disable jsx-a11y/heading-has-content */
import './Weather.css'
import CardWeather from './CardWeather'
import Button from '@mui/material/Button';
import { useContext, useEffect } from 'react';
import { TranseltContext } from '../Context';
import { useTranslation } from 'react-i18next';

//date
import moment from 'moment';
import "moment/min/locales"



const Weather = () => {
    
    const {Translat,setTranslat, setTiems} = useContext(TranseltContext)
    const { i18n } = useTranslation();
    const handelTranslet = () => {
        if(Translat === 'en'){
            setTranslat('ar')
            i18n.changeLanguage('ar')
            moment.locale('ar')
        }else if(Translat === 'ar'){
            setTranslat('en')
            i18n.changeLanguage('en')
            moment.locale('en')
        }
    }
    useEffect(()=>{
        setTimeout(() => {
            setTiems(moment().format('MMMM Do YYYY, h:mm:ss a'))
        },1000)

    })
    


    return (
        <>
            <CardWeather />
            <div style={{color:"white",marginTop:"10px"}} dir={Translat === "en" ? "ltr" : "rtl"}>
                <Button variant="TEXT" onClick={handelTranslet}>{Translat === 'ar'? "انكليزي" :"Araibc"}</Button>
            </div>

        </>
    )
    }

export default Weather
