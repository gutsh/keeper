# Generated by Django 3.2 on 2021-05-14 09:15

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('service', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='item',
            old_name='folder',
            new_name='parent_folder',
        ),
    ]