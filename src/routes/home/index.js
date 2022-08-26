import { useState } from "preact/hooks"
import style from './style.css'
import Metric from '../../components/metric/metric'
import { SkData } from 'sk-jsclient/sk-data'
import WindGauge from "../../components/windgauge/windgauge"
import PolarGauge from "../../components/polargauge/polargauge"

const Home = (props) => {
	const [metrics, setMetrics] = useState(props.metrics);

	return (
		<div class={style.home}>
			<div class={style.left}>
				<PolarGauge metrics={metrics} theme={props.theme} />
			</div>
			<div class={style.right}>
				<WindGauge metrics={metrics} theme={props.theme} />
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
