from django.contrib.auth import authenticate, login
from django.contrib.auth import logout
from django.shortcuts import render,render_to_response
from .models import Wallet, Transaction, Balance
from django.db.models import F
from django.core.mail import send_mail
from django.http import Http404, JsonResponse, HttpResponse
import random
import string
import requests
import json

import os
from django.db.models import Count, Q, Sum
from django.shortcuts import get_object_or_404, redirect, reverse
from django.core import serializers
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.response import Response
from rest_framework.status import(
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST
)
from rest_framework import permissions
from users.models import User, MeetingRequest, Profile
from .serializers import WalletSerializer, WalletTransactionListSerializer, WalletListDetailSerializer
from rest_framework.views import APIView
from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    CreateAPIView,
    DestroyAPIView,
    RetrieveUpdateDestroyAPIView
)

class WalletCreateView(CreateAPIView):
    # model = Wallet
    queryset = Wallet.objects.all()
    print("queryset WalletCreateView")
    print(queryset)
    serializer_class = WalletSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        print("request from WalletCreateView")
        serializer = WalletSerializer(data=request.data)
        serializer.is_valid()
        create_lcrequest = serializer.create(request)
        post_data = request.data
        if create_lcrequest:
            #NOTIFICATION
            if "recipient" in request.data:
                userId = User.objects.get(username=request.data["user"]).id
                print(self.request.data.get(recipient))
            else:
                userId = User.objects.get(username=request.data["user"]).id
            print("userId after validation")
            print(userId)
            notify = Notification()
            notify.user = User.objects.get(id=userId)
            notify.actor = self.request.data.get("buyer")[0]
            notify.verb = "Sent"
            notify.action = "Wallet Offered"
            notify.target = "1"
            notify.description = "Wallet Offered NTFN"
            notify.save()
            notification_counter = Profile.objects.update_or_create(
                user_id=userId,
                defaults={"notification_counter": MeetingRequest.objects.filter(
                    to_user=userId)
                    .count(),
                }
            )

            return Response(status=HTTP_201_CREATED)
        return Response(status=HTTP_400_BAD_REQUEST)

class WalletTransactionListView(ListAPIView):
    # model = Wallet
    queryset = Transaction.objects.all()
    print("queryset List view")
    print(queryset)
    serializer_class = WalletTransactionListSerializer
    permission_classes = (permissions.AllowAny,)

    def get_object(self):
        try:
            print("LCWalletUserListView")
            username = self.kwargs.get('username')
            userId = User.objects.get(username=username).id
            TransList = Transaction.objects.filter(user=userId)
            return TransList
        except ObjectDoesNotExist:
            raise Http404("You do not have an active order")
            return Response({"message": "You do not have an active order"}, status=HTTP_400_BAD_REQUEST)


class WalletBalanceView(RetrieveUpdateDestroyAPIView):
    queryset = Wallet.objects.all()
    serializer_class = WalletBalanceSerializer
    permission_classes = (permissions.AllowAny,)
    print(queryset.values())

    def get_object(self):
        try:
            print("LCWalletUserListView")
            username = self.kwargs.get('username')
            userId = User.objects.get(username=username).id
            walletBalance = Wallet.objects.get(user=userId).current_balance
            return walletBalance
        except ObjectDoesNotExist:
            raise Http404("You do not have an active order")
            return Response({"message": "You do not have an active order"}, status=HTTP_400_BAD_REQUEST)
    
    def update(self, request):
        try:
            username = self.kwargs.get('username')
            userId = User.objects.get(username=username).id
            wallet = Wallet.objects.get(user=userId)
            target_wallet = Wallet.objects.get(user=request.data["target"])

            if (request.data["type"] == "transfer"):
                wallet.transfer(self.wallet, request.data["value"])
                return
            else:
                wallet.withdrawl(request.data["value"])
                return 
        except ObjectDoesNotExist:
            return Response({"message": "You do not have an active order"}, status=HTTP_400_BAD_REQUEST)

            


# class WalletBalanceView(UpdateAPIView):
#     queryset = Wallet.objects.all()
#     serializer_class = WalletTransactionSerializer
#     permission_classes = (permissions.AllowAny,)
#     print(queryset.values())

