import { createProduct, getSellerProduct, getAllProducts, getProductById, addProductVariant } from "../service/product.api"
import { useDispatch } from "react-redux"
import { setSellerProducts, setProducts } from "../state/product.slice"
import { useCallback } from "react"


export const useProduct = () => {

    const dispatch = useDispatch()

    const handleCreateProduct = useCallback(async (formData) => {
        const data = await createProduct(formData)
        return data.product
    }, [])

    const handleGetSellerProduct = useCallback(async () => {
        const data = await getSellerProduct()
        dispatch(setSellerProducts(data.products))
        return data.products
    }, [dispatch])

    const handleGetAllProducts = useCallback(async () => {

        const data = await getAllProducts()
        dispatch(setProducts(data.products))
    }, [dispatch])

    const handleGetProductById = useCallback(async (productId) => {
        const data = await getProductById(productId)
        return data.product
    }, [])

    const handleAddProductVariant = useCallback(async (productId, newProductVariant) => {
        const data = await addProductVariant(productId, newProductVariant)

        return data
    }, [])

    return { handleCreateProduct, handleGetSellerProduct, handleGetAllProducts, handleGetProductById ,handleAddProductVariant}

}