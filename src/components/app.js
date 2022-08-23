import { h, render } from 'preact';
import { Router } from 'preact-router';

import Header from './header';
import SkClient from 'sk-jsclient/sk-client';
import { SkData, SkConversions } from 'sk-jsclient/sk-data';

// Code-splitting is automated for `routes` directory
import Home from '../routes/home';
import { useEffect, useState } from 'preact/hooks';

const App = () => {
	const [metrics, setMetrics] = useState(SkData.newMetrics());

	const createWebsocket = (url) => {
		return new WebSocket(url);
	}

	useEffect(() => {
		let client = new SkClient(createWebsocket);
		client.setState(metrics);
		client.on('delta', () => { });
		client.connect();
		return () => {
			client.off('delta');
			client.disconnect();
		}
	}, []);

	return (
		<div id="app">
			<Header />
			<Router>
				<Home path="/" msg="Speed Ratio" metrics={metrics} />
			</Router>
		</div>
	);
}

export default App;
