import os
from django.shortcuts import render
from django.http import FileResponse, Http404, HttpResponse, JsonResponse
from django.views.decorators.http import require_POST

from .utils import char_exists, char_filename


def index(request):
    return HttpResponse("Test")


def character(request, char_num):
    if not char_exists(char_num):
        raise Http404("File not found")

    return FileResponse(open(char_filename(char_num), 'rb'))


def kanji_view(request):
    return render(request, "kanji/kanji_viewer.html")


@require_POST
def touch_character(request):
    char = request.POST.get('char').strip()
    if not char:
        return HttpResponse(status=500)

    char_num = ord(char)
    return JsonResponse({'exists': char_exists(char_num)})
