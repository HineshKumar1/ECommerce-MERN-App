import React from 'react'
import Layout from '../components/layout/Layout'
import { useAuth } from '../components/context/auth'
import { json } from 'react-router-dom';

function HomePage() {
  const [auth,setAuth] = useAuth();
  return (
    <Layout>
        <pre>{JSON.stringify(auth,null,4)}</pre>
    </Layout>
  )
}

export default HomePage