import './index.scss';

type HeaderProps = {
    header: string,
};

const Header = (props: HeaderProps) => {
    const { header } = props;
    return (
        <header>
            <h1>{header}</h1>
        </header>
    );
};

export default Header;