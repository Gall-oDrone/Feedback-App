from django.contrib.auth import get_user_model
from django.db import models
import datetime

User = get_user_model()
status = (("Active","Active"),("Inactive","Inactive"),("Delete","Delete"))
source = (('Website', 'Website'),('Android', 'Android'),('iOS', 'iOS'),('AMP', 'AMP'),('PWA', 'PWA'),('Desktop', 'Desktop'),)
# video_room_status = (("Open", "Open"), ("Close", "Close"), ("Started", "Started"), ("Waiting", "Waiting"))

class Candidates(models.Model):
    candiadtes = models.CharField(max_length=150, blank=True)

class Callers(models.Model):
    caller = models.CharField(max_length=2550, blank=True, null=True)

class Callees(models.Model):
    callee = models.CharField(max_length=2550, blank=True, null=True)
# class Room(models.Model):
#     name = CharField(max_length=16, null=True, blank=True)
#     users = models.ManyToManyField(User, related_name='rooms', through='RoomUsers')
#     disabled = BooleanField(default=False, null=False)

#     @property
#     def is_private(self):
#     	return self.name is None

#     def __unicode__(self):
#     	return self.__str__()

#     def __str__(self):
#     	return "{}/{}".format(self.id, self.name)


# def get_milliseconds(dt=None):
#     if dt is None:
#     	return int(time.time()*1000)
#     if dt.time.timestamp:
#     	return int(dt.time.timestamp()*1000)
#     else:
#     	return mktime(dt.time.timetuple()) * 1000 + int(dt.time.microsecond / 1000)

class Contact(models.Model):
    user = models.ForeignKey(
        User, related_name='friends', on_delete=models.CASCADE)
    friends = models.ManyToManyField('self', blank=True)

    def __str__(self):
        return self.user.username


class Message(models.Model):
    room = models.ForeignKey("Chat", on_delete=models.PROTECT, null=True)
    contact = models.ForeignKey(
        Contact, related_name='contacts', on_delete=models.CASCADE)
    content = models.TextField()
    source = models.CharField(max_length=10, choices=source, default='Website')
    timestamp = models.DateTimeField(auto_now_add=True, editable=False)
    track = models.TextField(blank=True, editable=False)
    status = models.CharField(max_length=10, choices=status, default='Active')

    def __str__(self):
        print()
        return "On {} .{}: {}".format(self.timestamp.strftime("%Y/%m/%d, %H:%M"), self.contact.user.username, self.content)

class Chat(models.Model):
    participants = models.ManyToManyField(
        Contact, related_name='chats', blank=True)
    messages = models.ManyToManyField(Message, blank=True)
    video_disabled = models.BooleanField(default=False, null=False)
    callerCandidates = models.ManyToManyField(Callers, blank=True)
    calleeCandidates = models.ManyToManyField(Callees, blank=True)
    sdp = models.CharField(max_length=2550, blank=True)
    offer = models.CharField(max_length=3000, blank=True)
    answer = models.CharField(max_length=3000, blank=True)
    # def __str__(self):
    #     users = ""
    #     for usr in self.participants.all():
    #         users = users+usr.user.username+", "
    #     return str(users)
    
    def __str__(self):
        return "Room: {}".format(self.pk)

# class RoomUsers(models.Model):
# 	room = models.ForeignKey(Room, models.CASCADE, null=False)
# 	user = models.ForeignKey(User, models.CASCADE, null=False)
# 	last_read_message = models.ForeignKey(Message, models.CASCADE, null=True)
# 	volume = models.IntegerField(default=2, null=False)
# 	notifications = BooleanField(null=False, default=True)

# 	class Meta:  # pylint: disable=C1001
# 		unique_together = ("user", "room")
# 		db_table = ''.join((User._meta.app_label, '_room_users'))

# class IpAddress(models.Model):
#     ip = models.CharField(null=False, max_length=32, unique=True)
#     isp = models.CharField(null=True, max_length=32, blank=True)
#     country_code = models.CharField(null=True, max_length=16, blank=True)
#     country = models.CharField(null=True, max_length=32, blank=True)
#     region = models.CharField(null=True, max_length=32, blank=True)
#     city = models.CharField(null=True, max_length=32, blank=True)
#     lat = models.FloatField(null=True, blank=True)
#     lon = models.FloatField(null=True, blank=True)
#     zip = models.CharField(null=True, max_length=32, blank=True)
#     timezone = models.CharField(null=True, max_length=32, blank=True)

#     def __str__(self):
#     	return self.ip

#     @property
#     def info(self):
#         if self.country is not None:
#         	return "{} {} ({})".format(self.country, self.city, self.isp)
#         else:
#         	return ""


    # class Meta:  # pylint: disable=C1001
    # 	db_table = ''.join((User._meta.app_label, '_ip_address'))


# class UserJoinedInfo(models.Model):
#     ip = models.ForeignKey(IpAddress, models.CASCADE, null=True)
#     user = models.ForeignKey(User, models.CASCADE, null=True)
#     time = models.DateField(default=datetime.datetime.now)

    # class Meta:  # pylint: disable=C1001
    #     db_table = ''.join((User._meta.app_label, '_user_joined_info'))
    #     unique_together = ("user", "ip")