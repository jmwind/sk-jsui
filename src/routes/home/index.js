import { useState } from "preact/hooks";
import style from './style.css';
import Metric from '../../components/metric/metric';
import { SkData } from "sk-jsclient/sk-data";

const Home = (props) => {
	const [metrics, setMetrics] = useState(props.metrics);

	return (
		<div class={style.home}>
			<div class={style.left}>
				<Metric metrics={metrics} metric_name={SkData.POLAR_RATIO} large={true} />
			</div>
			<div class={style.right}>
				<Metric metrics={metrics} metric_name={SkData.SOG} large={false} />
			</div>
			<div class={style.right}>
				<Metric metrics={metrics} metric_name={SkData.POLAR_TARGET} large={false} />
			</div>
			<div class={style.right}>
				<Metric metrics={metrics} metric_name={SkData.AWA} large={false} />
			</div>
			<div class={style.right}>
				<Metric metrics={metrics} metric_name={SkData.AWS} large={false} />
			</div>
		</div >
	);
}

export default Home;
