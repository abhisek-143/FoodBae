import React, { Children, createContext, useContext, useEffect, useState } from 'react'

export const UserContext = createContext()

const UserProvider = ({children}) => {
    const [cartCount, setCartCount] = useState(0)
    const [wishlistCount, setWishlistCount] = useState(0)
  const BASE_URL = import.meta.env.VITE_BASE_URL;


    useEffect(() => {
      fetch(`${BASE_URL}/api/user/foods/wishlists/`)
        .then((res) => res.json())
        .then((data) => {
          setWishlistCount(data.length)
        });

            fetch(`${BASE_URL}/api/user/cart/`)
      .then((res) => res.json())
      .then((data) => {
        setCartCount(data.length)
      });

    }, [wishlistCount,cartCount]);
  
  
    

    return (
        <UserContext.Provider value={{cartCount,setCartCount,wishlistCount,setWishlistCount}}>
            {children}
        </UserContext.Provider>
    )
}


export default UserProvider
