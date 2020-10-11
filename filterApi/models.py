from django.db import models

class Author(models.Model):
    name = models.CharField(max_length=30)

    def __str__(self):
        return self.name

class Category(models.Model):
    name = models.CharField(max_length=20)

    def __str__(self):
        return self.name

class Journal(models.Model):
    title = models.CharField(max_length=60)
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
    categories = models.ManyToManyField(Category)
    publish_date = models.DateTimeField(auto_now_add=False)
    views = models.IntegerField(default=0)
    reviewed = models.BooleanField(default=False)

    def __str__(self):
        return self.title

class GlobalQuerySet(models.QuerySet):
    def search(self, query=None):
        qs = self
        print("DRAKE 0: ", qs)
        if query is not None:
            or_lookup = (
                            # models.Q(user__username__icontains=query) |
                            models.Q(title__icontains=query)
                            # models.Q(description__icontains=query) |
                            # models.Q(slug__icontains=query)
                        )
            qs = qs.filter(or_lookup).distinct()
            print("DRAKE: ", qs)
        return qs

class GlobalManager(models.Manager):
    def get_queryset(self):
        return GlobalQuerySet(self.model, using=self._db)
    
    def search(self, query=None):
        return self.get_queryset().search(query=query)