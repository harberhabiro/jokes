import styles from '../account.module.css';

export default function Rules() {
    return (
        <div className={styles.rules}>
            <p>Rules & information</p>
            <p className={styles.ruleInfo}>Hi! To ensure that this is a great place for everyone to have a wondeful time, we have some rules. Breaking them might result in a suspension or permanent ban from the site.</p>
            <ol>
                <li>
                    <p className={styles.listNumber}>01-</p>
                    <p className={styles.listText}>Don't do anything stupid</p>
                </li>
                <li>
                    <p className={styles.listNumber}>02-</p>
                    <p className={styles.listText}>Follow State & Federal laws</p>
                </li>
                <li>
                    <p className={styles.listNumber}>03-</p>
                    <p className={styles.listText}>Do not repost from all time top list.</p>
                </li>
                <li>
                    <p className={styles.listNumber}>04-</p>
                    <p className={styles.listText}>No posting personal information.</p>
                </li>
                <li>
                    <p className={styles.listNumber}>05-</p>
                    <p className={styles.listText}>Reposts and duplicate jokes are not allowed.</p>
                </li>
                <li>
                    <p className={styles.listNumber}>06-</p>
                    <p className={styles.listText}>Child Exploitation content</p>
                </li>
                <li>
                    <p className={styles.listNumber}>07-</p>
                    <p className={styles.listText}>As a measure to prevent spam, we are limiting the number of jokes a user can submit</p>
                </li>
                <li>
                    <p className={styles.listNumber}>08-</p>
                    <p className={styles.listText}>Meta posts are not allowed, however you can contact admin or a moderator.</p>
                </li>
                <li>
                    <p className={styles.listNumber}>09-</p>
                    <p className={styles.listText}>Content designed to intimidate a person or group by any means including, doxxing, murder or injury, rape, harrasment etc.</p>
                </li>
                <li>
                    <p className={styles.listNumber}>10-</p>
                    <p className={styles.listText}>Promoting false information</p>
                </li>
            </ol>
        </div>
    )
}