#     def get_object(self):
#         try:
#             print("LCWalletUserListView")
#             username = self.kwargs.get('username')
#             userId = User.objects.get(username=username)
#             walletList = Wallet.objects.filter(buyer=userId.id)
#             print(walletList)
#             return walletList
#         except ObjectDoesNotExist:
#             raise Http404("You do not have an active order")
#             return Response({"message": "You do not have an active order"}, status=HTTP_400_BAD_REQUEST)


# def ConfirmationAccountMail(request,emailto,usrname,passwrd):
#     allowed_chars = ''.join((string.ascii_lowercase, string.ascii_uppercase, string.digits))
#     unique_id = ''.join(random.choice(allowed_chars) for _ in range(8)).upper()
#     code = CodeSent.objects.filter(user = request.user).create(sent_code = unique_id)
#     code.user=request.user
#     code.save()
#     content = 'Hello, '+usrname + '\nThanks For Signing Up On Virtual Wallet\nUsername :' +usrname+'\nVerification Code: '+unique_id+'\n\nAbout Virtual Wallet:\n\n'+'Virtual wallet is a web platform or system where user will be able to maintain his wallet\nand he will be able to use his wallet money to recharge his mobile and can\neven transfer funds/wallet balance to other users.\nYou will also be able to add money to wallet through debit card.\n\nWe hope everything goes well, and once again, if you need help, please dont hesitate to get in touch.\n\nContact us: care@virtualwallet.com\n\nRoom No: 605,TE COMPS\nSardar Patel Institute Of Technology\nAndheri West, Mumbai - 4000 05'
#     send_mail("Welcome To Virtual Wallet!",content, "(Virtual Wallet) Virtual Wallet virtualwalletuser@gmail.com", [emailto])


# def index(request):
#     return render_to_response('wallet/index.html', locals(), context_instance=RequestContext(request))

# def under_construction(request):
#     return render_to_response('wallet/under_construction.html', locals(), context_instance=RequestContext(request))


# def developers(request):
#     return render_to_response('wallet/developers.html', locals(), context_instance=RequestContext(request))


# def aboutus(request):
#     return render_to_response('wallet/about_us.html', locals(), context_instance=RequestContext(request))


# def contactus(request):
#     return render_to_response('wallet/contact_us.html', locals(), context_instance=RequestContext(request))


# def termsandconditions(request):
#     return render_to_response('wallet/tc.html', locals(), context_instance=RequestContext(request))


# def login_user(request):
#     if not request.user.is_authenticated():
#         if request.method == "POST":
#             username = request.POST['username']
#             password = request.POST['password']
#             user = authenticate(username=username, password=password)
#             if user is not None:
#                 if user.is_active:
#                     login(request, user)
#                     owners = Owner.objects.filter(user=request.user)
#                     debits = Debit.objects.filter(user=request.user)
#                     code_rec = CodeReceived.objects.filter(user=request.user)
#                     return render(request, 'wallet/home_user.html', {'owners': owners, 'debits': debits,'code_rec':code_rec})
#                 else:
#                     return render(request, 'wallet/login_user.html', {'error_message': 'Your account has been disabled'})
#             else:
#                 return render(request, 'wallet/login_user.html', {'error_message': 'Invalid login'})
#         return render(request, 'wallet/login_user.html')
#     else:
#         return render(request, 'wallet/index.html')


# def register_user(request):
#     form = UserReg(request.POST or None)
#     if form.is_valid():
#         user = form.save(commit=False)
#         username = form.cleaned_data['username']
#         password = form.cleaned_data['password']
#         email = form.cleaned_data['email']
#         user.set_password(password)
#         user.save()
#         user = authenticate(username=username, password=password)
#         if user is not None:
#             if user.is_active:
#                 login(request, user)
#                 owners = Owner.objects.filter(user=request.user)
#                 ConfirmationAccountMail(request,email,username,password)
#                 return render(request, 'wallet/my_wallet.html', {'owners': owners})
#     context = {
#         "form": form,
#     }
#     return render(request, 'wallet/register_user.html', context)


