import { h } from 'preact';
import { useEffect, useState, useRef } from "preact/hooks";
import style from './style.css';
import { SkConversions } from 'sk-jsclient/sk-data';
import Metric from '../../components/metric/metric';

const Home = (props) => {
	const [metrics, setMetrics] = useState(props.metrics);

	return (
		<div class={style.home}>
			<div class={style.left}>
				<Metric metrics={metrics} metric_name='navigation.speedOverGround' large={true} />
			</div>
			<div class={style.right}>
				<Metric metrics={metrics} metric_name='environment.wind.angleApparent' large={false} />
			</div>
			<div class={style.right}>
				<Metric metrics={metrics} metric_name='environment.wind.speedApparent' large={false} />
			</div>		
		</div >
	);
}

export default Home;
