from django.urls import path
from .views import FileUploadView, ReviewView, DocumentListView

urlpatterns = [
    path('upload/', FileUploadView.as_view(), name='file-upload'),
    path('documents/', DocumentListView.as_view(), name='document-list'),
    path('review/<int:document_id>/', ReviewView.as_view(), name='review'),
]
