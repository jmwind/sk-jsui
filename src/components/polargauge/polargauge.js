import styles from "./style.css";
import { arc } from "d3-shape"
import { useState, useEffect } from "preact/hooks"
import { SkConversions, SkData } from 'sk-jsclient/sk-data'

const getCoordsOnArc = (angle, r = 10) => [
    Math.cos(toRadians(angle) - Math.PI / 2) * r,
    Math.sin(toRadians(angle) - Math.PI / 2) * r,
]

const toRadians = (degree) => {
    return degree * (Math.PI / 180)
}

const tickAngles = (increments, startAngle, stopAngle) => {
    let angles = []
    let angle = startAngle;
    while (angle <= stopAngle) {
        angles.push(angle);
        angle = angle + increments;
    }
    return angles
}

const PolarGauge = (props) => {
    const [metrics, setMetrics] = useState(props.metrics)
    const [time, setTime] = useState(Date.now())
    const [lowPercent, setLowPercent] = useState(0)
    const [highPercent, setHighPercent] = useState(0)

    const awa = SkConversions.fromMetric(metrics[SkData.AWA]);
    const textColor = props.theme == "dark" ? "white" : "black"

    if (awa < lowPercent) {
        setLowPercent(awa)
    }
    if (awa > highPercent) {
        setHighPercent(awa)
    }
    let percent = awa;
    let step = 5;

    const ticks = (increments, largeTickInterval) => {
        let angles = Array(13).fill().map((x, i) => i)
        let ticks = angles.map(a => {
            return (
                <line
                    y1={40}
                    y2={40}
                    x1={-20}
                    x2={20}
                    stroke={textColor}
                    stroke-width="1"
                    transform={`translate(0 ${a * -step})`}
                />
            )
        });
        return ticks
    }

    const tickText = (increments) => {
        let angles = Array(13).fill().map((x, i) => i)
        let text = angles.map(a => {
            if (a % 2 != 0) return;
            return (
                <text
                    text-anchor="middle"
                    alignment-baseline="middle"
                    x="-25"
                    y="40"
                    fill={textColor}
                    font-size="3"
                    transform={`translate(0 ${a * -step})`}>{a * 10}%</text>
            )
        });
        return text
    }

    useEffect(() => {
        let timer = setInterval(() => setTime(Date.now()), 1000);
        return () => clearInterval(timer);
    }, []);

    let color = 'green'
    if (awa < 40) {
        color = 'red'
    } else if (awa >= 40 && awa < 49) {
        color = "yellow"
    }

    return (
        <div class={styles.container}>
            <svg
                width="60em"
                height="60em"
                viewBox={[-45, -45, 90, 90].join(" ")}
            >
                <rect x="-20" y={-20} width="40" height={60} fill="grey" />
                <rect x="-20" y={40 - (percent / 12) * (step + 1)} width="40" height={(percent / 12) * (step + 1)} fill={color} />
                {ticks(15, 30)}
                {tickText(30)}
                <text
                    text-anchor="middle"
                    alignment-baseline="middle"
                    x="35"
                    y="10"
                    fill={textColor}
                    font-size="10">{awa.toFixed(0)}%
                </text>
                <circle
                    r="1"
                    x="0"
                    y="40"
                    fill="blue"
                    transform={`translate(20 ${40 - (highPercent / 12) * (step + 1)})`}
                />
            </svg>
        </div >
    )
}

export default PolarGauge;