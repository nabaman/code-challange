import './fontawesome.css';
import './AddReview.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { w3cwebsocket } from 'websocket';
import React, {useRef, useState, useEffect} from 'react';
import RowData from './ReviewData/RowData';
import HeaderData from './HeaderData/HeaderData.js';
import axios from 'axios';
const AddReview = () => {

    const [getHeader, setHeader] = useState(
        {
            new_star: "",
            percentage: '0%',
            title : ""
        },

    )

    async function fetchDataHeader() {
        const { data } = await axios.get(
          'http://localhost/product/api/product/'
        )
        setHeader(data.new_rating)
        return data.new_rating
      }


    useEffect (() => {
        fetchDataHeader()
    },[])

    const [getReview, setReview] = useState([])

    async function fetchDataReview() {
        const { data } = await axios.get(
          'http://localhost/product/api/review/1/'
        )
        setReview(data.new_review)
      }


    useEffect (() => {
        fetchDataReview ()
    },[])


    const websocket = useRef(null)

    useEffect(() => {

        websocket.current = new w3cwebsocket('ws://localhost/post/rating/')
        websocket.current.onopen = () => {
        }
        websocket.current.onmessage = (message) => {
            let data = JSON.parse(message.data);
            let header = JSON.parse(message.data)
            setReview([data.new_review].concat(getReview))
            setHeader(header.new_rating)
        }
    })
    return(
    <div className='container'>
        <div className="title text-center mt-5">
            <h1>{getHeader.title}</h1>
        </div>
        <div className="review-table">
            <table className='w-100 table'>
                <HeaderData dataHeader= {getHeader}/>
            </table>
        </div>
        <div className='review-list' style={{marginTop: '50px'}}>
            <div className='p-2'>
                <h4><b>REVIEWS</b></h4>
            </div>
            <table className='w-100 table table-borderless'>
                <RowData dataReview= {getReview}/>
            </table>
        </div>
    </div>
    )
}

export default AddReview;