import React from 'react';
import AdminMenu from "../../components/layout/AdminMenu"
import Layout from "../../components/layout/Layout";

const Users = () => {
  return (
    <>
    <Layout>
    <div className='containter-fluid m-3 p-3'>
    <div className='row'>
      <div className='col-md-3'>
          <AdminMenu/>
      </div>
      <div className='col-md-9'>
        <h1>Users</h1>
      </div>
    </div>
    </div>
    </Layout>
    </>
  );
};

export default Users;
