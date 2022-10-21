import React from "react";
import styles from "./loading.css";

const Loading = () => {

    return (
        <div className={styles.wrapper}>
            <img src="/images/loading.svg" className={styles.loadingImage} alt="loading"/>
        </div>
    )
}

export default Loading;