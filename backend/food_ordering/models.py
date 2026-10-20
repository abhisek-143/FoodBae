from django.db import models
from django.core.validators import MinLengthValidator,MaxLengthValidator
import uuid

# Create your models here.

class Category(models.Model):
    category_name = models.CharField(max_length=50,unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.category_name

class User(models.Model):
    firstname = models.CharField(max_length=50)
    lastname = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=50)
    phone = models.CharField(max_length=15)
    gender = models.CharField(max_length=20)
    address = models.TextField(null=True,blank=True)
    pincode = models.CharField(max_length=10,null=True,blank=True)
    profile_image = models.ImageField(upload_to="profile/",null=True,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.firstname}{self.lastname}"

class Food(models.Model):
    category = models.ForeignKey(Category,on_delete=models.CASCADE)
    food_name = models.CharField(max_length=60)
    food_quantity = models.CharField(default=0,max_length=20)
    food_image = models.ImageField(upload_to="food/",null=True,blank=True)
    food_price = models.DecimalField(decimal_places=2,max_digits=10,default=0.0)
    food_description = models.TextField(null=True,blank=True)
    is_available = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.food_name
    


class Order(models.Model):
    status_choices = [
        ("Not_Confirmed" , "Not_Confirmed"),
        ("Pick_up" , "Pick_up"),
        ("Delivered" , "Delivered"),
        ("Confirmed" , "Confirmed"), 
        ("Preparing", "Preparing"),
        ("Cancelled","Cancelled"),
    ]
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    order_number = models.CharField(max_length=200,null=True,unique=True)
    locality_area_01 = models.CharField(max_length=50,null=True)
    locality_area_02 = models.CharField(max_length=50,null=True)
    landmark = models.CharField(null=True,max_length=50)
    city = models.CharField(max_length=50,null=True)
    district = models.CharField(max_length=50,null=True)
    state = models.CharField(max_length=40,null=True)
    status = models.CharField(choices=status_choices,max_length=40,default="Not_Confirmed")
    payment_option = models.CharField(default="COD")
    card_number = models.CharField(max_length=20,null=True)
    expiry_date = models.CharField(null=True,max_length=10)
    cvv = models.CharField(max_length=5,null=True)
    total_amount = models.DecimalField(max_digits=10,decimal_places=2,null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    def __str__(self):
        return f"Order {self.id}"

class CartItem(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    food = models.ForeignKey(Food,on_delete=models.CASCADE)
    order_quantity = models.PositiveIntegerField(default=1)
    total_amount = models.DecimalField(max_digits=10,decimal_places=2)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ("user","food")

    def __str__(self):
        return f"{self.food.food_name} {self.id}"

class Review(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    food = models.ForeignKey(Food,on_delete=models.CASCADE)
    comments = models.TextField(null=True)
    rating = models.IntegerField(validators=[
        MinLengthValidator(1),
        MaxLengthValidator(5)
    ])
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Review - {self.food.food_name}-{self.rating}"



class OrderItem(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    order = models.ForeignKey(Order,on_delete=models.CASCADE)
    food = models.ForeignKey(Food,on_delete=models.CASCADE)
    order_quantity = models.PositiveIntegerField(default=1)
    total_amount = models.DecimalField(max_digits=10,decimal_places=2)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    def __str__(self):
        return f"{"OrderItem"} - {self.id}"


class TrackOrder(models.Model):
    order = models.ForeignKey(Order,on_delete=models.CASCADE)
    tracking_status = models.CharField(max_length=50,null=True)
    cancelled_by_user = models.BooleanField(default=False)
    remark = models.TextField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"status -{self.order.order_number}-{self.id}"
   



class Wishlist(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    food = models.ForeignKey(Food,on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ("user","food")

    def __str__(self):
        return f"Wishlist - {self.user.id}"
    
