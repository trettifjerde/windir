from django.urls import path
from . import views

app_name = 'windir'

urlpatterns = [
    path('', views.index, name="index"),
    path('login/', views.login_view, name="login"),
    path('logout/', views.logout_view, name="logout"),
    path('register/', views.register_view, name="register"),
    path('profile/', views.profile, name="profile"),
    path('table/', views.table, name="table"),
    path('tableupd/', views.update_table, name="update_table"),
    path('cellsinfo/', views.cells_info, name='cells_info'),
    path('changezone/', views.change_zone, name='change_zone'),
    path('changepass/', views.change_pass, name='change_pass'),
    path('page/<str:page_name>', views.page, name="page"),
]