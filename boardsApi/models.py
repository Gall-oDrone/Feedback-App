from django.db import models
from django.conf import settings

class Board_types(models.Model):
    PUBLIC = 'public'
    PRIVATE = 'private'
    CHOICES = [
        (PUBLIC, ('Public')),
        (PRIVATE, ('Private')),
    ]
    board_type=models.CharField(max_length=15, choices=CHOICES, blank=True)

    def __str__(self):
        return self.board_type

class Board(models.Model):
    title = models.CharField(max_length=60)
    # color = models.CharField(max_length=10)
    board_type = models.ForeignKey(Board_types, null=True, on_delete=models.CASCADE)
    createdAt = models.DateTimeField(auto_now_add=True, null=True)
    background_image = models.ImageField(upload_to="boards/images/background/", blank=True)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)

class BoardDetail(models.Model):
    board = models.ForeignKey(Board, null=True, related_name="boardFK", on_delete=models.CASCADE)
    title = models.CharField(max_length=60)
    boardCard = models.ManyToManyField("Cards")
    order = models.SmallIntegerField(default=0)

class Cards(models.Model):
    boardD = models.ForeignKey(BoardDetail, null=True, related_name="boardDFK", on_delete=models.CASCADE)
    title = models.CharField(max_length=60)
    order = models.SmallIntegerField(default=0)
    members = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name="card_memebers")
    Tag = models.ManyToManyField("CardTag")
    Files = models.ManyToManyField("CardFiles")
    expiration_date = models.DateTimeField(auto_now_add=False, null=True)
    remainder_date = models.DateTimeField(auto_now_add=False, null=True)
    following = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name="card_followers")
    description = models.TextField()
    checklist = models.ManyToManyField("CardChecklist")
    comments = models.ManyToManyField("CardComments")

class CardTag(models.Model):
    card = models.ForeignKey(Cards, null=True, related_name="cardTagFK", on_delete=models.CASCADE)
    title = models.CharField(max_length=60)
    color = models.CharField(max_length=60)

class CardFiles(models.Model):
    card = models.ForeignKey(Cards, null=True, related_name="cardFilesFK", on_delete=models.CASCADE)
    File = models.FileField(upload_to="boards/files/", blank=True)
    timestamp = models.DateTimeField(auto_now_add=True, null=True)

class CardChecklist(models.Model):
    card = models.ForeignKey(Cards, null=True, related_name="cardChecklistFK", on_delete=models.CASCADE)
    title = models.CharField(max_length=60)
    task = models.ManyToManyField("CardChecklistTask")
    timestamp = models.DateTimeField(auto_now_add=True, null=True)

class CardComments(models.Model):
    card = models.ForeignKey(Cards, null=True, related_name="cardCommFK", on_delete=models.CASCADE)
    comment = models.TextField()
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)
    timestamp = models.DateTimeField(auto_now_add=True, null=True)

class CardChecklistTask(models.Model):
    card_checklist = models.ForeignKey(CardChecklist, null=True, related_name="CheckListFK", on_delete=models.CASCADE)
    description = models.TextField()
    assignee = models.ManyToManyField(settings.AUTH_USER_MODEL)
    completed = models.BooleanField(default=False)
    expiration_date = models.DateTimeField(auto_now_add=False, null=True)
    timestamp = models.DateTimeField(auto_now_add=True, null=True)