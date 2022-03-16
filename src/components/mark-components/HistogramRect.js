//  Render a long rectangle for one data record.
// This rectangle contains three portions:
// Continue to Trade number, Temporarily Pause number and Permanently Stop number
export const HistogramRect = ({
  record,
  xMapping,
  yMapping,
  xAccessor,
  yAccessor,
  colorMapping,
  hoverLegend,
  mustDisplay = false,
}) => {
  const [color1, color2, color3] = colorMapping.range();
  const recordResponses = xAccessor(record)
  const yPosition = yMapping(yAccessor(record));
  const yHeight = yMapping.bandwidth();
  const xDistanceForContinueTrading = xMapping(xAccessor.Continue(record));
  const xDistanceForTemPause = xMapping(xAccessor.TemPause(record));
  const xDistanceForPermenantStop = xMapping(xAccessor.PermantStop(record));
  const hoverOpacityJudgeForText = (color) =>
    hoverLegend && colorMapping(hoverLegend) === color ? 1 : 0;
  const hoverOpacityJudgeForRectangles = (color) =>
    mustDisplay || hoverOpacityJudgeForText(color) ? 1 : 0.2;

  return (
    <g className="main-shape">
      <rect
        opacity={hoverOpacityJudgeForRectangles(color1)}
        x={0}
        y={yPosition}
        width={xDistanceForContinueTrading}
        height={yHeight}
        fill={color1}
      >
        <title>{`Continue to trade: ${xAccessor.Continue(record)} (${+record.continue * 100}%)`}</title>
      </rect>
      <text
        visibility={hoverOpacityJudgeForText(color1)?"visible":"hidden"}
        textAnchor="start"
        className="text-continue-to-trade-number"
        x={xDistanceForContinueTrading / 2}
        y={yPosition + yHeight / 2}
        dy="0.32em"
      >
        {`${xAccessor.Continue(record)} responses`}
      </text>

      <rect
        opacity={hoverOpacityJudgeForRectangles(color2)}
        x={0 + xDistanceForContinueTrading}
        y={yPosition}
        width={xDistanceForTemPause}
        height={yHeight}
        fill={color2}
      >
        <title>{`Temporarily paused: ${xAccessor.TemPause(record)} (${+record.temPause * 100}%)`}</title>
      </rect>
      <text
        visibility={hoverOpacityJudgeForText(color2)?"visible":"hidden"}
        textAnchor="middle"
        className="text-temporary-pause-number"
        x={xDistanceForContinueTrading + xDistanceForTemPause / 2}
        y={yPosition + yHeight / 2}
        dy="0.32em"
      >
        {`${xAccessor.TemPause(record)} responses`}
      </text>

      <rect
        opacity={hoverOpacityJudgeForRectangles(color3)}
        fill={color3}
        x={xDistanceForContinueTrading + xDistanceForTemPause}
        y={yPosition}
        width={xDistanceForPermenantStop}
        height={yHeight}
      >
        <title>{`Permanently ceased trading: ${xAccessor.PermantStop(
          record
        )} (${ (((1 - (+record.continue) - (+record.temPause))) * 100).toFixed(2)}%)`}</title>
      </rect>
      <text
        visibility={hoverOpacityJudgeForText(color3)?"visible":"hidden"}
        textAnchor="middle"
        className="text-permenant-stop-number"
        x={
          xDistanceForContinueTrading +
          xDistanceForTemPause +
          xDistanceForPermenantStop / 2
        }
        y={yPosition + yHeight / 2}
        dy="0.32em"
      >
        {`${xAccessor.PermantStop(record)} responses`}
      </text>
    </g>
  );
};
