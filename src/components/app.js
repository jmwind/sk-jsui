import { h, render } from 'preact';
import { Router } from 'preact-router';

import Header from './header';
import './index.css';
import SkClient from 'sk-jsclient/sk-client';
import { SkData, SkPolars, CATALINA_36_POLARS } from 'sk-jsclient/sk-data';

// Code-splitting is automated for `routes` directory
import Home from '../routes/home';
import Profile from '../routes/profile';
import { useEffect, useState } from 'preact/hooks';

const App = () => {
	const [metrics, setMetrics] = useState(SkData.newMetrics());
	const [theme, setTheme] = useState("light");

	const createWebsocket = (url) => {
		return new WebSocket(url);
	}

	useEffect(() => {
		let client = new SkClient(createWebsocket);
		client.setState(metrics);
		client.setPolars(SkPolars.readFromFileContents(CATALINA_36_POLARS));
		client.connect();
		return () => {
			client.off('delta');
			client.disconnect();
		}
	}, []);

	const themeCallback = () => {
		theme == "dark" ? setTheme("light") : setTheme("dark");
	}

	return (
		<div id="app" data-theme={theme}>
			<Header theme={theme} themeCallback={themeCallback} />
			<Router>
				<Home path="/" msg="Speed Ratio" metrics={metrics} theme={theme} />
				<Profile path="/profile" />
			</Router>
		</div>
	);
}

export default App;
