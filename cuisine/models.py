from django.db import models

class CommodityUnit(models.Model):
    name = models.CharField(max_length=10, default='?', primary_key=True)
    
    def __str__(self):
        return self.name

class CommodityCategory(models.Model):
    name = models.CharField(max_length=20, default='?', primary_key=True)

    def __str__(self):
        return self.name

class Commodity(models.Model):
    name = models.CharField(max_length=40)
    category = models.ForeignKey(CommodityCategory, models.SET_DEFAULT, default='?')
    unit = models.ForeignKey(CommodityUnit, models.SET_DEFAULT, default='?', related_name='+')
    total_amount = models.DecimalField(max_digits=13, decimal_places=6)

    def __str__(self):
        return self.name

class Recipe(models.Model):
    name = models.CharField(max_length=30, null=True)
    can_be_ingr = models.BooleanField(verbose_name='Can be an ingredient', default=False)
    elementary_ingredients = models.ManyToManyField(
        Commodity,
        through='ElementaryIngredient'
    )
    compound_ingredients = models.ManyToManyField(
        'self',
        through='CompoundIngredient',
        related_name='+'
    )

    def __str__(self):
        return self.name

class IngredientUnit(models.Model):
    name = models.CharField(max_length=10, default='?', primary_key=True)

    def __str__(self):
        return self.name

class IngredientBase(models.Model):
    from_recipe = models.ForeignKey(Recipe, models.CASCADE)
    unit = models.ForeignKey(IngredientUnit, models.SET_DEFAULT, default='?', related_name='+')
    quantity = models.DecimalField(max_digits=13, decimal_places=6)

    class Meta:
        abstract = True

class ElementaryIngredient(IngredientBase):
    to_commodity = models.ForeignKey(Commodity, models.CASCADE, verbose_name='Ingredient')

    def __str__(self):
        return "{}, {} {}".format(self.to_commodity.name, self.quantity, self.unit.name)

class CompoundIngredient(IngredientBase):
    to_recipe = models.ForeignKey(
        Recipe, models.CASCADE,
        limit_choices_to={'can_be_ingr': True},
        verbose_name='Ingredient', related_name='+')

    def __str__(self):
        return "{}, {} {}".format(self.to_recipe.name, self.quantity, self.unit.name)