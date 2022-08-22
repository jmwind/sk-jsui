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

	const accept = () => {
		let aws = metrics['environment.wind.speedApparent'];
		let awa = metrics['environment.wind.angleApparent'];
		let sog = metrics['navigation.speedOverGround'];
		let aws_val = SkConversions.fromMetric(aws);
		let awa_val = SkConversions.fromMetric(awa);
		let sog_val = SkConversions.fromMetric(sog);
		console.log(`SOG: ${sog_val}${sog.nameUnit} AWS: ${aws_val}${aws.nameUnit} AWA: ${awa_val}${awa.nameUnit}`);
	}

	const createWebsocket = (url) => {
		return new WebSocket(url);
	}

	useEffect(() => {
		let client = new SkClient(createWebsocket);
		client.setState(metrics);
		client.on('delta', accept);
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
