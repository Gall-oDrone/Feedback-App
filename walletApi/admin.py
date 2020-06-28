
from django.contrib import admin
from .models import  Wallet, Transaction, Balance
# admin.site.register(Owner)
# admin.site.register(Debit)
# admin.site.register(Recharge) 
admin.site.register(Wallet)
admin.site.register(Transaction)
admin.site.register(Balance)
admin.site.site_title = 'Virtual Wallet'
admin.site.site_header = 'Virtual Wallet'