from rest_framework import serializers
from .models import *

class ManageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class UpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class FoodItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Food
        fields = '__all__'
        


class FoodSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.category_name',read_only=True)
    food_image = serializers.ImageField(required=False)
    class Meta:
        model = Food
        fields = ["id","food_name","food_quantity","food_description","food_price","food_image","category_name",'category']

class CartSerializer(serializers.ModelSerializer):
    food_name = serializers.CharField(source="food.food_name",read_only=True)
    food_image = serializers.ImageField(source="food.food_image",read_only=True)
    food_price = serializers.CharField(source='food.food_price',read_only=True)
    class Meta:
        model = CartItem
        fields = ['id','food_name','food_image','food_price','order_quantity','total_amount','created_at']


class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = '__all__'        



class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = Order
        fields = '__all__'


class OrderItemsSerializer(serializers.ModelSerializer):
    food = FoodItemSerializer(read_only=True)
    class Meta:
        model = OrderItem
        fields = '__all__'

class TrackingOrderSerializer(serializers.ModelSerializer):
    order = OrderSerializer(read_only=True)
    class Meta:
        model = TrackOrder
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class FoodItemSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    class Meta:
        model = Food
        fields = '__all__'



class WishlistSerializers(serializers.ModelSerializer):
    food = FoodItemSerializer(read_only=True)
    class Meta:
        model = Wishlist 
        fields = "__all__"       



