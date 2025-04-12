from django.contrib.gis.db import models

class Province(models.Model):
    name = models.CharField(max_length=100)
    geom = models.MultiPolygonField()

    def __str__(self):
        return self.name