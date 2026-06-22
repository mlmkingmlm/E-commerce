import React, { useEffect, useState } from 'react'
import Sidebar from '../../../component/Sidebar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import FormValidator from "../../../../validators/FormValidators";
import ImageValidator from "../../../../validators/ImageValidator"
import { useDispatch } from 'react-redux'
import { getProduct, updateProduct } from '../../../Redux/ActionCreators/ProductActionCreator'
import { getMaincategory } from '../../../Redux/ActionCreators/MaincategoryActionCreator'
import { getSubcategory } from '../../../Redux/ActionCreators/SubcategoryActionCreator'
import { getBrand } from '../../../Redux/ActionCreators/BrandActionCreator'
import { GlobalModal } from '../../../component/StatusModal';
import { RESET_PRODUCT_STATUS } from '../../../Redux/Constants';


function AdminUpdateProduct() {
    let { data: ProductStateData, success, error, message } = useSelector(state => state.ProductStateData)
    let { data: MaincategoryStateData } = useSelector(state => state.MaincategoryStateData)
    let { data: SubcategoryStateData } = useSelector(state => state.SubcategoryStateData)
    let { data: BrandStateData } = useSelector(state => state.BrandStateData)
    let dispatch = useDispatch();
    const [data, setData] = useState({
        name: "",
        maincategory: "",
        subcategory: "",
        brand: "",
        color: [],
        size: [],
        basePrice: 0,
        discount: 0,
        finalPrice: 0,
        stock: true,
        stockQuantity: 0,
        description: "",
        pic: [],
        active: true
    });

    const [errorMessage, setErrorMessage] = useState({
        name: "",
        stockQuantity: "",
        basePrice: "",
        discount: "",
        pic: ""
    })

    const { id } = useParams();
    let navigate = useNavigate();
    let [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false)
    const [modal, setModal] = useState(false)
    const [modalType, setModalType] = useState("")

    function getInputData(e) {
        let name = e.target.name;
        var value = e.target.files ? Array.from(e.target.files) : e.target.value;

        setErrorMessage((old) => {
            return {
                ...old,
                [name]: name === "pic" ? ImageValidator(e) : FormValidator(e)
            }
        })
        setData((old) => ({
            ...old,
            [name]: name === "stock" || name === "active"
                ? value === "1" ? true : false
                : name === "stockQuantity" || name === "basePrice" || name === "discount"
                    ? Number(value)    // 👈 convert string → number
                    : value,
        }))
    }

    function getInputColor_Size(e, field) {
        const { name } = e.target;

        setData((prev) => {
            if (field === "Color") {
                return {
                    ...prev,
                    color: prev.color.includes(name)
                        ? prev.color.filter((c) => c !== name) // remove
                        : [...prev.color, name]                // add
                };
            } else {
                return {
                    ...prev,
                    size: prev.size.includes(name)
                        ? prev.size.filter((s) => s !== name)  // remove
                        : [...prev.size, name]                 // add
                };
            }
        });
    }

    useEffect(() => {
        dispatch(getMaincategory())
        dispatch(getSubcategory())
        dispatch(getBrand())
    }, [])

    function getAPIdata() {
        dispatch(getProduct());
        if (ProductStateData.length) {
            let item = (ProductStateData || []).find(x => x._id == id);
            if (item) {
                setData({ ...data, ...item })
            }
            else {
                navigate("/admin/product")
            }
        }
    }

    function postData(e) {
        e.preventDefault();
        let bp = Number.parseInt(data.basePrice)
        let d = Number.parseInt(data.discount)
        let fp = parseInt(bp - bp * d / 100)
        let sq = Number.parseInt(data.stockQuantity)

        // ✅ Check if at least one image exists
        if (!data.pic || data.pic.length === 0) {
            setErrorMessage((old) => ({
                ...old,
                pic: "Pic is required"
            }));
            setShow(true);
            return;  // stop submission
        }

        let error = Object.values(errorMessage).find((x) => x !== "")
        if (error) {
            setShow(true)
        } else {
            const formData = new FormData()

            formData.append("name", data.name)
            formData.append("basePrice", bp)
            formData.append("discount", d)
            formData.append("finalPrice", fp)
            formData.append("stockQuantity", data.stockQuantity)
            formData.append("description", data.description)
            formData.append("stock", data.stock)
            formData.append("active", data.active)
            data.color.forEach(c => formData.append("color", c))
            data.size.forEach(s => formData.append("size", s))

            formData.append("maincategory", data.maincategory)
            formData.append("subcategory", data.subcategory)
            formData.append("brand", data.brand)

            data.pic.forEach(file => {
                formData.append("pics", file)
            })

            setLoading(true)
            dispatch(updateProduct({ data: formData, id }))
        }
    }


    useEffect(() => {
        getAPIdata()
    }, [id])

    useEffect(() => {
        if (success) {
            setModalType("success");
            setModal(true)
        }
        else if (error) {
            setModalType("error");
            setModal(true)
        }
    }, [success, error])

    function handleViewList() {
        setModal(false)
        dispatch({ type: RESET_PRODUCT_STATUS })
        navigate("/admin/product")
    }

    function handleStay() {
        setModal(false)
        dispatch({ type: RESET_PRODUCT_STATUS })
    }
    return (
        <>
            <div className="page-content">

                <div className="container-fluid my-2">
                    <div className="row">
                        <Sidebar />
                        <div className="col-md-9">
                            <h5 className='text-light bg-dark p-2 text-center'>Update Product
                                <Link to="/admin/product"> <i className="bi bi-arrow-left float-end text-light"></i></Link></h5>
                            <div className="row">
                                <form onSubmit={postData}>
                                    <div className='mb-3'>
                                        <label>Name*</label>
                                        <input type="text" value={data.name} placeholder="Product" name="name" onChange={getInputData} className={`form-control ${show && errorMessage.name ? 'border-danger' : 'border-dark'}`} />

                                        {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : ""}
                                    </div>
                                    <div className="row">
                                        <div className="col-md-3 mb-3">
                                            <label>Maincategory*</label>
                                            <select name="maincategory" value={data.maincategory} className='form-select text-dark' onChange={getInputData}>
                                                {
                                                    MaincategoryStateData.map((item) => {
                                                        return <option key={item.id}>{item.name}</option>
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className="col-md-3 mb-3">
                                            <label>Subcategory*</label>
                                            <select name="subcategory" value={data.subcategory} className='form-select text-dark' onChange={getInputData}>
                                                {
                                                    SubcategoryStateData.map((item) => {
                                                        return <option key={item.id}>{item.name}</option>
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className="col-md-3 mb-3">
                                            <label>Brand*</label>
                                            <select name="brand" className='form-select text-dark' value={data.brand} onChange={getInputData}>
                                                {
                                                    BrandStateData.map((item) => {
                                                        return <option key={item.id}>{item.name}</option>
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className="col-md-3 mb-3">
                                            <label>Stock*</label>
                                            <select name="stock" value={data.stock ? "1" : "0"} className='form-select text-dark' onChange={getInputData}>
                                                <option value="1">Yes</option>
                                                <option value="0">No</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-4">
                                            <label>Base Price*</label>
                                            <input type="number" placeholder="BasePrice" value={data.basePrice} name="basePrice" onChange={getInputData} className={`form-control ${show && errorMessage.basePrice ? 'border-danger' : 'border-dark'}`} />
                                            {show && errorMessage.basePrice ? <p className='text-danger'>{errorMessage.basePrice}</p> : ""}

                                        </div>
                                        <div className="col-md-4">
                                            <label>Discount*</label>
                                            <input type="text" placeholder="Discount" value={data.discount} name="discount" onChange={getInputData} className={`form-control ${show && errorMessage.discount ? 'border-danger' : 'border-dark'}`} />
                                            {show && errorMessage.discount ? <p className='text-danger'>{errorMessage.discount}</p> : ""}

                                        </div>
                                        <div className="col-md-4">
                                            <label>StockQuantity*</label>
                                            <input type="number" placeholder="StockQuantity" name="stockQuantity" onChange={getInputData} value={data.stockQuantity} className={`form-control ${show && errorMessage.stockQuantity ? 'border-danger' : 'border-dark'}`} />
                                            {show && errorMessage.stockQuantity ? <p className='text-danger'>{errorMessage.stockQuantity}</p> : ""}

                                        </div>
                                    </div>

                                    <label>Choose Color*</label>
                                    <div className="form-control border-dark mb-2">
                                        <div className="row mb-3">
                                            <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6">
                                                <input type="checkbox" checked={data.color.includes("blue")} onChange={(e) => getInputColor_Size(e, "Color")} value={data.color} name="blue" /><label>&nbsp;Blue</label>
                                            </div>

                                            <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6">
                                                <input type="checkbox" checked={data.color.includes("white")} onChange={(e) => getInputColor_Size(e, "Color")} value={data.color} name="white" /><label>&nbsp;White</label>
                                            </div>
                                            <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6">
                                                <input type="checkbox" checked={data.color.includes("yellow")} onChange={(e) => getInputColor_Size(e, "Color")} value={data.color} name="yellow" /><label>&nbsp;Yellow</label>
                                            </div>
                                            <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6">
                                                <input type="checkbox" checked={data.color.includes("aqua")} onChange={(e) => getInputColor_Size(e, "Color")} value={data.color} name="aqua" /><label>&nbsp;Aqua</label>
                                            </div>
                                            <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6">
                                                <input type="checkbox" checked={data.color.includes("green")} onChange={(e) => getInputColor_Size(e, "Color")} value={data.color} name="green" /><label>&nbsp;Green</label>
                                            </div>
                                            <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6">
                                                <input type="checkbox" checked={data.color.includes("black")} onChange={(e) => getInputColor_Size(e, "Color")} value={data.color} name="black" /><label>&nbsp;Black</label>
                                            </div>

                                            <div className="row mb-3">
                                                <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6">
                                                    <input type="checkbox" checked={data.color.includes("orange")} onChange={(e) => getInputColor_Size(e, "Color")} value={data.color} name="orange" /><label>&nbsp;Orange</label>
                                                </div>
                                                <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6">
                                                    <input type="checkbox" checked={data.color.includes("violet")} onChange={(e) => getInputColor_Size(e, "Color")} value={data.color} name="violet" /><label>&nbsp;Violet</label>
                                                </div>
                                                <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6">
                                                    <input type="checkbox" checked={data.color.includes("pink")} onChange={(e) => getInputColor_Size(e, "Color")} value={data.color} name="pink" /><label>&nbsp;Pink</label>
                                                </div>
                                                <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6">
                                                    <input type="checkbox" checked={data.color.includes("grey")} onChange={(e) => getInputColor_Size(e, "Color")} value={data.color} name="grey" /><label>&nbsp;Grey</label>
                                                </div>
                                                <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6">
                                                    <input type="checkbox" checked={data.color.includes("brown")} onChange={(e) => getInputColor_Size(e, "Color")} value={data.color} name="brown" /><label>&nbsp;Brown</label>
                                                </div>
                                                <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6">
                                                    <input type="checkbox" checked={data.color.includes("maroon")} onChange={(e) => getInputColor_Size(e, "Color")} value={data.color} name="maroon" /><label>&nbsp;Maroon</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <label>Choose Size*</label>
                                    <div className="form-control border-dark mb-2">
                                        <div className="row mb-3">
                                            <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6">
                                                <input type="checkbox" checked={data.size.includes("s")} onChange={(e) => getInputColor_Size(e, "Size")} value={data.size} name="s" /><label>&nbsp;S</label>
                                            </div>

                                            <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6">
                                                <input type="checkbox" checked={data.size.includes("m")} onChange={(e) => getInputColor_Size(e, "Size")} value={data.size} name="m" /><label>&nbsp;M</label>
                                            </div>
                                            <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6">
                                                <input type="checkbox" checked={data.size.includes("l")} onChange={(e) => getInputColor_Size(e, "Size")} value={data.size} name="l" /><label>&nbsp;L</label>
                                            </div>
                                            <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6">
                                                <input type="checkbox" checked={data.size.includes("xL")} onChange={(e) => getInputColor_Size(e, "Size")} value={data.size} name="xL" /><label>&nbsp;XL</label>
                                            </div>
                                            <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6">
                                                <input type="checkbox" checked={data.size.includes("xxl")} onChange={(e) => getInputColor_Size(e, "Size")} value={data.size} name="xxl" /><label>&nbsp;XXL</label>
                                            </div>
                                            <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6">
                                                <input type="checkbox" checked={data.size.includes("xxxl")} onChange={(e) => getInputColor_Size(e, "Size")} value={data.size} name="xxxl" /><label>&nbsp;XXXL</label>
                                            </div>


                                        </div>
                                    </div>
                                    {/* <div className='form-control border-dark mb-3' >
                                        <div ref={refdiv} >

                                        </div>

                                    </div> */}

                                    <div className="row">
                                        <div className='col-md-6 mb-3'>
                                            <label>Pic*</label>
                                            <input type="file" name="pic" multiple onChange={getInputData} className={`form-control ${show && errorMessage.pic ? 'border-danger' : 'border-dark'}`} />

                                            {show && errorMessage.pic ? <p className='text-danger'>{errorMessage.pic}</p> : ""}
                                        </div>
                                        <div className='col-md-6 mb-3'>
                                            <label>Pic(click on pic to Delete)</label>
                                            <div>
                                                {
                                                    data.pic?.map((item, index) => {
                                                        return <img
                                                            onClick={() => {
                                                                setData((prev) => ({
                                                                    ...prev,
                                                                    pic: prev.pic.filter((_, i) => i !== index) // immutably remove image
                                                                }));
                                                            }}
                                                            src={`${import.meta.env.VITE_SITE_IMG_SERVER}/${item}`}
                                                            height={80}
                                                            width={80}
                                                            className='me-1 mb-1'
                                                            alt="product-image"
                                                            key={index}
                                                        />

                                                    })
                                                }
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label >Active*</label>
                                            <select name="active" value={data.active ? "1" : "0"} className='form-select' onChange={getInputData}>
                                                <option value="1">Yes</option>
                                                <option value="0">No</option>
                                            </select>

                                        </div>
                                    </div>

                                    <div className='col-12 mb-3'>
                                        <button type="submit" className='btn btn-dark text-light w-100'>Update Category</button>
                                    </div>


                                </form>

                            </div>
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
                action={modalType === "success" ? "edit" : "error"}
                name={data.name}
                message={modalType === "error" ? error : message}
                onPrimary={modalType === "success" ? handleViewList : () => setModal(false)}
                onSecondary={modalType === "success" ? handleStay : null}
            />
        </>
    )
}

export default AdminUpdateProduct
