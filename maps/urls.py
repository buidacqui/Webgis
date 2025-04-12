from django.urls import path
from.import views

app_name= 'maps'
# Đặt namespace cho app là 'posts'.
# Khi dùng {% url %} trong template hoặc reverse() trong code, ta sẽ gọi tên URL với tiền tố "posts:" để tránh trùng với các app khác.
urlpatterns = [
    path('', views.simplemap),
    path('co-ban/',views.simplemap, name="co-ban"),
    path('3_marker_many/',views.marker_many, name="3_marker_many"),
    path('4_marker_drag/', views.marker_drag, name="4_marker_drag"),
    path('5_marker_control/', views.marker_control, name="5_marker_control"),
    path('6_draw_map/', views.draw_map, name="6_draw_map"),
    path('1_marker_video/', views.marker_video, name="1_marker_video"),
    path('2_search_address/', views.search_address, name="2_search_address"),
    path('3_fullscreen_map/', views.fullscreen_map, name="3_fullscreen_map"),
    path('4_description_map/', views.description_map, name="4_description_map"),    
    path('5_current_location/', views.current_location, name="5_current_location"),
    path('6_story_map/', views.story_map, name="6_story_map")
]