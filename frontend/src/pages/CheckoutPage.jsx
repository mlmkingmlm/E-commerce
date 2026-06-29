import React, { useEffect, useState } from 'react'
import Breadcrup from '../component/Breadcrup'
import { getCart } from '../Redux/ActionCreators/CartActionCreator'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { createCheckout } from '../Redux/ActionCreators/CheckoutActionCreator';
import { updateProduct, getProduct } from '../Redux/ActionCreators/ProductActionCreator';
import { deleteCart } from '../Redux/ActionCreators/CartActionCreator';
import { getAddress } from "../Redux/ActionCreators/AddressActionCreator"
import { useNavigate } from 'react-router-dom';

export default function CheckoutPage() {
    let [cart, setCart] = useState([])
    const { data: CartStateData } = useSelector(state => state.CartStateData)
    const { data: ProductStateData } = useSelector(state => state.ProductStateData)
    let [total, setTotal] = useState(0)
    let [subtotal, setSubtotal] = useState(0)
    let [shipping, setShipping] = useState(0)
    let [outofstock, setOutofstock] = useState(false)
    const { data: AddressStateData } = useSelector(state => state.AddressStateData)
    let [selectAddress, setSelectAddress] = useState({})
    let [mode, setMode] = useState("COD")
    let dispatch = useDispatch()
    let navigate = useNavigate()

    function calculation(cart) {
        let sum = 0
        cart.forEach(item => sum += item?.product?.finalPrice * item?.quantity)

        if (sum > 0 && sum < 1000) {
            setShipping(150)
            setTotal(sum + 150)
        }
        else {
            setShipping(0)
            setTotal(sum)
        }
        setSubtotal(sum)
    }

    function placeOrder() {
        let item = {
            user: localStorage.getItem("userid"),
            address: selectAddress._id,
            paymentMode: mode,
            subtotal: subtotal,
            shipping: shipping,
            total: total,
            products: CartStateData.map(item => ({
                product: item.product._id,
                name: item.product.name,
                price: item.product.finalPrice,
                qty: item.quantity,
                total: item.product.finalPrice * item.quantity
            }))
        }
        dispatch(createCheckout(item))
        // cart.forEach(item => {
        //     let p = ProductStateData.find(x => x.id === item.product)
        //     p.stockQuantity = p.stockQuantity - item.qty
        //     p.stock = p.stockQuantity === 0 ? false : true
        //     dispatch(updateProduct(p))
        //     dispatch(deleteCart({ id: item.id }))
        // })
        navigate("/order-confirmation")
    }

    useEffect(() => {
        const hasOutOfStock = CartStateData.some(item => {
            const p = ProductStateData.find(
                x => x._id === item.product
            );

            return p && !p.stock;
        });

        setOutofstock(hasOutOfStock);

    }, [CartStateData, ProductStateData]);

    useEffect(() => {
        dispatch(getAddress());
        dispatch(getCart());
        dispatch(getProduct());
    }, [])

    useEffect(() => {
        calculation(CartStateData)
    }, [CartStateData])
    return (
        <>
            {/*start page content*/}
            <div className="page-content">
                {/*start product details*/}
                <Breadcrup title="Checkout" />

                {/*start product details*/}
                <section className="section-padding">
                    <div className="container">
                        <div className="d-flex align-items-center px-3 py-2 border mb-4">
                            <div className="text-start">
                                <h4 className="mb-0 h4 fw-bold">Select Delivery Address</h4>
                            </div>
                        </div>
                        <div className="row g-4">
                            <div className="col-12 col-lg-6 col-xl-6">
                                <h6 className="fw-bold mb-3 py-2 px-3 bg-light">Please Carefully Select Address</h6>
                                {AddressStateData.length ? AddressStateData.map(add => {
                                    return <div className="card rounded-0 mb-3" key={add._id}>
                                        <div className="card-body">
                                            <div className="d-flex flex-column flex-xl-row gap-3">
                                                <div className="address-info form-check flex-grow-1">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="flexRadioDefault"
                                                        id={add._id}
                                                        checked={selectAddress._id === add._id}
                                                        onChange={() => { setSelectAddress(add) }}
                                                    />
                                                    <label
                                                        className="form-check-label"
                                                        htmlFor={add._id}
                                                    >
                                                        <span className="fw-bold mb-0 h5">{add.name}</span>
                                                        <br />
                                                        {add.address}, {add.city} <br />
                                                        {add.state} - {add.pincode}
                                                        <br />
                                                        Mobile: <span className="fw-bold text-black">{add.mobile}</span>
                                                    </label>
                                                </div>


                                            </div>
                                        </div>
                                    </div>
                                }) : null}
                                <div className="col-12 col-lg-12">
                                    <div className="card rounded-0 payment-method">
                                        <div className="row g-0">
                                            <div className="col-12 col-lg-12 bg-light">
                                                <div className="nav flex-column nav-pills">
                                                    <button
                                                        className="nav-link rounded-0"
                                                        data-bs-toggle="pill"
                                                        data-bs-target="#v-pills-home"
                                                        type="button" onClick={() => { setMode("COD") }}
                                                    >
                                                        <i className="bi bi-cash-stack me-2" />
                                                        Cash On Delivery
                                                    </button>
                                                    {
                                                        mode === "COD" ?
                                                            <i className='bi bi-check fw-bold' style={{
                                                                position: 'absolute',
                                                                right: 0,
                                                                fontSize: '40px'
                                                            }} /> : null
                                                    }

                                                    <button
                                                        className="nav-link rounded-0 border-bottom-0"
                                                        id="v-pills-settings-tab"
                                                        data-bs-toggle="pill"
                                                        data-bs-target="#v-pills-settings"
                                                        type="button" onClick={() => { setMode("Net Banking") }}
                                                    >
                                                        <i className="bi bi-bank2 me-2" />
                                                        Net Banking
                                                    </button>
                                                    {
                                                        mode === "Net Banking" ?
                                                            <i className='bi bi-check fw-bold' style={{
                                                                position: 'absolute',
                                                                right: 0,
                                                                top: 35,
                                                                fontSize: '40px'
                                                            }} /> : null
                                                    }

                                                </div>
                                            </div>

                                        </div>
                                        {/*end row*/}
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-lg-6 col-xl-6">
                                <div className="card rounded-0 mb-3">
                                    <div className="card-body">
                                        <h5 className="fw-bold mb-4">Order Summary</h5>
                                        {
                                            cart.length ?
                                                <table className='border table-bordered table-striped w-100'>
                                                    <thead>
                                                        <tr>
                                                            <th>Product</th>
                                                            <th>Price</th>
                                                            <th>Qty</th>
                                                            <th>Total</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            cart.map(item => {
                                                                return <tr key={item.id}>
                                                                    <td>{item.name}</td>
                                                                    <td>{item.price}</td>
                                                                    <td>{item.qty}</td>
                                                                    <td align="right">{item.total}</td>
                                                                </tr>
                                                            }

                                                            )
                                                        }
                                                    </tbody>

                                                </table>
                                                : null
                                        }
                                        <div className="hstack align-items-center justify-content-between">
                                            <p className="mb-0">Bag Total</p>
                                            <p className="mb-0">{subtotal}</p>
                                        </div>
                                        <hr />

                                        <div className="hstack align-items-center justify-content-between">
                                            <p className="mb-0">Delivery Charges</p>
                                            <p className="mb-0">{shipping}</p>
                                        </div>
                                        <hr />
                                        <div className="hstack align-items-center justify-content-between fw-bold text-content">
                                            <p className="mb-0">Total Amount</p>
                                            <p className="mb-0">{total}</p>
                                        </div>
                                        {
                                            CartStateData.length && outofstock === false ?
                                                <div className="d-grid mt-4">
                                                    <button
                                                        type="button"
                                                        className="btn btn-dark btn-ecomm py-3 px-5" onClick={() => placeOrder()}
                                                    >
                                                        Place Order
                                                    </button>
                                                </div> : <p className='mt-3 text-danger text-center '>One of Cart Item is Out of Stock. Please Remove from Cart<br /><Link to="/cart">Goto Cart to Remove</Link></p>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*end row*/}
                    </div>
                </section>
                {/*start product details*/}



            </div>
        </>
    )
}
