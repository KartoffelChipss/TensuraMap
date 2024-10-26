import React from "react";
import "./ErrorPage.scss";

interface ErrorPageProps {
    title?: string;
    message?: string;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ title, message }) => {
    return (
        <main className={"error"}>
            <img
                src={"/img/slime.svg"}
                alt={"Slime"}
                className={"slime"}
            />
            <h1>{title || "An Error occurred"}</h1>
            {message && <p>{message}</p>}
            <a
                className={"button"}
                href={"/"}
            >
                Main Page
            </a>
        </main>
    )
}

export default ErrorPage;