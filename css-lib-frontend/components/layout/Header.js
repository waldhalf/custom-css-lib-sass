
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

function Header(props) {
    // SOURCE POUR LE TOGGLE (AVEC ADAPTATION)
    // https://electricanimals.com/articles/next-js-dark-mode-toggle

    const { title, subtitle } = props;
    const [activeTheme, setActiveTheme] = useState(document.body.dataset.theme);
    const inactiveTheme = activeTheme === "light" ? "dark" : "light";
    let isCheckedDark = activeTheme === "dark" ? true : false;
    let isCheckedLight = activeTheme === "light" ? true : false;

    useEffect(() => {
        document.body.dataset.theme = activeTheme;
        window.localStorage.setItem("theme", activeTheme);
    }, [activeTheme]);

    function onChangeHandler(event) {
        setActiveTheme(inactiveTheme)
    }

    return (<header className="header container">
        <div className="header__elem">

            <Link href="/">
                <a><Image src="/images/logo imalab.png" width={50} height={50} alt="logo-imalab" /></a>
            </Link>
        </div>

        <div className="header__elem">
            <div className="header__title">
                <h1>{title}</h1>
                <span className="header__subtitle">{subtitle}</span>
            </div>
        </div>
        <div className="header__elem">
            <fieldset
                className="header__toggle toggle"
                aria-label="theme toggle"
                role="radiogroup"
            >
                <label htmlFor="dark">Dark Mode</label>
                <div className="toggle__wrapper" >
                    <input type="radio" name="theme" id="dark" onChange={onChangeHandler} checked={isCheckedDark} />
                    <input type="radio" name="theme" id="light" onChange={onChangeHandler} checked={isCheckedLight} />
                    <span aria-hidden="true" className="toggle__background"></span>
                    <span aria-hidden="true" className="toggle__button"></span>
                </div>
            </fieldset>
        </div>
    </header>)
}

export default Header;