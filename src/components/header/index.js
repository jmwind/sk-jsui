import { Link } from 'preact-router/match';
import style from './style.css';

const Header = (props) => {
	return (
		<header class={style.header}>
			<h1>SignalK Widgets</h1>
			<nav>
				<button type="radio" onClick={props.themeCallback}>{props.theme == 'light' ? 'Dark' : 'Light'}</button>
				<Link activeClassName={style.active} href="/profile">Config</Link>
			</nav>
		</header>
	);
}

export default Header;
