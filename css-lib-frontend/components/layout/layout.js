// REACT
import { Fragment } from 'react';

// OWN

function Layout(props) {
    return <Fragment>
        <main>{props.children}</main>
    </Fragment>
}
export default Layout;