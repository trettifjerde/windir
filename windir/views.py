import json
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse, HttpResponseNotFound, JsonResponse
from windir.models import Spec, Project, Game, WindirMember
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
        print(request.POST.getlist('project'))
        print(request.POST.getlist('spec'))
        if form.is_valid():
            model = form.save()
            for spec in request.POST.getlist('spec'):
                model.spec.add(spec)
            for proj in request.POST.getlist('project'):
                model.project.add(proj)
            model.save()
            return JsonResponse({'success': ''})
        else:
            return JsonResponse({'errors': form.errors})
    return render(request, 'windir/register.html', {
        "specs": Spec.objects.all(), 
        "projects": Project.objects.all()
    })

def profile(request):
    return HttpResponse('')

def table(request):
    return render(request, 'windir/table.html', {
        'games': Game.objects.all(),
        'members': WindirMember.objects.filter(is_active=True)
    })

def page(request, page_name): 
    try: 
        return render(request, f'windir/{page_name}.html')
    except:
        return HttpResponseNotFound("Страница не найдена")

@is_ajax
def update_table(request):
    if not request.method == 'PUT' or not request.user.is_authenticated:
        return JsonResponse({'error': 'Запрос отклонен'})
    
    try:
        data = json.loads(request.body)
        assert(request.user.id == data['memberId'])
        member = WindirMember.objects.get(pk=data['memberId'])
        game = Game.objects.get(pk=data['gameId'])
        if data['matchNo'] == 1:
            game.first.remove(member) if game.first.contains(member) else game.first.add(member)
        elif data['matchNo'] == 2:
            game.second.remove(member) if game.second.contains(member) else game.second.add(member)
        else:
            raise Exception
        return JsonResponse({'success': ''})
    except:
        return JsonResponse({'error': 'Запрос содержал ошибку'})

@is_ajax
def cells_info(request):
    try:
        info = [(member in match.all())
            for member in WindirMember.objects.filter(is_active=True) 
            for game in Game.objects.all() 
            for match in [game.first, game.second]
        ]
        return JsonResponse({'info': info})
    except:
        return JsonResponse({'error': 'Сейчас информация недоступна.'})
    