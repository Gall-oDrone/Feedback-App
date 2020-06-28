from django.urls import path, re_path
from paymentsApi.views import (
    UserIDView,
    ItemListView,
    AddToCartView,
    OrderDetailView,
    PaymentView,
    AddCouponView,
    ItemDetailView,
    AddressListView,
    AddressCreateView,
    AddressDeleteView,
    AddressUpdateView,
    CountryListView,
    OrderItemDeleteView,
    OrderQuantityUpdateView,
    PaymentListView,
    DirectBuyView,
    SessionBuyView,
    SessionOrderDetailView,
    PaymentSView,
)
from home.settings.dev import STRIPE_WEBHOOK_SIGNING_KEY
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path('user-id/', UserIDView.as_view(), name='user-id'),
    path('addresses/', AddressListView.as_view(), name='address-list'),
    path('addresses/create/', AddressCreateView.as_view(), name='address-create'),
    path('addresses/<pk>/update/', AddressUpdateView.as_view(), name='address-update'),
    path('addresses/<pk>/delete/', AddressDeleteView.as_view(), name='address-delete'),
    path('countries/', CountryListView.as_view(), name='countries'),
    path('products/', ItemListView.as_view(), name='product-list'),
    path('products/<pk>/', ItemListView.as_view(), name='product-detail'),
    path('direct-buy/', DirectBuyView.as_view(), name='direct-view'),
    path('session-direct-buy/', SessionBuyView.as_view(), name='session-direct-view'),

    path('payment-successful/', csrf_exempt(PaymentSView.as_view()), name='spayment-successful'),
    
    path('add-to-cart/', AddToCartView.as_view(), name='add-to-cart'),
    path('order-summary/', OrderDetailView.as_view(), name='order-summary'),
    path('session-order-summary/', SessionOrderDetailView.as_view(), name='session-order-summary'),
    path('checkout/', PaymentView.as_view(), name='checkout'),
    path('add-coupon/', AddCouponView.as_view(), name='add-coupon'),
    path('order-items/<pk>/delete/',
         OrderItemDeleteView.as_view(), name='order-item-delete'),
    path('order-item/update-quantity/',
         OrderQuantityUpdateView.as_view(), name='order-item-update-quantity'),
    path('payment-list/', PaymentListView.as_view(), name='payment-List'),
]