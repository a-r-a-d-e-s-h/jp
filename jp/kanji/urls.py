from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='kanji_index'),
    path('character/<int:char_num>.png', views.character, name='character'),
    path('view', views.kanji_view, name='kanji_viewer'),
    path('touch_character', views.touch_character, name='touch_character')
]
