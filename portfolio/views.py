from django.shortcuts import render
from django.http import HttpResponse
from django.core.mail import send_mail
from . import EMAILS

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