# from django.db import models
# import datetime
# from django.contrib.auth.models import Permission, User
# from django.core.validators import RegexValidator
# from django.db import models
# from django.core.validators import MinValueValidator,MaxValueValidator



# # We'll be using BigIntegerField by default instead
# # of DecimalField for simplicity. This can be configured
# # though by setting `WALLET_CURRENCY_STORE_FIELD` in your
# # `settings.py`.
# CURRENCY_STORE_FIELD = models.IntegerField()
# # CURRENCY_STORE_FIELD = getattr(settings,
# #         'WALLET_CURRENCY_STORE_FIELD', models.BigIntegerField)


# class Wallet(models.Model):
#     # We should reference to the AUTH_USER_MODEL so that
#     # when this module is used and a different User is used,
#     # this would still work out of the box.
#     #
#     # See 'Referencing the User model' [1]
#     user = models.ForeignKey(User, default=1,on_delete=models.CASCADE)

#     # This stores the wallet's current balance. Also acts
#     # like a cache to the wallet's balance as well.
#     current_balance = CURRENCY_STORE_FIELD(default=0)

#     # The date/time of the creation of this wallet.
#     created_at = models.DateTimeField(auto_now_add=True)

#     def deposit(self, value):
#         """Deposits a value to the wallet.
#         Also creates a new transaction with the deposit
#         value.
#         """
#         self.transaction_set.create(
#             value=value,
#             running_balance=self.current_balance + value
#         )
#         self.current_balance += value
#         self.save()

#     def withdraw(self, value):
#         """Withdraw's a value from the wallet.
#         Also creates a new transaction with the withdraw
#         value.
#         Should the withdrawn amount is greater than the
#         balance this wallet currently has, it raises an
#         :mod:`InsufficientBalance` error. This exception
#         inherits from :mod:`django.db.IntegrityError`. So
#         that it automatically rolls-back during a
#         transaction lifecycle.
#         """
#         if value > self.current_balance:
#             raise InsufficientBalance('This wallet has insufficient balance.')

#         self.transaction_set.create(
#             value=-value,
#             running_balance=self.current_balance - value
#         )
#         self.current_balance -= value
#         self.save()

#     def transfer(self, wallet, value):
#         """Transfers an value to another wallet.
#         Uses `deposit` and `withdraw` internally.
#         """
#         self.withdraw(value)
#         wallet.deposit(value)


# class Transaction(models.Model):
#     # The wallet that holds this transaction.
#     wallet = models.ForeignKey(Wallet)

#     # The value of this transaction.
#     value = CURRENCY_STORE_FIELD(default=0)

#     # The value of the wallet at the time of this
#     # transaction. Useful for displaying transaction
#     # history.
#     running_balance = CURRENCY_STORE_FIELD(default=0)

#     # The date/time of the creation of this transaction.
#     created_at = models.DateTimeField(auto_now_add=True)


# class Balance(models.Model):
#     user = models.ForeignKey(User, default=1,on_delete=models.CASCADE)
#     amount = models.PositiveIntegerField(default=50, validators=[MaxValueValidator(5000),MinValueValidator(50)])


# class Transfer(models.Model):
#     user = models.ForeignKey(User, default=1,on_delete=models.CASCADE)
#     phone_number = models.CharField(validators=[Main.phone_regex], max_length=10)  # validators should be a list
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