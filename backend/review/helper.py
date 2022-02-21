import json

from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer

def sendingNewReviewData(prod,rev):
    channel_layer = get_channel_layer()
    new_review = {
        'star':float(rev.star),
        'content':rev.review_content,
        'percentage':rev.starToPercentage()
    }
    new_rating = {
        'new_star':prod.rating,
        'percentage':prod.ratingToPercentage(),
        'title':prod.title
    }
    async_to_sync(channel_layer.group_send)(
        'review_product',
        {
            'type': 'send_update_review',
            'new_rating':new_rating,
            'new_review': new_review,
        }
    )
