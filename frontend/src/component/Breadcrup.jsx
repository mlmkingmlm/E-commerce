import React from 'react'

function Breadcrup(props) {
    return (
        <>
         {/*start breadcrumb*/}
    <div className="py-4 border-bottom">
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item">
              <a href="javascript:;">Home</a>
            </li>
            <li className="breadcrumb-item">
              <a href="javascript:;">Pages</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {props.title}
            </li>
          </ol>
        </nav>
      </div>
    </div>
    {/*end breadcrumb*/}
        </>
    )
}

export default Breadcrup
