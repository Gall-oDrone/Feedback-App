from django.db.models.signals import post_save
from django.conf import settings
from django.db import models
from django.db.models import Sum
from django.shortcuts import reverse
from django_countries.fields import CountryField
from users.models import User, Profile
from sessionsApi.models import Session
from projectsApi.models import Project

CATEGORY_CHOICES = (
    ('S', 'Shirt'),
    ('SW', 'Sport wear'),
    ('OW', 'Outwear'),
    ('SE', 'Session'),
    ('GC', 'Gift Card'),
    ('DO', 'Donation'),
)

LABEL_CHOICES = (
    ('P', 'primary'),
    ('S', 'secondary'),
    ('D', 'danger')
)

ADDRESS_CHOICES = (
    ('B', 'Billing'),
    ('S', 'Shipping'),
)


class UserProfile(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE)
    stripe_customer_id = models.CharField(max_length=50, blank=True, null=True)
    one_click_purchasing = models.BooleanField(default=False)

    def __str__(self):
        return self.user.username

class Item(models.Model):
    title = models.CharField(max_length=100)
    price = models.FloatField()
    discount_price = models.FloatField(blank=True, null=True)
    category = models.CharField(choices=CATEGORY_CHOICES, max_length=2)
    label = models.CharField(choices=LABEL_CHOICES, max_length=1)
    slug = models.SlugField()
    description = models.TextField()
    image = models.ImageField()

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse("core:product", kwargs={
            'slug': self.slug
        })

    def get_add_to_cart_url(self):
        return reverse("core:add-to-cart", kwargs={
            'slug': self.slug
        })

    def get_remove_from_cart_url(self):
        return reverse("core:remove-from-cart", kwargs={
            'slug': self.slug
        })

# class Variation(models.Model):
#     item = models.name = models.ForeignKey(Item, on_delete=models.CASCADE)
#     name = models.CharField(max_length=50)

#     class Meta:
#         unique_together = (
#             ('item', 'name')
#         )

#     def __str__(self):
#         return self.name

# class ItemVariation(models.Model):
#     variation = models.ForeignKey(Variation, on_delete=models.CASCADE)
#     value = models.CharField(max_length=50)
#     attachment = models.ImageField(blank=True)

#     class Meta:
#         unique_together = (
#             ('variation', 'value')
#         )
#     def __str__(self):
#         return self.value

class OrderItem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    ordered = models.BooleanField(default=False)
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    # item_variations = models.ManyToManyField(ItemVariation)
    quantity = models.IntegerField(default=1)

    def __str__(self):
        return f"{self.quantity} of {self.item.title}"

    def get_total_item_price(self):
        return self.quantity * self.item.price

    def get_total_discount_item_price(self):
        return self.quantity * self.item.discount_price

    def get_amount_saved(self):
        return self.get_total_item_price() - self.get_total_discount_item_price()

    def get_final_price(self):
        if self.item.discount_price:
            return self.get_total_discount_item_price()
        return self.get_total_item_price()

class SessionOrderItem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE )
    ordered = models.BooleanField(default=False)
    session = models.ForeignKey(Session, on_delete=models.CASCADE)
    hrs = models.PositiveSmallIntegerField(default=1)
    date = models.DateTimeField(auto_now_add=False, null=True)
    start_time = models.DateTimeField(auto_now_add=False, null=True)
    end_time = models.DateTimeField(auto_now_add=False, null=True)

    def __str__(self):
        return f"{self.user} ordered a session with {self.session.user} on {self.date}"

    def get_total_session_price(self):
        return self.hrs * self.session.price_per_hour
    
    def get_session_user(self):
        return self.session.user
    
    def get_session(self):
        return self.session

