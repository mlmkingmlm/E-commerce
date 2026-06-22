import React from 'react'
import { Link } from 'react-router-dom'
function Sidebar() {
    return (
        <>
        <div className="col-md-2 mb-2">
                            <div className="list-group bg-dark">
                                <Link to="/admin" className=" bg-dark list-group-item list-group-item-action active" aria-current="true">
                                  <i className='bi bi-house'></i>  Home
                                </Link>
                                <Link to="/admin/maincategory" className="bg-dark text-light list-group-item list-group-item-action">
                                    <i className='bi bi-grid'></i> MainCategory
                                </Link>
                                <Link to="/admin/subcategory" className="bg-dark text-light list-group-item list-group-item-action">
                                    <i className='bi bi-grid'></i> SubCategory
                                </Link>
                                <Link to="/admin/brand" className="bg-dark text-light list-group-item list-group-item-action">
                                    <i className='bi-gem'></i> Brand
                                </Link>
                                <Link to="/admin/product" className="bg-dark text-light list-group-item list-group-item-action">
                                    <i className='bi-bag'></i> Product
                                </Link>
                                <Link to="/admin/users" className="bg-dark text-light list-group-item list-group-item-action">
                                    <i className='bi-person'></i> Users
                                </Link>
                                <Link href="#" className="bg-dark text-light list-group-item list-group-item-action">
                                    <i className='bi-envelope'></i> NewsLetter
                                </Link>
                                <Link href="#" className="bg-dark text-light list-group-item list-group-item-action">
                                    <i className='bi-cart-check'></i> Checkout
                                </Link>
                                <Link to="/admin/faq" className="bg-dark text-light list-group-item list-group-item-action">
                                    <i className='bi-question-circle'></i> Faq
                                </Link>
                                <Link to="/admin/feature" className="bg-dark text-light list-group-item list-group-item-action">
                                    <i class="bi bi-star"></i> Features
                                </Link>
                                <Link to="/admin/setting" className="bg-dark text-light list-group-item list-group-item-action">
                                    <i class="bi bi-gear"></i> Setting
                                </Link>
                                <Link href="#" className="bg-dark text-light list-group-item list-group-item-action">
                                    <i className='bi-clipboard-data'></i> Orders
                                </Link>
                            </div>

                        </div>
        </>
    )
}

export default Sidebar
