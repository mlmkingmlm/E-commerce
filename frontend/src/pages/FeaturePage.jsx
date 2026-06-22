import React from 'react'
import Offer from '../component/Offer'
import Brands from '../component/Brands'
import Breadcrup from '../component/Breadcrup'

function FeaturePage() {
    return (
        <>
            <div className='page-content'>
                <Breadcrup title={"Features"}/>
                <Offer />
                <Brands />
            </div>
        </>
    )
}

export default FeaturePage
