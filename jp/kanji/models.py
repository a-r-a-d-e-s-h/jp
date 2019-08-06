from django.conf import settings
from django.db import models


# Create your models here.


class UserKanjiData(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )
    filename = models.TextField()
