from django.shortcuts import render
from rest_framework.decorators import api_view,parser_classes
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from .models import *
from .serializer import *
from rest_framework.parsers import MultiPartParser,FormParser
from django.contrib.auth.hashers import make_password ,check_password
from django.db.models import Q
import uuid






# Create your views here.
@api_view(['POST'])
def Admin_login(request):
    username = request.data.get("username")
    password = request.data.get("password")
    if not username or not password:
        return Response({'message':'Both fields are required !'},status=status.HTTP_400_BAD_REQUEST)
    authenticated_user = authenticate(request, username=username, password=password)
    if authenticated_user is not None and authenticated_user.is_staff:
        return Response({'message':'Login Successful !','username':username,"adminId":authenticated_user.id},status=status.HTTP_200_OK)
    
    return Response({'message':'Invalid Credentials !'},status=status.HTTP_404_NOT_FOUND)

@api_view(["POST"])
def Add_Category_View(request):
    category_name = request.data.get("category_name")
    if Category.objects.filter(category_name=category_name).exists():
        return Response({"message" : "Category already exists !"},status=status.HTTP_400_BAD_REQUEST)
    if category_name is None:
        return Response({"message" : "Field is Empty !"},status=status.HTTP_404_NOT_FOUND)
    ob = Category.objects.create(category_name=category_name)
    ob.save()
    return Response({"message" : "Category added successfully !"},status=status.HTTP_201_CREATED)


@api_view(["GET"])
def Manage_Category_View(request):
    categories = Category.objects.all()
    serializer = ManageSerializer(categories,many=True)
    return Response(serializer.data,status=status.HTTP_200_OK)

