import React from 'react'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

function UserSidebar({ color, tabname }) {

  return (
    <>
      <div className="offcanvas-body account-menu">
        <div className="list-group w-100 rounded-0">
          <NavLink to="/dashboard" className={({ isActive }) =>
              isActive ? "list-group-item active" : "list-group-item"
            } >
            <i className="bi bi-house-door me-2" />
            Dashboard
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? "list-group-item active" : "list-group-item"
            }
          >
            <i className='bi bi-person me-2'></i>
            Profile
          </NavLink>
          <NavLink
            to="/update-profile"
            className={({ isActive }) =>
              isActive ? "list-group-item active" : "list-group-item"
            }
          >
            <i className="bi bi-pencil me-2" />
            Edit Profile
          </NavLink>
          <NavLink
            to="/address"
            className={({ isActive }) =>
              isActive ? "list-group-item active" : "list-group-item"
            }
          >
            <i className="bi bi-pin-map me-2" />
            Saved Address
          </NavLink>
          <NavLink to="/orders" className={({ isActive }) =>
              isActive ? "list-group-item active" : "list-group-item"
            }>
            <i className="bi bi-basket3 me-2" />
            Orders
          </NavLink>
          <NavLink to="/wishlist" className={({ isActive }) =>
              isActive ? "list-group-item active" : "list-group-item"
            }>
            <i className="bi bi-suit-heart me-2" />
            Wishlist
          </NavLink>
          <NavLink
            to="/logout"
            className={({ isActive }) =>
              isActive ? "list-group-item active" : "list-group-item"
            }
          >
            <i className="bi bi-power me-2" />
            Logout
          </NavLink>
        </div>
      </div>
    </>
  )
}

export default UserSidebar
