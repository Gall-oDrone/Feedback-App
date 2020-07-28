# from django.contrib.auth.models import User
from users.models import User
from allauth.account.signals import user_signed_up
from allauth.account.models import EmailAddress
from allauth.exceptions import ImmediateHttpResponse
from allauth.socialaccount.adapter import DefaultSocialAccountAdapter


class MyAdapter(DefaultSocialAccountAdapter):
    def pre_social_login(self, request, sociallogin):
        # This isn't tested, but should work
        user = sociallogin.user
        if user.id:
            print("not id")
            return
        if not user.email:
            print("not email")
            return
        try:
            # print("LA RATA 2: ", sociallogin.email_addresses)
            # print("LA RATA 3: ", sociallogin.user, type(sociallogin.user), sociallogin.user.id, sociallogin.user.email, type(sociallogin.user.email), sociallogin.user.email == "")
            user = User.objects.get(email=sociallogin.user.email)
            sociallogin.state['process'] = 'connect'                
            perform_login(request, user, 'none')
            # sociallogin.connect(request, user)
            # Create a response object
            # raise ImmediateHttpResponse(response)
        except User.DoesNotExist:
            pass




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