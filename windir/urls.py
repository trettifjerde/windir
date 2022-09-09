from django.urls import path
from . import views

app_name = 'windir'

urlpatterns = [
    path('', views.index, name="index"),
    path('login/', views.login, name="login"),
    path('logout/', views.logout, name="logout"),
    path('register/', views.register, name="register"),
    path('profile/', views.profile, name="profile"),
    path('page/<str:page_name>', views.page, name="page"),
]