from django.db import models
from django.db.models import Sum
import math
# Create your models here.
from django.db.transaction import atomic


class Product(models.Model):
    title = models.CharField(max_length=50, null=True)
    rating = models.DecimalField(max_digits=2, decimal_places=1,default=0)

    def ratingToPercentage(self):
        max_rating = 5
        rating_percentage = (self.rating / max_rating) * 100
        rounded_rating_percentage = math.floor(rating_percentage/10)*10
        return f"{rounded_rating_percentage}%"

    def __str__(self):
        return self.title

    class Meta:
        db_table = "product"
        ordering = ['-id']


class ReviewProduct(models.Model):
    product = models.ForeignKey(Product, null=True, on_delete=models.CASCADE)
    review_content = models.CharField(max_length=255, null=True)
    star = models.PositiveSmallIntegerField(null=True)

    class Meta:
        db_table = "review_product"
        ordering = ['-id']

    def starToPercentage(self):
        max_star = 5
        star_percentage = (self.star / max_star) * 100
        rounded_star_percentage = round(star_percentage/10) * 10
        return f"{rounded_star_percentage}%"

    def __str__(self):
        return f"{self.review_content} | star: {self.star}"

    def save(self, *args, **kwargs):
        with atomic():
            prod = self.product
            rev_product = ReviewProduct.objects.filter(product=self.product.id)
            sum_star = rev_product.aggregate(Sum('star'))['star__sum'] if rev_product.exists() else 0
            total_review = rev_product.count()
            rating = round((sum_star + self.star)/(total_review +1),1)
            prod.rating = rating
            prod.save()
        super(ReviewProduct, self).save(*args, **kwargs)