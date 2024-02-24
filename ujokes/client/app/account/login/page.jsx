import Banner from '../components/Banner';
import LoginForm from './LoginForm';
import Rules from '../components/Rules';
import styles from '../account.module.css';

export default function LoginPage() {
    return (
        <>
        <Banner name={"Login"} />
        <div className={styles.parts}>
            <LoginForm />
            <Rules />
        </div>
        </>
    )
}