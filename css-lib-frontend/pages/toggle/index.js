import { useState } from "react";
import ThemeToggle from "../../components/theme-toggle/ThemeToggle";
export default function Toggle() {

    return (
        <div className="toggle-container">
            <main>
                <h1>Next.js dark mode toggle</h1>
                <h4>Dark mode is more than just a gimmick, right?!</h4>
                <ThemeToggle />
            </main>
        </div>
    );
}