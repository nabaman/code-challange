import './fontawesome.css';
import './AddReview.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import StarRating from './stars';
import React, {useRef, useState, useEffect} from 'react';
import axios from 'axios';



function getCookie(name) {
    let cookieValue = null;

    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();

            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));

                break;
            }
        }
    }

    return cookieValue;
}
const csrftoken = getCookie('csrftoken');
const PostReview = () => {

    const [review,setReview] = useState('')
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    async function submitReview(e) {
        if (rating > 0) {
            e.preventDefault();
            let payload = {
                "star":rating,
                "review-content":review
            }
            const { data } = await axios({
                method:'post',
                url: 'http://localhost/product/api/product/posting/',
                data:payload,
                headers:{"X-CSRFToken": csrftoken,
                         "Content-Type":"application/json"},

            })
            setReview("")
            setRating(0)
            setHover(0)
        }else{
            e.preventDefault();
        }
    }
    
    
    return(
       <div className="container container-fluid">
           <div className="title mt-5">
                <h1><b>Whats Your Rating</b></h1>
            </div>
            <div className="mt-4">
                <h3>Rating</h3>
               <div className="star-rating">
                {[...Array(5)].map((star, index) => {
                index += 1;
                return (
                    <button
                    type="button"
                    key={index}
                    className={index <= (hover || rating) ? "on" : "off"}
                    onClick={() => setRating(index)}
                    onMouseEnter={() => setHover(index)}
                    onMouseLeave={() => setHover(rating)}
                    >
                    <p className="star" style={{fontSize:"24px"}}>&#9733;</p>
                    </button>
                );
                })}
            </div>
                <div className="form-group">
                    <label>Review</label>
                    <form onSubmit={(e) => submitReview(e)}>
                        <input type="hidden" value={rating} />
                        <input type="text" onChange={e => setReview(e.target.value)} value={review} className="form-control" name="review-content" id="review" rows="3" required/>
                        <button type="submit" className="mt-4 btn btn-light btn-lg">Submit Review</button>
                    </form>
                </div>
            </div>
       </div>
    )
}

export default PostReview;