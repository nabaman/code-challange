import { BrowserRouter as Router,Routes,Route,Link } from 'react-router-dom';
const HeaderData = (props) =>{
    let innerStyle = {
        width: props.dataHeader.percentage
    }
    return(
    <tbody>
        <tr className='rating-content' style={{width: '10%', textAlign: 'center'}}>
            <td className=''>
                <b className='number-rating'>{props.dataHeader.new_star}</b>
            </td>
            <td style={{width: '40%', textAlign: 'center'}}>
                <div className='stars-outer'>
                <div className='stars-inner' style={innerStyle}>
                </div>
                </div>
            </td>
            <td style={{width: '30%', textAlign: 'center'}}>
                <Link className='btn btn-light btn-lg' to="/post-review">add Review</Link>
            </td>
        </tr>
    </tbody> 
    )
}

export default HeaderData;