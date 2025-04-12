"""
URL configuration for DacQui project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from.import view
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', view.homepage),
    # Khi người dùng truy cập trang chủ (/), Django gọi hàm homepage trong view.py.
    path('gioi-thieu/', view.aboutpage),
    # Khi người dùng truy cập /gioi-thieu/, Django gọi hàm aboutpage trong view.py.
    # Khi truy cập /posts/, Django sẽ tìm tiếp file urls.py trong ứng dụng posts.
    path('maps/', include('maps.urls')),
    path('map/', view.map_view),
    path('routing/', view.routing)

]