# def add_user_details(request):
#     if not request.user.is_authenticated():
#         return render(request, 'wallet/login_user.html')
#     else:
#         code_rec = CodeReceived.objects.filter(user=request.user)
#         owners = Owner.objects.filter(user=request.user)
#         form = OwnerInfo(request.POST or None)
#         if form.is_valid():
#             owner = form.save(commit=False)
#             owner.user = request.user
#             owner.save()
#             return render(request, 'wallet/my_wallet.html', {'owner': owner, 'owners': owners,'code_rec':code_rec})
#         context = {
#             "form": form,
#             'code_rec':code_rec,
#         }
#         return render(request, 'wallet/add_user_details.html', context)


# def recharge(request):
#     if not request.user.is_authenticated():
#         return render(request, 'wallet/login_user.html')
#     else:
#         code_rec = CodeReceived.objects.filter(user=request.user)
#         owners = Owner.objects.filter(user=request.user)
#         debits = Debit.objects.filter(user=request.user)
#         user=request.user
#         emailid=user.email
#         recNum = Recharge.objects.filter(user=request.user).__len__() + 1
#         form = RechargeForm(request.POST or None)
#         for owner in owners:
#             bal = owner.balance
#             fname=owner.first_name
#         if form.is_valid():
#             owner = form.save(commit=False)
#             plan = form.cleaned_data['plan']
#             mob = form.cleaned_data['phone_number']
#             if plan > bal:
#                 return render(request, 'wallet/recharge_unsuccessful.html',{'debits':debits})
#             elif recNum % 5 == 0:
#                 Owner.objects.filter(id__in=owners).update(balance=F('balance') + 20)
#                 Owner.objects.filter(id__in=owners).update(balance=F('balance') - plan)
#                 owner.user = request.user
#                 owner.save()
#                 send_mail("Recharge Confirmation!",'Hello, '+fname+'\nRecharge of Rs.'+str(plan)+' was successful on mobile number '+mob+'\nUpdated Wallet Balance :Rs.'+str(bal-plan+20)+'\n\n\nContact us: care@virtualwallet.com\n\nRoom No: 605,TE COMPS\nSardar Patel Institute Of Technology\nAndheri West, Mumbai - 4000 058', "(Virtual Wallet) Virtual Wallet virtualwalletuser@gmail.com", [emailid])
#                 send_mail("You Received Cashback Of Rs.20",'Hello, '+fname+'\nRs.'+str(20)+' added to your wallet\nRecharge 5 More Times To Get Another Cashback Of Rs.20  \nUpdated Wallet Balance :Rs.'+str(bal-plan+20)+'\n\n\nContact us: care@virtualwallet.com\n\nRoom No: 605,TE COMPS\nSardar Patel Institute Of Technology\nAndheri West, Mumbai - 4000 058', "(Virtual Wallet) Virtual Wallet virtualwalletuser@gmail.com", [emailid])
#                 return render(request, 'wallet/cashback.html', {'owner': owner, 'owners': owners, 'plan':plan, 'mob': mob})
#             else:
#                 Owner.objects.filter(id__in=owners).update(balance=F('balance') - plan)
#                 owner.user = request.user
#                 owner.save()
#             send_mail("Recharge Confirmation!",'Hello, '+fname+'\nRecharge of Rs.'+str(plan)+' was successful on mobile number '+mob+'\nUpdated Wallet Balance :Rs.'+str(bal-plan)+'\n\n\nContact us: care@virtualwallet.com\n\nRoom No: 605,TE COMPS\nSardar Patel Institute Of Technology\nAndheri West, Mumbai - 4000 058', "(Virtual Wallet) Virtual Wallet virtualwalletuser@gmail.com", [emailid])
#             return render(request, 'wallet/recharge_successful.html', {'owner': owner, 'owners': owners, 'plan':plan, 'mob': mob})
#         context = {
#             "form": form,
#             'owners':owners,
#             'code_rec':code_rec
#         }
#         return render(request, 'wallet/recharge.html', context)


