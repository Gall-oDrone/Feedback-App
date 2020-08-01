from django.db import models
import datetime
from django.contrib.auth.models import Permission
from django.core.validators import RegexValidator
from django.db import models
from django.core.validators import MinValueValidator,MaxValueValidator
from users.models import User



# We'll be using BigIntegerField by default instead
# of DecimalField for simplicity. This can be configured
# though by setting `WALLET_CURRENCY_STORE_FIELD` in your
# `settings.py`.
CURRENCY_STORE_FIELD = models.IntegerField(default=0)
# CURRENCY_STORE_FIELD = getattr(settings,
#         'WALLET_CURRENCY_STORE_FIELD', models.BigIntegerField)


class Wallet(models.Model):
    # We should reference to the AUTH_USER_MODEL so that
    # when this module is used and a different User is used,
    # this would still work out of the box.
    #
    # See 'Referencing the User model' [1]
    # user = models.ForeignKey(User, default=1,on_delete=models.CASCADE)

    # This stores the wallet's current balance. Also acts
    # like a cache to the wallet's balance as well.
    current_balance = CURRENCY_STORE_FIELD

    # The date/time of the creation of this wallet.
    created_at = models.DateTimeField(auto_now_add=True)

    def deposit(self, value):
        """Deposits a value to the wallet.
        Also creates a new transaction with the deposit
        value.
        """
        self.transaction_set.create(
            value=value,
            running_balance=self.current_balance + value
        )
        self.current_balance += value
        self.save()

    def withdraw(self, value):
        """Withdraw's a value from the wallet.
        Also creates a new transaction with the withdraw
        value.
        Should the withdrawn amount is greater than the
        balance this wallet currently has, it raises an
        :mod:`InsufficientBalance` error. This exception
        inherits from :mod:`django.db.IntegrityError`. So
        that it automatically rolls-back during a
        transaction lifecycle.
        """
        if value > self.current_balance:
            raise InsufficientBalance('This wallet has insufficient balance.')

        self.transaction_set.create(
            value=-value,
            running_balance=self.current_balance - value
        )
        self.current_balance -= value
        self.save()

    def transfer(self, wallet, value):
        """Transfers an value to another wallet.
        Uses `deposit` and `withdraw` internally.
        """
        self.withdraw(value)
        wallet.deposit(value)


class Transaction(models.Model):
    # The wallet that holds this transaction.
    wallet = models.ForeignKey(Wallet, on_delete=models.CASCADE)
    user = models.ForeignKey(User, null=True, blank=True, default=1,on_delete=models.CASCADE)
    # The value of this transaction.
    value = models.IntegerField(default=0)

    # The value of the wallet at the time of this
    # transaction. Useful for displaying transaction
    # history.
    running_balance = models.IntegerField(default=0)

    # The date/time of the creation of this transaction.
    created_at = models.DateTimeField(auto_now_add=True)


class Balance(models.Model):
    user = models.ForeignKey(User, null=True, blank=True, default=1, on_delete=models.CASCADE)
    amount = models.PositiveIntegerField(default=50, validators=[MaxValueValidator(5000),MinValueValidator(50)])


# class Transfer(models.Model):
#     user = models.ForeignKey(User, default=1,on_delete=models.CASCADE)
#     phone_number = models.CharField(max_length=10)  # validators should be a list
#     transfer_amount = models.PositiveIntegerField(default=10, validators=[MaxValueValidator(5000),MinValueValidator(10)])
#     timestamp = models.DateTimeField(auto_now=False, auto_now_add=True)

#     def __str__(self):
#         return str(self.transfer_amount)

#     class Meta:
#         ordering = ["-timestamp"]


# class ReceivedAmount(models.Model):
#     user = models.ForeignKey(User, default=1,on_delete=models.CASCADE)
#     rec_name = models.CharField(max_length=30)
#     rec_amount = models.PositiveIntegerField(default=100, validators=[MaxValueValidator(5000)])
#     timestamp = models.DateTimeField(auto_now=False, auto_now_add=True)

#     def __str__(self):
#         return str(self.rec_amount)

#     class Meta:
#         ordering = ["-timestamp"]

# from django.db import models
# import datetime
# from django.contrib.auth import get_user_model
# from django.contrib.auth.models import Permission
# from users.models import User
# from django.core.validators import RegexValidator
# from django.db import models
# from django.core.validators import MinValueValidator,MaxValueValidator


# class Main( ):
#     TYPES = (
#         ('PREPAID', 'PREPAID'),
#         ('POSTPAID', 'POSTPAID')
#     )
#     OPERATORS = (
#         ('RELIANCE', 'RELIANCE'),
#         ('TATA DOCOMO', 'TATA DOCOMO'),
#         ('VODAFONE', 'VODAFONE'),
#         ('IDEA', 'IDEA'),
#         ('MTNL', 'MTNL'),
#         ('AIRCEL', 'AIRCEL'),
#         ('AIRTEL', 'AIRTEL'),
#         ('MTS', 'MTS')
#     )
#     CIRCLES = (
#         ('MUMBAI', 'MUMBAI'),
#         ('DELHI', 'DELHI'),
#         ('GUJARAT', 'GUJARAT'),
#         ('HARYANA', 'HARYANA'),
#         ('KOLKATA', 'KOLKATA'),
#         ('PUNJAB', 'PUNJAB'),
#         ('RAJASTHAN', 'RAJASTHAN'),
#         ('TAMILNADU', 'TAMILNADU'),
#         ('KERALA', 'KERALA'),
#         ('JAMMU AND KASHMIR', 'JAMMU AND KASHMIR'),

