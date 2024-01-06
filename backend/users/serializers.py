from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password

UserModel = get_user_model()


class RegisterUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = (UserModel.USERNAME_FIELD, "password")

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data.pop("password")

        return data

    def save(self, **kwargs):
        user = super().save(**kwargs)

        user.set_password(user.password)
        user.save()

        return user

    def validate(self, attrs):
        password = attrs.get("password", None)
        validate_password(password)

        return attrs
