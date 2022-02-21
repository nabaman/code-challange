from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from .tasks import calculateReview
from .models import Product, ReviewProduct
from rest_framework.decorators import api_view

@api_view(['GET'])
def productApi(request):
    prod, created = Product.objects.get_or_create(title="The Minimalist Entrepreneur")
    data = {
            'new_rating': {
            'new_star': prod.rating,
            'percentage': prod.ratingToPercentage(),
            'title': prod.title,
            'id': prod.id
        }
    }

    res = Response(data)
    # res["Access-Control-Allow-Origin"] = "*"
    # res["Access-Control-Allow-Methods"] = "GET"
    # res["Access-Control-Allow-Headers"] = "*"
    return res


@api_view(['GET'])
def reviewApi(request, id):
    prd, created = Product.objects.get_or_create(title="The Minimalist Entrepreneur")
    prod = get_object_or_404(Product, pk=prd.id)
    rev = prod.reviewproduct_set.all()
    temp = []
    for x in rev:
        content = {}
        content['star'] = float(x.star)
        content['content'] = x.review_content
        content['percentage'] = x.starToPercentage()
        temp.append(content)
    data = {
        'new_review': temp
    }
    res = Response(data)
    # res["Access-Control-Allow-Origin"] = "*"
    # res["Access-Control-Allow-Methods"] = "GET"
    # res["Access-Control-Allow-Headers"] = "*"

    return res


@api_view(['POST'])
def postReview(request):
    prd, created = Product.objects.get_or_create(title="The Minimalist Entrepreneur")
    prod = get_object_or_404(Product, pk=prd.id)
    star, review_content = request.data.get('star'), request.data.get('review-content')
    rev = ReviewProduct.objects.create(product=prod, review_content=review_content, star=int(star))
    calculateReview.delay(rev.id)
    return Response({'status': 'ok'})
