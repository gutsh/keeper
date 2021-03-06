# Generated by Django 3.2 on 2021-04-22 03:31

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('cuisine', '0002_auto_20210421_0735'),
    ]

    operations = [
        migrations.AddField(
            model_name='recipe',
            name='can_be_ingr',
            field=models.BooleanField(default=False, verbose_name='Can be a compound ingredient'),
        ),
        migrations.AlterField(
            model_name='compoundingredient',
            name='to_recipe',
            field=models.ForeignKey(limit_choices_to={'can_be_ingr': True}, on_delete=django.db.models.deletion.CASCADE, related_name='+', to='cuisine.recipe', verbose_name='Ingredient'),
        ),
    ]
