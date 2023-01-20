from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("hangman", views.hangman, name="hangman"),
    path("hangman-endpoint", views.hangman_endpoint, name="hangman-endpoint")
]