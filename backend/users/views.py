from rest_framework.authtoken import views
from rest_framework import generics
from rest_framework.relations import Resolver404
from .serializers import RegisterUserSerializer
from rest_framework.response import Response


class LoginUserView(views.ObtainAuthToken):
    pass


class RegisterUserView(generics.CreateAPIView):
    serializer_class = RegisterUserSerializer


class LogoutUserView(generics.views.APIView):
    def post(self, request, *args, **kwargs):
        return self.__perform_logout(request)

    def get(self, request, *args, **kwargs):
        return self.__perform_logout(request)

    @staticmethod
    def __perform_logout(request):
        request.user.auth_token.delete()
        return Response({"message": "user logged out"})
