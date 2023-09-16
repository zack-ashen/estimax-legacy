import ReactSlider from "react-slider";

import styles from './Slider.module.scss'
import { useState } from "react";


interface SliderProps {
  sliderStates: string[];
  label: string;
  setUpstreamState: (state: string) => void;
}


export default function Slider({ sliderStates, label, setUpstreamState }: SliderProps) {
  const [ sliderState, setSliderState ] = useState(sliderStates[0])

  return (
    <div className={styles.SliderParent}>
      <p className={styles.label}>{label}</p>
      <div className={styles.sliderContainer}>
        <ReactSlider
          className={styles.slider}
          trackClassName={styles.sliderTrack}
          markClassName={styles.sliderTick}
          thumbClassName={styles.sliderThumb}
          renderThumb={(props, _) => (
            <div {...props} className={styles.thumbContainer}>
              <div className={styles.sliderThumb}></div>
              <div className={styles.sliderStateContainer}>
                <h6>{sliderState}</h6>
              </div>
            </div>
          )}
          onChange={(newVal, _) => {
            setSliderState(sliderStates[newVal])
            setUpstreamState(sliderStates[newVal])
          }}
          min={0}
          max={sliderStates.length-1}
          marks
        />
      </div>
    </div>
  )
}