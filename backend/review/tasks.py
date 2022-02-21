import time
from celery import shared_task
from django.db.models import Sum
from django.db.transaction import atomic
from .helper import sendingNewReviewData
from .models import ReviewProduct
import math
@shared_task()
def calculateReview(rev_id):
    time.sleep(2)
    with atomic():
        rev = ReviewProduct.objects.get(id=rev_id)
        prod = rev.product
        rev_product = ReviewProduct.objects.select_for_update().filter(product=rev.product.id)
        sum_star = rev_product.aggregate(Sum('star'))['star__sum'] if rev_product.exists() else 0
        total_review = rev_product.count()
        print(sum_star,'wwwwwwwww',total_review)
        calculate_rating = sum_star/total_review
        rating = math.floor(calculate_rating*10)/10
        print(rating,'xxxxx')
        prod.rating = rating
        prod.save()
        sendingNewReviewData(prod,rev)

