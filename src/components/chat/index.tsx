import { Left } from "../../assets/icon/Left";
import styles from "./chat.module.scss"

export default function Chat() {

    return (
        <div className={styles.chatContainer}>
            <Left size={50} fill="currentColor" />
            <header className={styles.chatHeader}></header>
            <footer className={styles.chatFooter}></footer>
        </div>
    )
}