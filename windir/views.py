import json
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse, HttpResponseNotFound, JsonResponse
from windir.models import Spec, Project, Game
from windir.forms import MemberForm

def is_ajax(function):
    def inner(request):
        if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
            return function(request)
        else:
            return redirect('windir:index')
    return inner

def index(request):
    return render(request, 'windir/index.html')

@is_ajax
def login_view(request):
    if request.method == "POST":
        data = json.loads(request.body)
        username = data["username"]
        password = data["password"]

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return JsonResponse({'success': ''})
        else:
            return JsonResponse({'user-error': 'Неверный логин или пароль'})

    return JsonResponse({'site-error': 'Must be POST'})

@is_ajax
def logout_view(request):
    logout(request)
    return JsonResponse({'success': ''})

def register_view(request):
    if request.method == "POST":
        form = MemberForm(request.POST)
        if form.is_valid():
            form.save()
            return JsonResponse({'success': ''})
        else:
            return JsonResponse({'errors': form.errors})
    return render(request, 'windir/register.html', {"specs": Spec.objects.all(), "projects": Project.objects.all()})

def profile(request):
    return HttpResponse('')

def table(request):
    return render(request, 'windir/table.html', {'games': Game.objects.all()})

def page(request, page_name): 
    try: 
        return render(request, f'windir/{page_name}.html')
    except:
        return HttpResponseNotFound("Страница не найдена")