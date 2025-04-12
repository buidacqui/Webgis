#from django.http import HttpResponse
from django.shortcuts import render
#HttpResponse: Dùng để trả về dữ liệu dạng chuỗi (text, HTML, JSON...).
#render: Dùng để render (kết xuất) một file HTML template, truyền dữ liệu từ view sang template.

def homepage(request):
    #return HttpResponse("xin chào")
    return render(request, 'home.html')
    # Django tìm file home.html trong thư mục templates/.
def aboutpage(request):
    #return HttpResponse("Đây là trang giới thiệu")
    return render(request, 'about.html')
def map_view(request):
    return render(request, 'index.html')
def routing(request):
    return render(request, 'routing.html')