# def my_wallet(request):
#     if not request.user.is_authenticated():
#         return render(request, 'wallet/login_user.html')
#     else:
#         code_rec = CodeReceived.objects.filter(user=request.user)
#         code_sent = CodeSent.objects.get(user = request.user)
#         debits = Debit.objects.filter(user=request.user)
#         owners = Owner.objects.filter(user=request.user)
#         return render(request, 'wallet/my_wallet.html', {'owners': owners,'debits':debits,'code_rec':code_rec,'code_sent':code_sent})


# def logout_user(request):
#     logout(request)
#     return render(request, 'wallet/index.html')


# def add_debit(request):
#     if not request.user.is_authenticated():
#         return render(request, 'wallet/login_user.html')
#     else:
#         debits = Debit.objects.filter(user=request.user)
#         owners = Owner.objects.filter(user=request.user)
#         form = AddDebit(request.POST or None)
#         if form.is_valid():
#             debit = form.save(commit=False)
#             debit.user = request.user
#             debit.save()
#             return render(request, 'wallet/add_debit.html', {'debit': debit, 'debits': debits, 'owners': owners})
#         context = {
#             "form": form,
#             'debits': debits,
#             "owners":owners
#         }
#         return render(request, 'wallet/add_debit.html', context)


# def add_balance(request):
#     if not request.user.is_authenticated():
#         return render(request, 'wallet/login_user.html')
#     else:
#         code_rec = CodeReceived.objects.filter(user=request.user)
#         debits = Debit.objects.filter(user=request.user)
#         owners = Owner.objects.filter(user=request.user)
#         form = AddBalance(request.POST or None)
#         user=request.user
#         emailid=user.email
#         for owner in owners:
#             bal = owner.balance
#             fname=owner.first_name
#         if form.is_valid():
#             balance = form.save(commit=False)
#             amt = form.cleaned_data['amount']
#             for deb in debits:
#                 dbal = deb.dbalance
#             if dbal >= amt:
#                 Debit.objects.filter(id__in=debits).update(dbalance=F('dbalance') - amt)
#                 Owner.objects.filter(id__in=owners).update(balance=F('balance') + amt)
#                 send_mail("Rs."+str(amt)+' Added To Your Wallet','Hello, '+fname+'\nRs.'+str(amt)+' successfully added to your wallet\nUpdated Wallet Balance :Rs.'+str(bal+amt)+'\n\n\nContact us: care@virtualwallet.com\n\nRoom No: 605,TE COMPS\nSardar Patel Institute Of Technology\nAndheri West, Mumbai - 4000 058', "(Virtual Wallet) Virtual Wallet virtualwalletuser@gmail.com", [emailid])
#                 return render(request, 'wallet/balance_added.html', {'balance': balance, 'debits': debits, 'owners': owners,'amt':amt,'code_rec':code_rec})
#             else:
#                 return render(request, 'wallet/debit_unsuccessful.html')

#         context = {
#             "form": form,
#             'debits': debits,
#         }
#         return render(request, 'wallet/add_balance.html', context)


# def all_orders(request):
#     if not request.user.is_authenticated():
#         return render(request, 'wallet/login_user.html')
#     else:
#         transfers = Transfer.objects.filter(user=request.user)
#         recharges = Recharge.objects.filter(user=request.user)
#         owners = Owner.objects.filter(user=request.user)
#         recs = ReceivedAmount.objects.filter(user=request.user)
#         return render(request, 'wallet/all_orders.html', {'recharges':recharges,'transfers':transfers,
#                                                           'owners':owners,
#                                                           'recs':recs})


