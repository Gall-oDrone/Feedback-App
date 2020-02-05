from django.db import models
from django.config import settings
from django.db.models.signals import post_save
from users.models import User

class Profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL)
    slug = models.SlugField()
    friends = models.ManyToManyField("Profile", blank=True)

    def __str__(self):
        return str(self.user.username)
    
    def get_absolute_url(self):
        return "/user/{}".format(self.slug)

def post_save_user_model_receiver(sender, instance, created, *args, **kwargs):
    if created:
        try:
            Profile.objects.create(user=instance)
        except:
            pass
post_save.connect(post_Save_user_model_receiver), sender=settings.AUTH_USER_MODEL

class FriendRequest(models.Model):
    to_user = models.ForeignKey(settingS.AUTH_USER_MODEL, related_name="to_user")
    from_user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="from_user")
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "From {}, to {}".format(self.form_user.username, self.to_user.username)