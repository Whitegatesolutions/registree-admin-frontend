import Head from 'next/head'
import Image from 'next/image'
import AuthLayoutComponent from '../components/layouts/auth-laoyut'
import { LoginForm } from '../components/modules/login-module/form'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <AuthLayoutComponent>
      <LoginForm/>
    </AuthLayoutComponent>
  )
}
