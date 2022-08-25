import { useState } from "preact/hooks";
import style from './style.css';
import Metric from '../../components/metric/metric';
import { SkData, SkConversions } from "sk-jsclient/sk-data";

const Home = (props) => {
	const [metrics, setMetrics] = useState(props.metrics);

	const ratioFormatter = (val) => {
		if (val > 0) {
			let sog = SkConversions.fromMetric(metrics['navigation.speedOverGround']);
			return (sog / val * 100).toFixed(0);
		}
		return 0;
	}

	return (
		<div class={style.home}>
			<div class={style.left}>
				<Metric metrics={metrics} metric_name='navigation.polarSpeedRatio' formatter={ratioFormatter} large={true} />
			</div>
			<div class={style.right}>
				<Metric metrics={metrics} metric_name='navigation.speedOverGround' large={false} />
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
