from django.shortcuts import render,redirect
from .models import Product,ReviewProduct
from django.shortcuts import get_object_or_404
from .tasks import calculateReview

# Create your views here.
def productView(request):
    productData,created = Product.objects.get_or_create(title="The Minimalist Entrepreneur")
    context = {
        'product':productData
    }
    return render(request, 'page/product.html',context)

def ratingView(request,id):
    if request.method == 'POST':
        prod = get_object_or_404(Product,pk=id)
        star,review_content=request.POST.get('star'),request.POST.get('review-content')
        rev = ReviewProduct.objects.create(product=prod,review_content=review_content,star=int(star))
        calculateReview.delay(rev.id)
        # return redirect('product')
    return render(request,'page/rating.html')



