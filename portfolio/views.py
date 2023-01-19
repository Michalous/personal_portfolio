from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.core.mail import send_mail
from django.core.files.storage import default_storage
from . import EMAILS
import json
import random


params = [0, ""]
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
    if request.method == 'POST':
        data = json.loads(request.body)
        score_q = data['score']
        word_q = data['word']
        print(score_q, word_q)
        params[0] = score_q
        params[1] = word_q
        return JsonResponse({
            "message": 'data received'
        })
        
    handle = default_storage.open("words.txt", 'r')
    words = handle.read()
    words = words.split(" ")
    word = words[random.randint(0, len(words) - 1)]

    return render(request, "portfolio/hangman.html", {
        'word': word
    })


def lost(request):
    score = request.GET.get('score')
    word = request.GET.get('word')
    return render(request, 'portfolio/lost.html', {
        'score': params[0],
        'word': params[1]
    })