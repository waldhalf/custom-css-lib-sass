import Image from 'next/image';
import Link from 'next/link';

function Footer() {
    return (<footer className="footer">
        <Link href="/">
            <a><Image src="/images/logo_imalab.png" width={50} height={50} alt="logo-imalab" /></a>
        </Link>
        &copy; 2021
    </footer>)
}

export default Footer;