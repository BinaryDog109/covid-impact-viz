export const HistogramRect = ({
  record,
  xMapping,
  yMapping,
  xAccessor,
  yAccessor,
}) => (
  <>
    <rect
      x={0}
      y={yMapping(yAccessor(record))}
      width={xMapping(xAccessor.Continue(record))}
      height={yMapping.bandwidth()}
      className="mark-subset1"
    >
      <title>{`Continue to trade: ${xAccessor.Continue(record)}`}</title>
    </rect>
    <rect
      x={0 + xMapping(xAccessor.Continue(record))}
      y={yMapping(yAccessor(record))}
      width={xMapping(xAccessor.TemPause(record))}
      height={yMapping.bandwidth()}
      className="mark-subset2"
    >
      <title>{`Temporarily paused: ${xAccessor.TemPause(record)}`}</title>
    </rect>
    <rect
      className="mark-subset3"
      x={
        xMapping(xAccessor.Continue(record)) +
        xMapping(xAccessor.TemPause(record))
      }
      y={yMapping(yAccessor(record))}
      width={xMapping(xAccessor.PermantStop(record))}
      height={yMapping.bandwidth()}
    >
      <title>{`Permanently ceased trading: ${xAccessor.PermantStop(
        record
      )}`}</title>
    </rect>
  </>
);
