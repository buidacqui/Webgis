from django.shortcuts import render

# Create your views here.
def simplemap(request):
    return render(request, 'mapsP1/simple-map.html')

def marker_many(request):
    return render(request, 'mapsP1/3_marker_many.html')

def marker_drag(request):
    return render(request, 'mapsP1/4_marker_drag.html')

def marker_control(request):
    return render(request, 'mapsP1/5_marker_control.html')

def draw_map(request):
    return render(request, 'mapsP1/6_draw_map.html')

def marker_video(request):
    return render(request, 'mapsP2/1_marker_video.html')

def search_address(request):
    return render(request, 'mapsP2/2_search_address.html')

def fullscreen_map(request):
    return render(request, 'mapsP2/3_fullscreen_map.html')

def description_map(request):
    return render(request, 'mapsP2/4_description_map.html')

def current_location(request):
    return render(request, 'mapsP2/5_current_location.html')

def story_map(request):
    return render(request, 'mapsP2/6_story_map.html')