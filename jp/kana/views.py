from django.shortcuts import render

# Create your views here.

def kana(request):
    return render(request, "kana/kana.html")
