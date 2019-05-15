import React from "react";
import Field from "./field";
import StartButton from "./startbutton";

export default function Play() {
    return (
        <div>
            <div className="fields-container">
                <Field myField={true} />
                <div className="pics-container">
                    <img className="pirates" src="/images/pirates-filled.png" />
                    <StartButton />
                    <img className="anchor" src="/images/anchor-filled.png" />
                </div>
                <Field myField={false} />
            </div>
        </div>
    );
}
