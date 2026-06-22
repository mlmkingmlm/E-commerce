import React from 'react'
import Breadcrup from '../../component/Breadcrup'
import { Link } from 'react-router-dom'
import Sidebar from '../../component/Sidebar'


function AdminHomePage() {
    return (
        <>
            <div className="page-content">
                <Breadcrup title="Admin-Page"/>
                <div className="container-fluid my-3">
                    <div className="row">
                        <Sidebar/>
                        <div className="col-md-10">
                                <h5 className='text-center text-light bg-dark p-2 fw-bold'>Admin Home Page</h5>
                            <div className="row border border-secondary p-2">
                                <div className="col-4 mb-2">
                                    <img src="/assets/images/avatars/download.png" style={{width:"100%"}} alt="" />
                                </div>
                                <div className="col-md-8">
                                    <table className='table table-bordered'>
                                        <tbody>
                                            <tr>
                                                <th>Name</th>
                                                <td>Naveen Kumar</td>
                                            </tr>
                                            <tr>
                                                <th>Username</th>
                                                <th>Developer</th>
                                            </tr>
                                            <tr>
                                                <th>Email</th>
                                                <td>Naveen123@gmail.com</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <button className='btn btn-dark w-100'>Update Profile</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminHomePage
