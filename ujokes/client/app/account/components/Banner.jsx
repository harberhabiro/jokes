import styles from '../account.module.css';

export default function Banner({name}) {
    return (
        <div className={styles.banner}>
            <h1>{name}</h1>
        </div>
    )
}