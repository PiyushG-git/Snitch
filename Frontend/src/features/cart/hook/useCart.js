import { addItem, getCart, incrementCartItemApi, decrementCartItemApi, removeCartItemApi, createCartOrder, verifyCartOrder } from "../service/cart.api"
import { useDispatch } from "react-redux"
import { setCart, incrementCartItem } from "../state/cart.slice"
import { useCallback } from "react"


export const useCart = () => {

    const dispatch = useDispatch()

    const handleAddItem = useCallback(async ({ productId, variantId }) => {
        const data = await addItem({ productId, variantId })
        
        // Refresh cart to ensure Redux state matches DB
        const cartData = await getCart()
        dispatch(setCart(cartData.cart))

        return data
    }, [dispatch])

    const handleGetCart = useCallback(async () => {
        const data = await getCart()
        console.log(data)
        dispatch(setCart(data.cart))
    }, [dispatch])

    const handleIncrementCartItem = useCallback(async ({ productId, variantId }) => {
        await incrementCartItemApi({ productId, variantId })
        const cartData = await getCart()
        dispatch(setCart(cartData.cart))
    }, [dispatch])

    const handleDecrementCartItem = useCallback(async ({ productId, variantId }) => {
        await decrementCartItemApi({ productId, variantId })
        const cartData = await getCart()
        dispatch(setCart(cartData.cart))
    }, [dispatch])

    const handleRemoveCartItem = useCallback(async ({ productId, variantId }) => {
        await removeCartItemApi({ productId, variantId })
        const cartData = await getCart()
        dispatch(setCart(cartData.cart))
    }, [dispatch])

    const handleCreateCartOrder = useCallback(async () => {
        const data = await createCartOrder()
        return data.order
    }, [])

    const handleVerifyCartOrder = useCallback(async ({ razorpay_order_id, razorpay_payment_id, razorpay_signature }) => {
        const data = await verifyCartOrder({ razorpay_order_id, razorpay_payment_id, razorpay_signature })
        return data.success
    }, [])

    return { handleAddItem, handleGetCart, handleIncrementCartItem, handleDecrementCartItem, handleRemoveCartItem, handleCreateCartOrder, handleVerifyCartOrder }

}