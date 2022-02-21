window.addEventListener("load", function () {
    const chatSocket = new WebSocket(
        'ws://'
        + "3.0.61.254"
        + '/post/rating/'
    );

    chatSocket.onmessage = function (e) {
        const data = JSON.parse(e.data);
        var mainRating = document.getElementById('main-rating')
        var mainStar = document.getElementById('main-star')
        mainRating.innerHTML = data.new_rating.new_star
        mainStar.style.width = data.new_rating.percentage
        var myTable = document.getElementById('my-table')
        var newrow = myTable.insertRow(0)
        newrow.innerHTML = `<td style="width: 30%; text-align: left">
                                <div class="stars-outer">
                                    <div class="stars-inner" data-rating="${data.new_review.percentage}"></div>
                                </div>
                            </td>
                            <td style="width: 10%; text-align: center"><p class="number-rating">${data.new_review.star}</p></td>
                            <td style="width: 30%;text-align: right">
                                <p>${data.new_review.content}</p>
                            </td>`
        var star_container = newrow.firstElementChild.firstElementChild.firstElementChild
        star_container.style.width = data.new_review.percentage
    };

    chatSocket.onclose = function (e) {
        console.error('Chat socket closed unexpectedly');
    };
});