#     )
#     PLANS = (
#         (10, 'Topup Rs.10, Talktime:Rs. 7.73, Validity: NA'),
#         (20, 'Topup Rs.20, Talktime:Rs. 15.47, Validity: NA'),
#         (30, 'Topup Rs.30, Talktime:Rs. 23.2, Validity: NA'),
#         (50, 'Topup Rs.50, Talktime:Rs. 40.67, Validity: NA'),
#         (58, 'Rs.58, Full Talktime + 250MB 3G Data'),
#         (101, 'Rs.101, Full Talktime + All Local calls @1p/s'),
#         (150, 'Rs.150, Full Talktime + 100 local sms'),
#         (19, 'Rs.19, 2G Data 100MB, Validity: 3 days'),
#         (52, 'Rs.52, 2G Data 100MB, Validity: 7 days'),
#         (93, 'Rs.93, 2G Data 500MB, Validity: 7 days'),
#         (127, 'Rs.127, 2G Data 1GB, Validity: 21 days'),
#         (222, 'Rs.222, 3G Data 1GB, Validity: 28 days'),
#         (247, 'Rs.247, 3G Data 1GB + Rs.30 TT, Validity: 28 days'),
#     )
#     EXPIRE = (
#         (2017, '2017'),
#         (2018, '2018'),
#         (2019, '2019'),
#         (2020, '2020'),
#         (2021, '2021'),
#         (2022, '2022'),
#         (2023, '2023'),
#         (2024, '2024'),
#         (2024, '2024'),
#         (2026, '2026'),
#         (2027, '2027'),
#         (2028, '2028'),
#         (2029, '2029'),
#         (2030, '2030'),
#     )
#     phone_regex = RegexValidator(regex=r'^[789]\d{9}$', message="Numeric Field. Only 10 digits allowed.")
#     debit_regex = RegexValidator(regex=r'^\+?1?\d{12}$', message="Numeric Field. Only 12 digits allowed.")
#     cvv_regex = RegexValidator(regex=r'^\+?1?\d{3}$', message="Numeric Field. Only 3 digits allowed.")


# class Debit(models.Model, Main):
#     user = models.ForeignKey(User, default=1,on_delete=models.CASCADE)
#     debitNumber = models.CharField(validators=[Main.debit_regex], max_length=12, unique=True)
#     dbalance = models.PositiveIntegerField(default=10000)
#     expiration = models.IntegerField(choices=Main.EXPIRE)
#     cvv = models.CharField(validators=[Main.cvv_regex], max_length=3)

#     def __str__(self):
#         return str(self.debitNumber)


# class Owner(models.Model, Main):
#     user = models.OneToOneField(User, default=1,on_delete=models.CASCADE)
#     phone_number = models.CharField(validators=[Main.phone_regex], max_length=10, unique=True)
#     balance = models.PositiveIntegerField(default=50)
#     first_name = models.CharField(max_length=15)
#     last_name = models.CharField(max_length=15)
#     timestamp = models.DateTimeField(auto_now=False, auto_now_add=True)

#     def __str__(self):
#         return self.first_name+' '+self.last_name

#     class Meta:
#         ordering = ["-timestamp"]


# # class Recharge(models.Model, Main):
# #     user = models.ForeignKey(User, default=1,on_delete=models.CASCADE)
# #     phone_number = models.CharField(validators=[Main.phone_regex], max_length=10) # validators should be a list
# #     type = models.CharField(choices=Main.TYPES, max_length=10)
# #     operator = models.CharField(choices=Main.OPERATORS, max_length=15)
# #     circle = models.CharField(choices=Main.CIRCLES, max_length=20)
# #     plan = models.IntegerField(choices=Main.PLANS)
# #     timestamp = models.DateTimeField(auto_now=False, auto_now_add=True)

# #     def __str__(self):
# #         return self.phone_number

# #     class Meta:
# #         ordering = ["-timestamp"]


# class Balance(models.Model):
#     user = models.ForeignKey(User, default=1,on_delete=models.CASCADE)
#     amount = models.PositiveIntegerField(default=50, validators=[MaxValueValidator(5000),MinValueValidator(50)])


# class Transfer(models.Model, Main):
#     user = models.ForeignKey(User, default=1,on_delete=models.CASCADE)
#     phone_number = models.CharField(validators=[Main.phone_regex], max_length=10)  # validators should be a list
#     transfer_amount = models.PositiveIntegerField(default=10, validators=[MaxValueValidator(5000),MinValueValidator(10)])
#     timestamp = models.DateTimeField(auto_now=False, auto_now_add=True)

#     def __str__(self):
#         return str(self.transfer_amount)

#     class Meta:
#         ordering = ["-timestamp"]


# class ReceivedAmount(models.Model, Main):
#     user = models.ForeignKey(User, default=1,on_delete=models.CASCADE)
#     rec_name = models.CharField(max_length=30)
#     rec_amount = models.PositiveIntegerField(default=100, validators=[MaxValueValidator(5000)])
#     timestamp = models.DateTimeField(auto_now=False, auto_now_add=True)

#     def __str__(self):
#         return str(self.rec_amount)

#     class Meta:
#         ordering = ["-timestamp"]


# class CodeSent(models.Model):
#     user = models.OneToOneField(User, default=1,on_delete=models.CASCADE)
#     sent_code = models.CharField(max_length=40)

#     def __str__(self):
#         return self.sent_code


# class CodeReceived(models.Model):
#     user = models.OneToOneField(User, default=1)
#     verification_code = models.CharField(max_length=40)

#     def __str__(self):
#         return self.verification_code