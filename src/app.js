import React from "react";
import Field from "./field";

export default function App() {
    return (
        <div>
            <div className="fields-container">
                <Field myField={true} />
                <div className="pics-container">
                    <img className="pirates" src="/images/pirates-filled.png" />
                    <img className="anchor" src="/images/anchor-filled.png" />
                </div>
                <Field myField={false} />
            </div>
        </div>
    );
}
