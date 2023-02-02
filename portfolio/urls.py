from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("data-visualization", views.data_visualization, name="data-visualization"),
    path("games", views.games, name="games"),
    path("hangman", views.hangman, name="hangman"),
    path("hangman-endpoint", views.hangman_endpoint, name="hangman-endpoint"),
    path("hangman-leaderboard", views.hangman_leaderboard, name="hangman-leaderboard")
]