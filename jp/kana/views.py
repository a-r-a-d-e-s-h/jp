from django.shortcuts import render

# Create your views here.


def kana(request):
    print("Test!")
    return render(request, "kana/kana.html")