class DonationOrderItem(models.Model):
    user = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE )
    donated = models.BooleanField(default=False)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    amount = models.FloatField(default=0)
    date = models.DateTimeField(auto_now_add=False, null=True)

    def __str__(self):
        return f"{self.user} donated ${self.amount} to {self.project.title} project on {self.date}"
    
    def get_project(self):
        return self.project

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    ref_code = models.CharField(max_length=20, blank=True, null=True)
    items = models.ManyToManyField(OrderItem)
    start_date = models.DateTimeField(auto_now_add=True)
    ordered_date = models.DateTimeField()
    ordered = models.BooleanField(default=False)
    payment_successful = models.BooleanField(default=False)
    shipping_address = models.ForeignKey(
        'Address', related_name='shipping_address', on_delete=models.SET_NULL, blank=True, null=True)
    billing_address = models.ForeignKey(
        'Address', related_name='billing_address', on_delete=models.SET_NULL, blank=True, null=True)
    payment = models.ForeignKey(
        'Payment', on_delete=models.SET_NULL, blank=True, null=True)
    coupon = models.ForeignKey(
        'Coupon', on_delete=models.SET_NULL, blank=True, null=True)
    being_delivered = models.BooleanField(default=False)
    received = models.BooleanField(default=False)
    refund_requested = models.BooleanField(default=False)
    refund_granted = models.BooleanField(default=False)

    def __str__(self):
        return self.user.username

    def get_total(self):
        total = 0
        for order_item in self.items.all():
            total += order_item.get_final_price()
        if self.coupon:
            total -= self.coupon.amount
        return total

class SessionOrder(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    ref_code = models.CharField(max_length=20, blank=True, null=True)
    session = models.ManyToManyField(SessionOrderItem)
    ordered_date = models.DateTimeField()
    ordered = models.BooleanField(default=False)
    payment_successful = models.BooleanField(default=False)
    billing_address = models.ForeignKey(
        'Address', related_name='session_billing_address', on_delete=models.SET_NULL, blank=True, null=True)
    payment = models.ForeignKey(
        'Payment', on_delete=models.SET_NULL, blank=True, null=True)
    # coupon = models.ForeignKey(
    #     'Coupon', on_delete=models.SET_NULL, blank=True, null=True)
    refund_requested = models.BooleanField(default=False)
    refund_granted = models.BooleanField(default=False)

    def __str__(self):
        return self.user.username
    
    def get_session_user2(self, pk):
        userId = str
        for s in self.session.all():
            if(s.pk == pk):
                userId = s.get_session_user()
        return userId

    def get_session2(self, pk):
        userId = str
        for s in self.session.all():
            if(s.pk == pk):
                userId = s.get_session()
        return userId

    def get_total(self, pk):
        total = 0
        for s in self.session.all():
            if(s.pk == pk):
                total += s.get_total_session_price()
        # if self.coupon:
        #     total -= self.coupon.amount
        return total

class DonationOrder(models.Model):
    user = models.ForeignKey(User, blank=True, null=True, on_delete=models.CASCADE)
    amount = models.FloatField(default=0)
    ref_code = models.CharField(max_length=20, blank=True, null=True)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    donated_date = models.DateTimeField()
    payment_successful = models.BooleanField(default=False)
    billing_address = models.ForeignKey(
        'Address', related_name='donation_billing_address', on_delete=models.SET_NULL, blank=True, null=True)
    payment = models.ForeignKey(
        'Payment', on_delete=models.SET_NULL, blank=True, null=True)

    def __str__(self):
        return self.user.username

    def get_donation_user(self):
        return self.project.author

class Address(models.Model):
    user = models.ForeignKey(User,
                             on_delete=models.CASCADE)
    street_address = models.CharField(max_length=100)
    apartment_address = models.CharField(max_length=100)
    country = CountryField(multiple=False)
    zip = models.CharField(max_length=100)
    address_type = models.CharField(max_length=1, choices=ADDRESS_CHOICES)
    default = models.BooleanField(default=False)

    def __str__(self):
        return self.user.username

    class Meta:
        verbose_name_plural = 'Addresses'


class Payment(models.Model):
    stripe_charge_id = models.CharField(max_length=100)
    user = models.ForeignKey(User,
                             on_delete=models.SET_NULL, blank=True, null=True)
    amount = models.FloatField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username


class Coupon(models.Model):
    code = models.CharField(max_length=15)
    amount = models.FloatField()

    def __str__(self):
        return self.code


class Refund(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    reason = models.TextField()
    accepted = models.BooleanField(default=False)
    email = models.EmailField()

    def __str__(self):
        return f"{self.pk}"


def userprofile_receiver(sender, instance, created, *args, **kwargs):
    if created:
        userprofile = UserProfile.objects.create(user=instance)


post_save.connect(userprofile_receiver, sender=settings.AUTH_USER_MODEL)