import { useEffect, useState, useRef } from "preact/hooks";
import style from './style.css';
import { SkConversions } from 'sk-jsclient/sk-data';

const Metric = (props) => {
    const [time, setTime] = useState(Date.now());
    const [metrics, setMetrics] = useState(props.metrics);

    // update metrics every 1s
    useEffect(() => {
        let timer = setInterval(() => setTime(Date.now()), 1000);
        return () => clearInterval(timer);
    }, []);

    let m = metrics[props.metric_name];
    let m_val = SkConversions.fromMetric(m);
    //let sog_val_dec = (m_val % 1).toFixed(1);

    return (
        <div class={style.left}>
            <span class={props.large ? style.h1 : style.h1_small}>{m.nameMetric}</span>
            <span class={props.large ? style.h2 : style.h2_small}>{m_val}</span>
            <span class={props.large ? style.h3 : style.h3_small}>{m.nameUnit}</span>
        </div>
    );
}

export default Metric;