@api_view(['PUT','GET','DELETE'])
def Update_Category_View(request,pk):
    try:
        category = Category.objects.get(pk=pk)
    except Category.DoesNotExist:
        return Response({"message":"Category not found!"},status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = UpdateSerializer(category)
        return Response(serializer.data,status=status.HTTP_200_OK)
    if request.method == "PUT":
        serializer = UpdateSerializer(category,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message":"Category updated successsfully"},status=status.HTTP_200_OK)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST) 
    if request.method == "DELETE":
        Category.objects.get(pk=pk).delete()
        return Response({"message":"Category Delected successfully !","success" : True
                         } ,status=status.HTTP_200_OK)   

@api_view(["GET","POST"])
@parser_classes([FormParser,MultiPartParser])
def Add_Food_Item_View(request):
    if request.method == "GET":
        food = Food.objects.all()
        serializer = FoodItemSerializer(food,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    if request.method == "POST":
        serializer = FoodSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message":"Food Item Added Successfully !"},status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def Manage_Food_Items_View(request):
    food= Food.objects.all()
    serializer = FoodItemSerializer(food,many=True)
    return Response(serializer.data,status=status.HTTP_200_OK)

@api_view(["GET"])
def Search_Foods_View(request):
    query = request.GET.get("q","")
    foods = Food.objects.filter(food_name__icontains=query)
    serializer = FoodItemSerializer(foods,many=True)
    return Response(serializer.data,status=status.HTTP_200_OK)


@api_view(["POST"])
@parser_classes([MultiPartParser,FormParser])
def Auth_User_Register_View(request):
    firstname = request.data.get("firstname")
    lastname = request.data.get("lastname")
    email = request.data.get("email")
    password = request.data.get("password")
    confirmpassword = request.data.get("confirmpassword")
    gender = request.data.get("gender")
    profile_image = request.data.get("profile_image")
    phone = request.data.get("phone")
    pincode =request.data.get("pincode")

    if password != confirmpassword :
        return Response({"message":"password and confirm password are not matched !"})
    user = User.objects.filter(Q(email=email)| Q(phone=phone))
    if user:
        return Response({"message":"email or phone number already exist !"},status=status.HTTP_409_CONFLICT)
    User.objects.create(firstname=firstname,lastname=lastname,email=email,password=make_password(password),gender=gender,pincode=pincode,phone=phone,profile_image=profile_image)
    return Response({"message":"User registered successfully!"},status=status.HTTP_201_CREATED)


@api_view(["POST"])
def Auth_User_Login_View(request):
    emailorphone = request.data.get("emailorphone")
    password = request.data.get("password")
    user = User.objects.get(Q(email=emailorphone )| Q(phone=emailorphone))
    
    if check_password(password,user.password):
        return Response({"message":"User LoggedIn Successfully!","userId":user.id,"name":f"{user.firstname}"},status=status.HTTP_200_OK)
    return Response({"message":"Invalid Credentials!"},status=status.HTTP_401_UNAUTHORIZED)

import random
@api_view(["GET"])
def Top_Rated_Foods_View(request):
    foods =list(Food.objects.all())
    random.shuffle(foods)
    limited_foods = foods[0:10]
    serializers = FoodItemSerializer(limited_foods,many=True)
    return Response(serializers.data,status=status.HTTP_200_OK)  

@api_view(["GET"])
def View_Food_Item(request,id):
    food = Food.objects.get(id=id)
    serializer = FoodItemSerializer(food)
    return Response(serializer.data,status=status.HTTP_200_OK)


@api_view(["GET"])
def View_Cart(request):
    cart = CartItem.objects.all()
    serializer = CartSerializer(cart,many=True)
    return Response(serializer.data,status=status.HTTP_200_OK)

@api_view(["GET","POST"])
def Add_CartItem_View(request,id):
    food = Food.objects.get(id=id)
    userId = request.data.get("userId")
    user = User.objects.get(id=userId)
    order_quantity = request.data.get("order_quantity")
    total_amount = order_quantity * food.food_price

    
    if CartItem.objects.filter(user=user,food=food):
        return Response({"message":"Item already in Cart!"},status=status.HTTP_409_CONFLICT)
    CartItem.objects.create(user=user,food=food,order_quantity=order_quantity,total_amount=total_amount)
    return Response({"message":"Added To Cart Successfully!"},status=status.HTTP_201_CREATED)


@api_view(["DELETE"])
def Delete_CartItem_View(request,id):
    cart_item = CartItem.objects.get(id=id)
    print(cart_item)
    cart_item.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)



@api_view(["PUT"])
def Update_CartItem_View(request,id,quantity):
    item = CartItem.objects.get(id=id)
    if item:
        item.order_quantity = quantity
        item.total_amount = item.food.food_price * item.order_quantity
        item.save()
        return Response(status=status.HTTP_200_OK)
    return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def Place_Order_View(request):
    try:
        userId = request.data.get("userId")
        user = User.objects.get(id=userId)
    except User.DoesNotExist:
        return Response({"message" : "user not found"},status=status.HTTP_404_NOT_FOUND)
    order_number = uuid.uuid4().hex[:8].upper()  # Generate a unique order number
    locality_area_01 = request.data.get("locality_area_01")
    locality_area_02 = request.data.get("locality_area_02")
    landmark = request.data.get("landmark")
    city = request.data.get("city")
    district = request.data.get("district")
    state = request.data.get("state")
    payment_option = request.data.get("payment_option")
    total_amount = request.data.get("total_amount")
    card_number = request.data.get("card_number")
    expiry = request.data.get("expiry")
    cvv = request.data.get("cvv")
    order,created = Order.objects.get_or_create(user=user,order_number=order_number)
    if created:
        try:
            cart = CartItem.objects.filter(user=user)
            print(cart)
            for item in cart:
                order_items = OrderItem.objects.create(order=order,user=user,food=item.food,order_quantity=item.order_quantity,total_amount=item.total_amount)
                order_items.save()
        except Exception:
            return Response({"message":"Something Went wrong!"},status=status.HTTP_400_BAD_REQUEST)  
        order.locality_area_01 = locality_area_01
        order.locality_area_02 = locality_area_02
        order.landmark = landmark
        order.city = city
        order.district =district
        order.state = state
        order.total_amount = total_amount
        order.payment_option = payment_option
        order.save()
        if card_number:
            order.card_number = card_number
        if cvv:
            order.cvv = cvv
        if expiry:
            order.expiry_date = expiry
            order.save()
        cart = CartItem.objects.all()
        cart.delete()
         
        return Response({"message":"Order Placed Successfully!"},status=status.HTTP_201_CREATED)
      
    return Response({"message":"Order Already Exist!"},status=status.HTTP_400_BAD_REQUEST)
        
            

@api_view(["GET"])
def My_Orders_List_View(request):
    orders = Order.objects.all()
    serializer = OrderSerializer(orders,many=True)
    return Response(serializer.data,status=status.HTTP_200_OK)


@api_view(["GET"])
def View_Order_Details(request,id):
    order = Order.objects.get(id=id)
    serializer = OrderSerializer(order)
    return Response(serializer.data,status=status.HTTP_200_OK)



def View_Invoice(request,id):
    order = Order.objects.get(id=id)
    OrderItems = OrderItem.objects.filter(order=order)
    return render(request,"invoice.html",{"order":order,"orderItems":OrderItems})




@api_view(["GET"])
def Order_Not_Confirmed_View(request):
    orders = Order.objects.filter(status="Not_Confirmed").order_by("created_at")
    print(orders)
    serializer = OrderSerializer(orders,many=True)
    return Response(serializer.data,status=status.HTTP_200_OK)


@api_view(["GET"])
def Order_Confirmed_View(request):
    orders = Order.objects.filter(status="Confirmed").order_by("created_at")
    serializer = OrderSerializer(orders,many=True)
    return Response(serializer.data,status=status.HTTP_200_OK)

@api_view(["GET"])
def Order_Pick_up_For_Delivery_View(request):
    orders = Order.objects.filter(status="Pick_up").order_by("created_at")
    serializer = OrderSerializer(orders,many=True)
    return Response(serializer.data,status=status.HTTP_200_OK)



@api_view(["GET"])
def Order_Preparing_View(request):
    orders = Order.objects.filter(status="Preparing").order_by("created_at")
    serializer = OrderSerializer(orders,many=True)
    return Response(serializer.data,status=status.HTTP_200_OK)


@api_view(["GET"])
def Order_Cancelled_View(request):
    orders = Order.objects.filter(status="Cancelled").order_by("created_at")
    serializer = OrderSerializer(orders,many=True)
    return Response(serializer.data,status=status.HTTP_200_OK)


@api_view(["GET"])
def Order_Delivered_View(request):
    orders = Order.objects.filter(status="Delivered").order_by("created_at")
    serializer = OrderSerializer(orders,many=True)
    return Response(serializer.data,status=status.HTTP_200_OK)


@api_view(["GET"])
def Order_AllOrders_View(request):
    orders = Order.objects.all().order_by("created_at")
    serializer = OrderSerializer(orders,many=True)
    return Response(serializer.data,status=status.HTTP_200_OK)


@api_view(["POST"])
def From_To_Dates_Order_View(request):
    from_date = request.data.get("from_date")
    to_date = request.data.get("to_date")
    order_status = request.data.get("status")

    if not from_date or not to_date:
        return Response(status=status.HTTP_404_NOT_FOUND)
    orders = Order.objects.filter(created_at__date__range = [from_date,to_date])
    if order_status == "All":
        serializer = OrderSerializer(orders,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    elif order_status != "All":
        data =orders.filter(status=order_status).order_by("created_at")
        serializer = OrderSerializer(data,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    return Response(status=status.HTTP_400_BAD_REQUEST)
       



@api_view(["GET"])
def Order_Details_View(request,id):
    order = Order.objects.get(id=id)
    if not order:
        return Response(status=status.HTTP_404_NOT_FOUND)
    print(order)
    serializer = OrderSerializer(order)
    return Response(serializer.data,status=status.HTTP_200_OK)


@api_view(["GET"])
def View_Order_Items(request,id):
    order = Order.objects.get(id=id)
    if not order:
        return Response(status=status.HTTP_404_NOT_FOUND)
    order_items = OrderItem.objects.filter(order=order).select_related("food")
    serializer = OrderItemsSerializer(order_items,many=True)
    return Response(serializer.data,status=status.HTTP_200_OK)


@api_view(["GET","POST"])
def View_Tracking_Order(request,id):
    order = Order.objects.get(id=id)
    if not order:
        return Response(status=status.HTTP_404_NOT_FOUND)
    order_status = request.data.get("orderStatus")
    remark = request.data.get("remark")
    if not order_status or not remark:
        Response(status=status.HTTP_404_NOT_FOUND)
    tracking_order,created = TrackOrder.objects.get_or_create(order=order,tracking_status=order_status)
    if created:
        tracking_order.remark = remark
        tracking_order.save()

    order.status = order_status
    order.save()  
    return Response({"message":"tracking order updated successfully!"},status=status.HTTP_201_CREATED)



@api_view(["GET"])
def View_Tracking_Order_details(request,id):
    order = Order.objects.get(id=id)
    if not order:
        return Response(status=status.HTTP_404_NOT_FOUND)
    details = TrackOrder.objects.filter(order=order).order_by("updated_at")
    serializer = TrackingOrderSerializer(details,many=True)
    return Response(serializer.data,status=status.HTTP_200_OK)



@api_view(["GET"])
def View_Search_Order(request):
    query = request.GET.get("q","")
    orders = Order.objects.filter(order_number__icontains=query).order_by("created_at")
    serializer = OrderSerializer(orders,many=True)
    return Response(serializer.data,status=status.HTTP_200_OK)




@api_view(["GET"])
def View_All_Register_Users(request):
    users = User.objects.all().order_by("created_at")
    serializer = UserSerializer(users,many=True)
    return Response(serializer.data,status=status.HTTP_200_OK)





@api_view(["GET"])
def Food_Details_View(request,id):
    food = Food.objects.get(id=id)
    if not food:
        return Response({"message":"food not found"},status=status.HTTP_404_NOT_FOUND)
    serializer = FoodItemSerializer(food)
    return Response(serializer.data,status=status.HTTP_200_OK)



@api_view(["GET","PUT"])
@parser_classes([FormParser,MultiPartParser])
def update_And_Delete__View(request,id):
    food = Food.objects.get(id=id)
    if not food:
        return Response({"message":"Food not found"},status=status.HTTP_404_NOT_FOUND)
    if request.method=="PUT":
        serializer = FoodItemSerializer(food,data=request.data,partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"message":"Food Item Updated successfully!"},status=status.HTTP_200_OK)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    return Response(status=status.HTTP_400_BAD_REQUEST)




@api_view(['DELETE'])
def Delete_Food_Item_View(request,id):
    food = Food.objects.get(id=id)
    food.delete()
    return Response({"message":"food item deleted successfully!"},status=status.HTTP_204_NO_CONTENT)



from django.utils.timezone import now
from datetime import timedelta

@api_view(["GET"])
def View_Admin_Dashboard_Details(request):
    total_new_order = Order.objects.filter(status="Not_Confirmed").count()
    total_orders = Order.objects.all().count()
    total_not_confirmed =  Order.objects.filter(status="Not_Confirmed").count()
    total_confirmed = Order.objects.filter(status="Confirmed").count()
    total_preparing =  Order.objects.filter(status="Preparing").count()
    total_pick_up =  Order.objects.filter(status="Pick_up").count()
    total_delivered =  Order.objects.filter(status="Delivered").count()
    total_cancelled = Order.objects.filter(status="Cancelled").count()
    total_users = User.objects.all().count()
    total_categories =  Category.objects.all().count()
    total_foods = Food.objects.all().count()

    today = now().date()
    start_week = today - timedelta(days=today.weekday())
    start_month = today.replace(day=1)
    start_year = today.replace(month=1, day=1)

    def get_total_sales(start_date):
        total = 0
        total_order= Order.objects.filter(status="Delivered",created_at__gte=start_date)
        if not total_order:
            return total
        for order in total_order:
            total += order.total_amount
        return total
    today_sales = get_total_sales(today)
    week_sales = get_total_sales(start_week)
    month_sales = get_total_sales(start_month)
    year_sales = get_total_sales(start_year)
    total_sales = Order.objects.filter(status="Delivered").aggregate(total=models.Sum('total_amount'))['total'] or 0
       
            

    data= {"total_cancelled":total_cancelled,"total_categories":total_categories,"total_confirmed":total_confirmed,"total_delivered":total_delivered,"total_foods":total_foods,"total_new_order":total_new_order,"total_not_confirmed":total_not_confirmed,"total_orders":total_orders,"total_preparing":total_preparing,"total_pick_up":total_pick_up,"total_users":total_users,"today_Sales":today_sales,"week_sales":week_sales,"month_sales":month_sales,"year_sales":year_sales,"total_sales":total_sales}

    return Response(data)


@api_view(['POST'])
def Add_To_Wishlist_View(request,id):
    food = Food.objects.get(id=id)
    userId = request.data.get("userId")
    user = User.objects.get(id=userId)
    if not food or not user:
        return Response({"message":"Food Not Found!"},status=status.HTTP_404_NOT_FOUND)
    Wishlist_obj,created = Wishlist.objects.get_or_create(user=user,food=food)
    if created:
        return Response({"message":"Added to WishList Successfully!"},status=status.HTTP_201_CREATED)
    return Response({"messgae":"Already Exist in Wishlist!"})


@api_view(["GET"])
def View_All_WishLists(request):
    wishlists = Wishlist.objects.all().order_by("created_at")
    serializer = WishlistSerializers(wishlists,many=True)
    return Response(serializer.data,status=status.HTTP_200_OK) 


@api_view(['DELETE'])
def Delete_Wishlist_View(request,id):
    food  = Wishlist.objects.get(id=id)
    if not food:
        return Response({"messgae":"food not found!"},status=status.HTTP_400_BAD_REQUEST)
    food.delete()
    return Response({"message":"Item deleted successfully!"},status=status.HTTP_204_NO_CONTENT)


@api_view(['GET','PUT'])
def Cancel_Order_By_User_View(request,id):
    order= Order.objects.get(id=id)
    if not order:
        return Response({"message":"order not found"},status=status.HTTP_404_NOT_FOUND)
    order.status = "Cancelled"
    order.save()
    return Response({"message":"Order Cancelled Successfully"},status=status.HTTP_200_OK)
    


@api_view(['GET'])
def View_Track_Order_Details(request,id):
    order = Order.objects.get(id=id)
    if not order:
        return Response({"message":"Order not found"},status=status.HTTP_404_NOT_FOUND)
    tracking_details = TrackOrder.objects.filter(order=order).last()
    serializer = TrackingOrderSerializer(tracking_details)
    return Response(serializer.data,status=status.HTTP_200_OK)


