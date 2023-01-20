from django.db import models

# Create your models here.
class HangmanScores(models.Model):
    name = models.CharField(max_length=20)
    score = models.IntegerField()

    def __str__(self):
        return f'name: {self.name} score: {self.score}'