# def transfer_balance(request):
#     if not request.user.is_authenticated():
#         return render(request, 'wallet/login_user.html')
#     else:
#         code_rec = CodeReceived.objects.filter(user=request.user)
#         debits = Debit.objects.filter(user=request.user)
#         owners = Owner.objects.filter(user=request.user)
#         user=request.user
#         senderEmail=user.email
#         for s in owners:
#             senderName = s.first_name+' '+s.last_name
#             senderNumber = s.phone_number
#         form = TransferBalance(request.POST or None)
#         if form.is_valid():
#             myform = form.save(commit=False)
#             phno = form.cleaned_data['phone_number']
#             receivers = Owner.objects.filter(phone_number=phno)
#             if senderNumber == phno:
#                     return render(request, 'wallet/error.html')
#             elif receivers.exists():
#                 transferAmount = form.cleaned_data['transfer_amount']
#                 for owner in owners:
#                     ownerBalance = owner.balance
#                 for receiver in receivers:
#                     receiverName = receiver.first_name + ' ' + receiver.last_name
#                     receiverBalance = receiver.balance+transferAmount
#                 if ownerBalance >= transferAmount:
#                     Owner.objects.filter(id__in=owners).update(balance=F('balance') - transferAmount)
#                     Owner.objects.filter(id__in=receivers).update(balance=F('balance') + transferAmount)
#                     userr = User.objects.get(owner__in=receivers)
#                     receiverEmail = userr.email
#                     p = ReceivedAmount.objects.filter(user=userr).create(rec_amount=transferAmount,rec_name=senderName)
#                     p.user=userr
#                     p.save()
#                     myform.user=request.user
#                     myform.save()
#                     send_mail('You Have Sent Rs.'+str(transferAmount)+' To '+receiverName,'Hello, '+senderName+'!\nYou have sent Rs.'+str(transferAmount)+' to ' +receiverName+'\nUpdated Wallet Balance :Rs.'+str(ownerBalance-transferAmount)+'\n\n\nContact us: care@virtualwallet.com\n\nRoom No: 605,TE COMPS\nSardar Patel Institute Of Technology\nAndheri West, Mumbai - 4000 058', "(Virtual Wallet) Virtual Wallet virtualwalletuser@gmail.com", [senderEmail])
#                     send_mail('You Have Received Rs.'+str(transferAmount)+' In Your Virtual Wallet','Hello, '+receiverName+'!\n'+senderName+' has sent Rs.'+str(transferAmount)+' to your Virtual Wallet\nUpdated Wallet Balance :Rs.'+str(receiverBalance)+'\n\n\nContact us: care@virtualwallet.com\n\nRoom No: 605,TE COMPS\nSardar Patel Institute Of Technology\nAndheri West, Mumbai - 4000 058', "(Virtual Wallet) Virtual Wallet virtualwalletuser@gmail.com", [receiverEmail])
#                     return render(request, 'wallet/transfer_successful.html', {'debits': debits, 'owners': owners,
#                                                                                'transferAmount':transferAmount,
#                                                                                'receiverName':receiverName,
#                                                                                'code_rec':code_rec,
#                                                                                })
#                 else:
#                     return render(request, 'wallet/recharge_unsuccessful.html',{'debits': debits})

#             else:
#                 return render(request, 'wallet/transfer_unsuccessful.html')

#         context = {
#             "form": form,
#             'debits': debits,
#             'owners': owners,
#             'code_rec':code_rec,
#         }
#         return render(request, 'wallet/transfer_balance.html', context)


# def account_verify(request):
#     if not request.user.is_authenticated():
#         return render(request, 'wallet/login_user.html')
#     else:
#         code_rec = CodeReceived.objects.filter(user=request.user)
#         form = CodeVerification(request.POST or None)
#         if form.is_valid():
#             entered_code = form.save(commit=False)
#             ver_code = form.cleaned_data['verification_code']
#             code_sent = CodeSent.objects.filter(user=request.user)
#             for s in code_sent:
#                 sent = s.sent_code
#             if ver_code ==sent:
#                 entered_code.user = request.user
#                 entered_code.save()
#                 return render(request, 'wallet/home_user.html', {'entered_code':entered_code,'ver_code':ver_code,'code_rec':code_rec})
#             return render(request,'wallet/verification_failed.html')
#         context = {
#             "form": form,
#             "code_rec":code_rec,
#         }
#         return render(request, 'wallet/account_verify.html', context)






"""def recharge(request):
    if not request.user.is_authenticated():
        return render(request, 'wallet/login_user.html')
    else:
        owners = Owner.objects.filter(user=request.user)
        for owner in owners:
            b=owner.balance
            if(b>0):
                Owner.objects.filter(id__in=owners).update(balance=F('balance') - 10)
        return render(request, 'wallet/recharge.html', {'owners': owners})"""


''' userr = User.objects.get(owner__in=receivers)  # impppppppppppppp
#rec = userr.username #username
mag = Received.objects.filter(user=userr)'''