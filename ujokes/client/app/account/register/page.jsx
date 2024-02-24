import Banner from "../components/Banner";
import Rules from "../components/Rules";
import RegisterForm from "./RegisterForm";
import styles from "../account.module.css";

export default function RegisterPage() {
    return (
        <div>
            <Banner name={"Register"} />
            <div className={styles.parts}>
                <RegisterForm />
                <Rules />
            </div>
        </div>
    )
}