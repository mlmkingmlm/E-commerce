import React, { useState, useEffect, useRef } from 'react'
import Breadcrup from '../../../component/Breadcrup'
import Sidebar from '../../../component/Sidebar'
import { Link, useNavigate } from 'react-router-dom'
import ImageValidator from '../../../../validators/ImageValidator'
import FormValidators from "../../../../validators/FormValidators"
import { useDispatch, useSelector } from 'react-redux'
import { createProduct } from '../../../Redux/ActionCreators/ProductActionCreator'
import { getMaincategory } from '../../../Redux/ActionCreators/MaincategoryActionCreator'
import { getSubcategory } from '../../../Redux/ActionCreators/SubcategoryActionCreator'
import { getBrand } from '../../../Redux/ActionCreators/BrandActionCreator'
import { GlobalModal } from '../../../component/StatusModal'
import { RESET_PRODUCT_STATUS } from "../../../Redux/Constants"

function AdminProductCreatePage() {

    let { data: MaincategoryStateData } = useSelector(state => state.MaincategoryStateData)
    let { data: SubcategoryStateData } = useSelector(state => state.SubcategoryStateData)
    let { data: BrandStateData } = useSelector(state => state.BrandStateData)
    let { success, message, error } = useSelector(state => state.ProductStateData)

    let dispatch = useDispatch();
    let navigate = useNavigate();
    const formRef = useRef();

    let [data, setData] = useState({
        name: "",
        maincategory: "",
        subcategory: "",
        brand: "",
        color: [],
        size: [],
        stockQuantity: 0,
        basePrice: 0,
        discount: 0,
        finalPrice: 0,
        description: "",
        stock: true,
        pics: [], // 🔥 FIX
        active: true
    })

    let [errorMessage, setErrorMessage] = useState({
        name: "Name Field is Mandatory",
        basePrice: "BasePrice Field Is Mandatory",
        discount: "Discount Field Is Mandatory",
        stockQuantity: "StockQuantity Field Is Mandatory",
        pics: "Image Field is Mandatory"
    })

    let [show, setShow] = useState(false)
    const [loading, setLoading] = useState(false)
    const [modal, setModal] = useState(false)
    const [modalType, setModalType] = useState("")

    // ✅ FIXED INPUT HANDLER
    function getInputData(e) {
        let name = e.target.name
        let value = e.target.files ? Array.from(e.target.files) : e.target.value

        setErrorMessage((old) => ({
            ...old,
            [name === "pic" ? "pics" : name]:
                name === "pic" ? ImageValidator(e) : FormValidators(e)
        }))

        setData((old) => ({
            ...old,
            [name === "pic" ? "pics" : name]:
                name === "active" ? (value === "1" ? true : false) :
                    name === "stock" ? (value === "1" ? true : false) :
                        value
        }))
    }

    // ✅ COLOR SIZE SAME
    function getInputColor_Size(e, field) {
        const { name } = e.target;

        setData(prev => {
            if (field === "Color") {
                return {
                    ...prev,
                    color: prev.color.includes(name)
                        ? prev.color.filter(c => c !== name)
                        : [...prev.color, name]
                };
            } else {
                return {
                    ...prev,
                    size: prev.size.includes(name)
                        ? prev.size.filter(s => s !== name)
                        : [...prev.size, name]
                };
            }
        });
    }

    useEffect(() => {
        dispatch(getMaincategory())
        dispatch(getSubcategory())
        dispatch(getBrand())
    }, [])

    // ✅ FIXED SUBMIT (FORMDATA)
    function postData(e) {
        e.preventDefault()

        let bp = parseInt(data.basePrice)
        let d = parseInt(data.discount)
        let fp = parseInt(bp - bp * d / 100)
        let stockQuantity = parseInt(data.stockQuantity)

        let errorCheck = Object.values(errorMessage).find(x => x !== "")

        if (errorCheck) {
            setShow(true)
        } else {

            const formData = new FormData()

            formData.append("name", data.name)
            formData.append("basePrice", bp)
            formData.append("discount", d)
            formData.append("finalPrice", fp)
            formData.append("stockQuantity", stockQuantity)
            formData.append("description", data.description)
            formData.append("stock", data.stock)
            formData.append("active", data.active)
            data.color.forEach(c => formData.append("color", c))
            data.size.forEach(s => formData.append("size", s))

            formData.append("maincategory", data.maincategory || MaincategoryStateData[0].name)
            formData.append("subcategory", data.subcategory || SubcategoryStateData[0].name)
            formData.append("brand", data.brand || BrandStateData[0].name)

            data.pics.forEach(file => {
                formData.append("pics", file)
            })

            setLoading(true)
            dispatch(createProduct(formData))
        }
    }

    // ✅ SUCCESS / ERROR MODAL
    useEffect(() => {
        console.log(success, error)
        if (success) {
            setLoading(false)
            setModalType("success")
            setModal(true)
        }
        if (error) {
            console.log("error")
            setLoading(false)
            setModalType("error")
            setModal(true)
        }
    }, [success, error])

    function handleViewList() {
        setModal(false)
        dispatch({ type: RESET_PRODUCT_STATUS })
        navigate("/admin/product")
    }

    function handleAddAnother() {
        setModal(false)
        dispatch({ type: RESET_PRODUCT_STATUS })
        setShow(false)
        setData({
            name: "", maincategory: "", subcategory: "", brand: "",
            color: [], size: [], stockQuantity: 0,
            basePrice: 0, discount: 0, finalPrice: 0,
            description: "", stock: true, pics: [], active: true
        })
        if (formRef.current) formRef.current.reset()
    }

    return (
        <>
            <div className="page-content">
                <Breadcrup title="Product-CreatePage" />
                <div className="container-fluid my-2">
                    <div className="row">
                        <Sidebar />
                        <div className="col-md-10">
                            <h5 className='text-light bg-dark p-2 text-center'>
                                Create Product
                                <Link to="/admin/product">
                                    <i className="bi bi-arrow-left float-end text-light"></i>
                                </Link>
                            </h5>

                            <form onSubmit={postData} ref={formRef}>
                                <div className='mb-3'>
                                    <label>Name*</label>
                                    <input type="text" value={data.name} placeholder="Product" name="name" onChange={getInputData} className={`form-control ${show && errorMessage.name ? 'border-danger' : 'border-dark'}`} />

                                    {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : ""}
                                </div>
                                <div className="row">
                                    <div className="col-md-3 mb-3">
                                        <label htmlFor="" className='form-label'>Maincategory*</label>
                                        <select className='form-select' onChange={getInputData} name="maincategory">
                                            {MaincategoryStateData.map((category) => {
                                                return <option key={category.id}>{category.name}</option>
                                            })}
                                        </select>
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <label htmlFor="" className='form-label'>Subcategory*</label>
                                        <select className='form-select' onChange={getInputData} name="subcategory">
                                            {SubcategoryStateData.map((category) => {
                                                return <option key={category.id}>{category.name}</option>
                                            })}
                                        </select>
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <label htmlFor="" className='form-label'>Brands*</label>
                                        <select className='form-select' name='brand' onChange={getInputData}>
                                            {BrandStateData.map((category) => {
                                                return <option key={category.id}>{category.name}</option>
                                            })}
                                        </select>
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <label htmlFor="" className='form-label'>Stock*</label>
                                        <select className='form-select' name='stock' onChange={getInputData}>
                                            <option value="1">Yes</option>
                                            <option value="0">No</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="" className='form-lable'>BasePrice*</label>
                                        <input type="number" value={data.basePrice} className={`form-control ${show && errorMessage.basePrice ? 'border-danger' : 'border-dark'}`} onChange={getInputData} placeholder='Enter base price' name='basePrice' />
                                        {show && errorMessage.basePrice ? <p className='text-danger'>{errorMessage.basePrice}</p> : ""}
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="" className='form-lable'>Discount*</label>
                                        <input type="text" value={data.discount} className={`form-control ${show && errorMessage.discount ? 'border-danger' : 'border-dark'}`} onChange={getInputData} placeholder='Enter Discount' name='discount' />
                                        {show && errorMessage.discount ? <p className='text-danger'>{errorMessage.discount}</p> : ""}
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="" className='form-lable'>StockQunatity*</label>
                                        <input type="number" value={data.stockQuantity} className={`form-control ${show && errorMessage.stockQuantity ? 'border-danger' : 'border-dark'}`} onChange={getInputData} placeholder='Enter Stock Quantity' name='stockQuantity' />
                                        {show && errorMessage.stockQuantity ? <p className='text-danger'>{errorMessage.stockQuantity}</p> : ""}
                                    </div>
                                </div>
                                <label>Choose Color*</label>
                                <div className="form-control border-dark mb-2">
                                    <div className="row mb-3">
                                        {["blue", "white", "yellow", "aqua", "green", "black", "orange", "violet", "pink", "grey", "brown", "maroon"].map((color) => (
                                            <div key={color} className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6">
                                                <input
                                                    type="checkbox"
                                                    name={color}
                                                    checked={data.color.includes(color)}
                                                    onChange={(e) => getInputColor_Size(e, "Color")}
                                                />
                                                <label>&nbsp;{color.charAt(0).toUpperCase() + color.slice(1)}</label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <label>Choose Size*</label>
                                <div className="form-control border-dark mb-2">
                                    <div className="row mb-3">
                                        {["s", "m", "l", "xl", "xxl", "xxxl"].map((size) => (
                                            <div key={size} className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6">
                                                <input
                                                    type="checkbox"
                                                    name={size}
                                                    checked={data.size.includes(size)}
                                                    onChange={(e) => getInputColor_Size(e, "Size")}
                                                />
                                                <label>&nbsp;{size.toUpperCase()}</label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="row mt-3">
                                    <div className='col-md-6 mb-3'>
                                        <label>Pic*</label>
                                        <input type="file" multiple name="pic" onChange={getInputData} className={`form-control ${show && errorMessage.pics ? 'border-danger' : 'border-dark'}`} />

                                        {show && errorMessage.pics ? <p className='text-danger'>{errorMessage.pics}</p> : ""}
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label >Active*</label>
                                        <select name="active" className='form-select' onChange={getInputData}>
                                            <option value="1">Yes</option>
                                            <option value="0">No</option>
                                        </select>

                                    </div>
                                </div>

                                <div className='col-12 mb-3'>
                                    <button type="submit" className='btn btn-dark text-light w-100'>{loading?'Creating Product': "Create Product"}</button>
                                </div>


                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <GlobalModal
                isOpen={modal}
                onClose={() => {
                    setModal(false)
                    dispatch({ type: RESET_PRODUCT_STATUS })
                }}
                module="Product"
                action={modalType === "success" ? "add" : "error"}
                name={data.name}
                message={modalType === "error" ? error : message}
                onPrimary={modalType === "success" ? handleViewList : () => setModal(false)}
                onSecondary={modalType === "success" ? handleAddAnother : null}
            />
        </>
    )
}

export default AdminProductCreatePage