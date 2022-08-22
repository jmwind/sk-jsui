import { h } from 'preact';
import { useEffect, useState } from "preact/hooks";
import style from './style.css';
import { SkConversions } from 'sk-jsclient/sk-data';

const Home = (props) => {
	const [time, setTime] = useState(Date.now());
	const [count, setCount] = useState(10);
	const [metrics, setMetrics] = useState(props.metrics);

	useEffect(() => {
		let timer = setInterval(() => setTime(Date.now()), 1000);
		return () => clearInterval(timer);
	}, []);

	let aws = metrics['environment.wind.speedApparent'];
	let awa = metrics['environment.wind.angleApparent'];
	let sog = metrics['navigation.speedOverGround'];
	let aws_val = SkConversions.fromMetric(aws);
	let awa_val = SkConversions.fromMetric(awa);
	let sog_val = SkConversions.fromMetric(sog);

	return (
		<div class={style.home}>
			<div class={style.left}>
				<h1 class={style.h1}>{aws.nameMetric}</h1>
				<h2 class={style.h2}>{aws_val}</h2>
				<h3 class={style.h3}>{aws.nameUnit}</h3>
			</div>
			<div class={style.right}>
				<h1 class={style.h1_small}>{awa.nameMetric}</h1>
				<h2 class={style.h2_small}>{awa_val}</h2>
				<h3 class={style.h3_small}>{awa.nameUnit}</h3>
			</div>
			<div class={style.right}>
				<h1 class={style.h1_small}>{sog.nameMetric}</h1>
				<h2 class={style.h2_small}>{sog_val}</h2>
				<h3 class={style.h3_small}>{sog.nameUnit}</h3>
			</div>
		</div >
	);
}

export default Home;
