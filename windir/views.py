from django.shortcuts import render
from django.http import HttpResponse, Http404

def index(request):
    return render(request, 'windir/index.html')

def login(request):
    return HttpResponse('')

def logout(request):
    return HttpResponse('')

def register(request):
    return HttpResponse('')

def profile(request):
    return HttpResponse('')

def page(request, page_name): 
    try: 
        return render(request, f'windir/{page_name}.html')
    except:
        return Http404