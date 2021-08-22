from django.db import models
from cuisine import models as Cuisine

class BaseItem(models.Model):
    name = models.CharField(max_length=20)
    stopped = models.BooleanField(default=False)
    class Meta:
        abstract = True

class Folder(BaseItem):
    parent_folder = models.ForeignKey('self', on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.name

class Item(BaseItem):
    parent_folder = models.ForeignKey(Folder, on_delete=models.CASCADE)
    price = models.IntegerField()
    serving_time = models.IntegerField()
    pinned = models.BooleanField(default=False)
    recipe = models.OneToOneField(
        Cuisine.Recipe,
        on_delete=models.CASCADE
    )

    def __str__(self):
        return self.name
