# offsetLayer
엘리먼트 선택시 임의 엘리먼트를 기준으로 레이어 생성 (오버레이 영역 클릭시 레이어 닫음)


### Dependence
css-in-js 패키지 필요 (styled-components, emotion 등)

### Option

|key|value|
|---|---|
|target|엘리먼트
move|엘리먼트로 부터 이동위치 (default: {top: 0, left: 0})
zIndex|레이어의 z-index (default: 5)
closedLayer|레이어 닫기 함수


### Usage

```ts
// Imports
import React, { FC, useState, useRef, useCallback } from 'react'
import styled from 'styled-components'
import OffsetLayer from './layer/offset_layer'

const Container: FC<P> = () => {
  const [layerView, setLayerView] = useState(false)
  const Button = useRef<HTMLButtonElement>(null)

  const onClickLayerView = useCallback((s: boolean) => {
      setLayerView(s)
  }, [])

  return (
    <>
      <button type="button" ref={Button} onClick={() => onClickLayerView(true)}>button<button>
      <OffsetLayer target={Button} closedLayer={() => onClickLayerView(false)}>
        <div>Hello world</div>
      </OffsetLayer>
    </>
  )
}

export default Container
```
