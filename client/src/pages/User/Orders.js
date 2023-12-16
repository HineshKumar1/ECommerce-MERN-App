import React from 'react'
import Layout from "../../components/layout/Layout";
import UserMenu from '../../components/layout/UserMenu';

function Orders() {
  return (
    <>
    <Layout title={"Dashboard - Orders"}>
    <div className='containter-fluid m-3 p-3'>
    <div className='row'>
      <div className='col-md-3'>
         <UserMenu />
      </div>
      <div className='col-md-9'>
        <h1>Orders</h1>
      </div>
    </div>
    </div>
    </Layout>
    </>
  )
}

export default Orders