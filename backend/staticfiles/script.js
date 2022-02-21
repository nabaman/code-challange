// total_star

var stars_inner = document.querySelectorAll('.stars-inner')

function activateStarColor() {
    stars_inner.forEach(function (el) {
        let data_rating = el.getAttribute('data-rating')
        el.style.width = data_rating
    })
}
activateStarColor()


let star = document.querySelectorAll('.stars a')
for (let i = 0; i < star.length; i++) {
    star[i].addEventListener('click', function () {
        let elem = document.querySelectorAll('.stars span, .stars a')
        for (let a = 0; a < elem.length; a++) {
            elem[a].classList.remove('active')
        }
        this.classList.add('active')
        let starReview = document.getElementById('star-review')
        starReview.value = this.innerHTML
        var starSpan = document.querySelectorAll('.stars span')
        for (let x = 0; x < starSpan.length; x++) {
            starSpan[x].classList.add('active')
        }
    })
}