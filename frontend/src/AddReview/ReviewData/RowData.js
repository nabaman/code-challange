const RowData = (props) => {
    if(props.dataReview.length){
        return(
            <tbody>
                {
                    props.dataReview.map((review, i) => {
                        const innerStyle = {
                            width: review.percentage,
                        }
                        return <tr key={i} className='rating-content'>
                        <td style={{width: '30%', textAlign: 'left'}}>
                            <div className='stars-outer'>
                                <div className='stars-inner' style={innerStyle}></div>
                            </div>
                        </td>
                        <td style={{width: '30%', textAlign: 'center'}}><p>{review.star}</p></td>
                        <td style={{width: '30%', textAlign: 'right'}}><p>{review.content}</p></td>
                    </tr>
                    })
                }
            </tbody>
        )
    }else{
        return(
            <tbody></tbody>
        )
    }
}

export default RowData;