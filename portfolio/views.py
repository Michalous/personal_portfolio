from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.core.mail import send_mail
from django.core.files.storage import default_storage
#from django.db.models import Max
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

def data_visualization(request):
    return render(request, "portfolio/data-visualization.html")

def hangman(request):
    return render(request, "portfolio/hangman.html")

def get_top_scores():
    top_scores = HangmanScores.objects.all().order_by('-score')[:10]
    return top_scores

def hangman_endpoint(request):
    if request.method == "POST":
        data = json.loads(request.body)
        print(data)
        if data['word']:
            handle = default_storage.open("words.txt", 'r')
            words = handle.read()
            words = words.split(" ")
            word = words[random.randint(0, len(words) - 1)]
            return JsonResponse({
                "word": word
            })
        else:
            top_scores = get_top_scores()
            low = top_scores[4]
            if data['score'] > low.score:
                return JsonResponse({
                    "high-scores": "yes"
                })
            else:
                return JsonResponse({
                    "high-scores": "no"
                })
    return JsonResponse({
        'hello': 'world!'
    })


def hangman_leaderboard(request):
    if request.method == "POST":
        data = json.loads(request.body)
        score = data['score']
        name = data['name']
        if len(name) > 20:
            name = name[:20]
        entry = HangmanScores(name=name, score=score)
        entry.save()
        print(name, score)
        return JsonResponse({
            "message": "success"
        })
    return render(request, "portfolio/hangman-leaderboard.html", {
        'names': get_top_scores()
    })