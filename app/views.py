from django.shortcuts import render, redirect
from .models import Name

def name_list(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        if name:
            Name.objects.create(name=name)
        return redirect('name_list')

    names = Name.objects.all()
    return render(request, 'app/name_list.html', {'names': names})
