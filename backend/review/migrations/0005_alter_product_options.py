# Generated by Django 4.0.2 on 2022-02-10 11:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('review', '0004_alter_product_rating'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='product',
            options={'ordering': ['-id']},
        ),
    ]