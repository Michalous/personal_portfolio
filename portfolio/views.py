from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.core.mail import send_mail
from django.core.files.storage import default_storage
from . import EMAILS
from .models import HangmanScores
import json
import random


# Create your views here.
def index(request):
    if request.method == "POST":
        email = request.POST['email']
        query = request.POST['query']
        send_mail(
                 'New customer your majesty',
                 f'Email: {email}\nMessage: {query}',
                 EMAILS.EMAIL_FROM,
                 [EMAILS.EMAIL_TO],
                 fail_silently=False
             )
        message = "We've received your message and will reply as soon as we can."
        return render(request, "portfolio/index.html", {"message" : message})

    return render(request, "portfolio/index.html")

def hangman(request):
    return render(request, "portfolio/hangman.html")

def hangman_endpoint(request):
    if request.method == "POST":
        data = json.loads(request.body)
        if data['word']:
            handle = default_storage.open("words.txt", 'r')
            words = handle.read()
            words = words.split(" ")
            word = words[random.randint(0, len(words) - 1)]
            return JsonResponse({
                "word": word
            })
    return JsonResponse({
        'hello': 'world!'
    })

def hangman_leaderboard(request):
    names = HangmanScores.objects.all()
    for name in names:
        print(name)
    print(names)
    return render(request, "portfolio/hangman-leaderboard.html", {
        'names': HangmanScores.objects.all()
    })