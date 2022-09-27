import json
import zoneinfo
from datetime import timedelta
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout, update_session_auth_hash
from django.contrib.auth.forms import PasswordChangeForm
from django.http import HttpResponse, Http404, JsonResponse
from windir.models import Spec, Project, Game, WindirMember
from windir.forms import MemberForm
from django.utils import timezone

timezones = sorted(
        filter(
            lambda z : z.startswith('Asia') or z.startswith('Europe'), 
            zoneinfo.available_timezones()
        ) 
    )

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
        username = request.POST["username"]
        password = request.POST["password"]

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            request.session['django_timezone'] = user.utc
            if (request.POST.get('remember')):
                request.session.set_expiry(timedelta(days=60))
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
        "projects": Project.objects.all(),
        "timezones": timezones
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
        raise Http404

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

def handler404(request, exception):
    return render(request, 'windir/404.html', status=404)
    
@is_ajax
def change_zone(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        if data.get('utc') and request.user.is_authenticated:
            request.user.utc = data['utc']
            request.user.save()
            request.session['django_timezone'] = data['utc']
            return JsonResponse({'success': 'Часовой пояс успешно изменен'})
    return JsonResponse({'timezones': timezones, 'selected': request.user.utc })

@is_ajax
def change_pass(request):
    if request.method == 'POST' and request.user.is_authenticated:
        form = PasswordChangeForm(user=request.user, data=request.POST)
        if form.is_valid():
            form.save()
            update_session_auth_hash(request, form.user)
            return JsonResponse({'success': 'Пароль успешно обновлен'})
        else:
            return JsonResponse(form.errors)
    return JsonResponse({'errors': ['Произошла ошибка. Попробуйте позже или свяжитесь с администратором']})