from django.shortcuts import render, redirect
from django.db import DatabaseError
from .models import Name

def name_list(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        if name:
            try:
                Name.objects.create(name=name)
            except DatabaseError:
                return render(request, 'myapp/name_list.html', {'error': 'Database error occurred while saving the name.'})
        return redirect('name_list')

    try:
        names = Name.objects.all()
    except DatabaseError:
        return render(request, 'myapp/name_list.html', {'error': 'Database error occurred while fetching names.'})
    
    return render(request, 'myapp/name_list.html', {'names': names})
