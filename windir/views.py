from django.shortcuts import render
from django.http import HttpResponse, HttpResponseNotFound

def index(request):
    return render(request, 'windir/index.html')

def login(request):
    return HttpResponse('')

def logout(request):
    return HttpResponse('')

def register(request):
    specs = [
        {"id": 100, "name": "КС"},
        {"id": 101, "name": "КО"},
        {"id": 102, "name": "ЗамКО"},
        {"id": 103, "name": "Стрелок ГП"},
        {"id": 104, "name": "Пулеметчик"},
        {"id": 105, "name": "Медик"},
        {"id": 106, "name": "Гранатометчик"},
        {"id": 107, "name": "Снайпер"},
        {"id": 108, "name": "Стрелок"},
        {"id": 109, "name": "Инженер"},
        {"id": 110, "name": "Пилот"},
        {"id": 111, "name": "Мехвод"},
        {"id": 112, "name": "Наводчик"},
        {"id": 113, "name": "Сапер"},
        {"id": 114, "name": "Артиллерист"},
    ]
    projects = [
        {"id": 53, "name": "RedBear"},
        {"id": 50, "name": "WOG"},
        {"id": 51, "name": "WOG3"},
        {"id": 54, "name": "SquadGames"},
        {"id": 52, "name": "HMG"},
        {"id": 55, "name": "Tushino"},
        {"id": 56, "name": "FT-2"},
        {"id": 57, "name": "Domination"},
    ]
    return render(request, 'windir/register.html', {"specs": specs, "projects": projects})

def profile(request):
    return HttpResponse('')

def page(request, page_name): 
    try: 
        return render(request, f'windir/{page_name}.html')
    except:
        return HttpResponseNotFound("Страница не найдена")