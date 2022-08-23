import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style.css';
import ToggleButton from '../toggle/toggle'

const Header = (props) => {
	let background = props.theme == 'light' ? 'white' : 'black';
	return (
		<header class={style.header}>
			<h1>SignalK Widgets</h1>
			<nav>
				<button type="radio" style={{ backgroundColor: background }} onClick={props.themeCallback}>{props.theme == 'light' ? '🌞' : '🌓'}</button>
				<Link activeClassName={style.active} href="/profile">⚙️</Link>
			</nav>
		</header>
	);
}

export default Header;
