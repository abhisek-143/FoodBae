from django.contrib import admin
from .models import *

# Register your models here.


admin.site.site_title = "FOOD BAE"
admin.site.site_header = "FOOD BAE"
admin.site.index_title = " Welcome to FOOD BAE"

class FoodAdmin(admin.ModelAdmin):
    list_display = ('food_name','category','food_price','is_available','created_at')
    list_filter = ('category','is_available')
    search_fields = ('food_name',)

class CategoryAdmin(admin.ModelAdmin):
    list_display = ('category_name','created_at')
    search_fields = ('category_name',)

class UserAdmin(admin.ModelAdmin):
    list_display = ('firstname','lastname','email','phone','gender','created_at')
    search_fields = ('firstname','lastname','email','phone')


class ReviewAdmin(admin.ModelAdmin):
    list_display = ('user','food','rating','created_at')
    search_fields = ('user','food','rating')

class OrderAdmin(admin.ModelAdmin):
    list_display = ("user","total_amount","status","payment_option","order_number",'created_at')
    search_fields = ('status',"order_number","payment_option","user")

class CartItemAdmin(admin.ModelAdmin):
    list_display = ("user","food","order_quantity",'created_at')
    search_fields = ("user","food","order_quantity")

class OrderItemAdmin(admin.ModelAdmin):
    list_display = ("user","food","order_quantity",'created_at')
    search_fields = ("user","food","order_quantity")

class WishlistAdmin(admin.ModelAdmin):
    list_display = ("user","food","created_at")
    search_fields = ("user","food")



admin.site.register(User,UserAdmin)
admin.site.register(Category,CategoryAdmin)
admin.site.register(Food,FoodAdmin)
admin.site.register(Review,ReviewAdmin)
admin.site.register(Order,OrderAdmin)
admin.site.register(CartItem,CartItemAdmin)
admin.site.register(OrderItem,OrderItemAdmin)
admin.site.register(TrackOrder)
admin.site.register(Wishlist,WishlistAdmin)
