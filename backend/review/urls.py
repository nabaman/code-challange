from django.urls import path
from .views import productView,ratingView
from .api import productApi,reviewApi,postReview
urlpatterns = [
    path('',productView,name='product'),
    path('rating/<str:id>/',ratingView,name='rating'),
    path('api/product/',productApi),
    path('api/product/posting/', postReview),
    path('api/review/<str:id>/',reviewApi)
]