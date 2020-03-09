from django.contrib.sites.models import Site
from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save
from django_countries.fields import CountryField

class User(AbstractUser):
    is_student = models.BooleanField()
    is_teacher = models.BooleanField()
    university = models.CharField(max_length=70, blank=True)
    partners = models.CharField(max_length=30, blank=True, null=True)
    website = models.CharField(max_length=60, blank=True, null=True)

    def __str__(self):
        return self.username

class Universities(models.Model):
    MIT = 'Massachusetts Institute of Technology'
    CAMBRIDGE = 'University of Cambridge'
    OXFORD = 'University of Oxford'
    STANDFORD = 'Stanford University'
    DUKE = "Duke University"
    CIDE = "Center of Teaching and Research in Economics"
    ITAM = "Instituto Tecnológico Autónomo de México"
    COLMEX = "El Colegio de México"
    TEC = "Instituto Tecnológico y de Estudios Superiores de Monterrey"
    IBERO = "Universidad Iberoamericana"
    OTHER = 'other'
    UNIVERSITIES = [
        (MIT, ('Massachusetts Institute of Technology')),
        (CAMBRIDGE, ('University of Cambridge')),
        (OXFORD, ('University of Oxford')),
        (STANDFORD, ('Stanford University')),
        (DUKE, ("Duke University")),
        (CIDE, ("Center of Teaching and Research in Economics")),
        (ITAM, ("Instituto Tecnológico Autónomo de México")),
        (COLMEX, ("El Colegio de México")),
        (TEC, ("Instituto Tecnológico y de Estudios Superiores de Monterrey")),
        (IBERO, ("Universidad Iberoamericana")),
        (OTHER, ('other'))
    ]
    university=models.CharField(max_length=100, choices=UNIVERSITIES, blank=True)

    def __str__(self):
        return self.university


class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username

class Partners(models.Model):
    partner_email = models.CharField(max_length=30, blank=True, null=True)
    def __str__(self):
        return self.partner_email

class School(models.Model):
    school = models.CharField(max_length=60, blank=True, null=True)
    def __str__(self):
        return self.school

class Website(models.Model):
    website = models.CharField(max_length=60, blank=True, null=True)
    def __str__(self):
        return self.website

class ChatGroup(models.Model):
    group_id = models.CharField(max_length=100)
    name = models.CharField(max_length=100, blank=True, null=True)
    group_admin = models.ForeignKey(User, on_delete=models.CASCADE, related_name="grpadmin")

    def __str__(self):
        return self.chatgroupid

class ChatGroupUser(models.Model):
    groupuser = models.ForeignKey(Student, on_delete=models.CASCADE)
    chat_group = models.ForeignKey(ChatGroup, on_delete=models.CASCADE)

    def __str__(self):
        return self.groupuser.username

class Profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    slug = models.SlugField()
    profile_avatar = models.ImageField(upload_to="profileAvatar/", blank=True)
    friends = models.ManyToManyField("Profile", blank=True)
    notifications = models.ManyToManyField("MeetingRequest", blank=True)
    notification_counter = models.IntegerField(default=0)

    def __str__(self):
        return str(self.user.username)

    def get_absolute_url(self):
    	return "/users/{}".format(self.slug)


    def post_save_user_model_receiver(sender, instance, created, *args, **kwargs):
        if created:
            try:
                Profile.objects.create(user=instance)
            except:
                pass
    post_save.connect(post_save_user_model_receiver, sender=settings.AUTH_USER_MODEL)

class ProfileInfo(models.Model):
    profile_username = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100, blank=True, null=True)
    country = CountryField(blank_label='(select country)')
    university = models.ForeignKey(Universities, on_delete=models.CASCADE, related_name="profile_university")
    graduate = models.BooleanField(default=False)
    undergraduate = models.BooleanField(default=False)
    work_experience = models.BooleanField(default=False)
    website = models.CharField(max_length=50, blank=True, null=True)
    message = models.CharField(max_length=150, blank=True, null=True)
    # Position
    # Responsibilities
    # Department
    # Skills
    github = models.CharField(max_length=50, blank=True, null=True)
    # degree = models.CharField(max_length=100, blank=True, null=True)
    # major = models.CharField(max_length=100, blank=True, null=True)
    # experience = models.CharField(max_length=100, blank=True, null=True)
    # projects = models.ManyToManyField("Article")
    def __str__(self):
        return "{} profile info".format(self.profile_username.username)

class FriendRequest(models.Model):
    to_user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='to_user', on_delete=models.CASCADE)
    from_user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='from_user', on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True) # set when created 

    def __str__(self):
        return "From {}, to {}".format(self.from_user.username, self.to_user.username)

class MeetingRequest(models.Model):
	to_user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='meeting_request_to_user', on_delete=models.CASCADE)
	from_user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='meeting_request_from_user', on_delete=models.CASCADE)
	timestamp = models.DateTimeField(auto_now_add=True) # set when created 

	def __str__(self):
		return "LC Request From {}, to {}".format(self.from_user.username, self.to_user.username)