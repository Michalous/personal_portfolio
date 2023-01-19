from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("hangman", views.hangman, name="hangman"),
    path("hangman/lost", views.lost, name="lost")
]