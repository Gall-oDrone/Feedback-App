# from django.contrib.auth.models import User
from users.models import User
from allauth.account.signals import user_signed_up
from allauth.account.models import EmailAddress
from allauth.exceptions import ImmediateHttpResponse
from allauth.socialaccount.adapter import DefaultSocialAccountAdapter

from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.google.provider import GoogleProvider
from .providers import GoogleProviderMod
from .serializers import send_verification_email
# from google.auth.transport import requests
# from google.oauth2 import id_token

class MyAdapter(DefaultSocialAccountAdapter):
    def pre_social_login(self, request, sociallogin):
        print("CANGREJO: ", "user: ", sociallogin.user, ", userId: ", sociallogin.user.id, sociallogin.user.email)
        # This isn't tested, but should work
        print("sociallogin.account.extra_data", sociallogin.account.extra_data)
        print("sociallogin.account.provider", sociallogin.account.provider)
        user = sociallogin.user
        # social account already exists, so this is just a login
        if sociallogin.is_existing:
            print("sociallogin.is_existing")
            return

        email = sociallogin.account.extra_data.get('email', None)
        email_verified = sociallogin.account.extra_data.get('verified_email', False)
        # verify we have a verified email address depending on the provider
        if sociallogin.account.provider == 'facebook':
            if not (email):
                print("not email and email_verified")
                return
        else:
            if not (email and email_verified):
                print("not email and email_verified")
                return

        # check if given email address already exists as a verified email on
        # an existing user's account
        try:
            print("Try existing_email")
            existing_email = EmailAddress.objects.get(email__iexact=email, verified=True)

        except EmailAddress.DoesNotExist:
            print("Except EmailAddress.DoesNotExist" )
            # sociallogin.connect(request, user)
            # send_verification_email(request, sociallogin)
            return

        # if it does, connect this new social login to the existing user
        print("sociallogin.connect")
        sociallogin.connect(request, existing_email.user)
        # send_verification_email(request, sociallogin)
        # except Exception as e:
        #     print("Except: ", e)
        #     pass

class GoogleProviderMod(GoogleProvider):
    def extract_uid(self, data):
        return str(data['sub'])

class GoogleOAuth2AdapterIdToken(GoogleOAuth2Adapter):
    print("LO RERAMIRE")
    provider_id = GoogleProviderMod.id

    def complete_login(self, request, app, token, **kwargs):
        idinfo = id_token.verify_oauth2_token(token.token, requests.Request(), app.client_id)
        if idinfo["iss"] not in ["accounts.google.com", "https://accounts.google.com"]:
            raise ValueError("Wrong issuer.")
        extra_data = idinfo
        login = self.get_provider().sociallogin_from_response(request, extra_data)
        return login


# def pre_social_login(self, request, sociallogin):

#         # social account already exists, so this is just a login
#         if sociallogin.is_existing:
#             return

#         # some social logins don't have an email address
#         if not sociallogin.email_addresses:
#             return

#         # find the first verified email that we get from this sociallogin
#         verified_email = None
#         for email in sociallogin.email_addresses:
#             if email.verified:
#                 verified_email = email
#                 break

#         # no verified emails found, nothing more to do
#         if not verified_email:
#             return

#         # check if given email address already exists as a verified email on
#         # an existing user's account
#         try:
#             existing_email = EmailAddress.objects.get(email__iexact=email.email, verified=True)
#         except EmailAddress.DoesNotExist:
#             return

#         # if it does, connect this new social login to the existing user
#         sociallogin.connect(request, existing_email.user)