import AuthLayoutComponent from '../components/layouts/auth-laoyut'
import { LoginForm } from '../components/modules/login-module/form'

export default function LoginPage() {
  return (
    <AuthLayoutComponent>
      <LoginForm/>
    </AuthLayoutComponent>
  );
}
