import React from 'react';
import { connect } from 'react-redux';
import Box from '@material-ui/core/Box';
import Input from '@material-ui/core/Input';

import COLORS from '../style/colors';
import FONTS from '../style/fonts';
import { setConsoleHeightAction, consoleDoubleClickAction } from './actions';
import { sendInput } from './connectionActions';
import { CONSOLE_HEADER_HEIGHT } from '../constants';

export const CONSOLE_BOTTOM_SPACE = 0;
export const CONSOLE_TOP_SPACE = 39;

let dragging = false;
let mouseDownY = null;
let mouseMoveListener = null;
let mouseUpListener = null;
let startConsoleHeight = 0;
function Console({
  consoleHeight, text, setConsoleHeight, consoleDoubleClick,
}) {
  const [inputText, setInputText] = React.useState('');

  let onMouseMove = null;
  let onMouseUp = null;

  function handlerEnter() {
    sendInput(inputText);
    setInputText('');
  }

  function onMouseDown(e) {
    if (e.button !== 0) return;
    dragging = true;
    mouseMoveListener = onMouseMove;
    mouseUpListener = onMouseUp;
    mouseDownY = e.pageY;
    startConsoleHeight = consoleHeight;
    document.addEventListener('mousemove', mouseMoveListener);
    document.addEventListener('mouseup', mouseUpListener);
    e.stopPropagation();
    e.preventDefault();
  }

  onMouseMove = React.useCallback((e) => {
    if (!dragging) return;
    const delta = e.pageY - mouseDownY;
    setConsoleHeight(startConsoleHeight - delta);
    e.stopPropagation();
    e.preventDefault();
  });

  onMouseUp = React.useCallback((e) => {
    dragging = false;
    document.removeEventListener('mousemove', mouseMoveListener);
    document.removeEventListener('mouseup', mouseUpListener);
    mouseMoveListener = null;
    mouseUpListener = null;
    e.stopPropagation();
    e.preventDefault();
  });

  React.useEffect(() => {
    function handleResize() {
      setConsoleHeight(consoleHeight);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });

  return (
    <div style={{
      position: 'absolute', bottom: CONSOLE_BOTTOM_SPACE, height: consoleHeight, left: 70, right: 97, minWidth: 800,
    }}
    >
      <div style={{ height: CONSOLE_HEADER_HEIGHT, backgroundColor: COLORS.GRAY2, cursor: 'ns-resize' }} onMouseDown={onMouseDown} onDoubleClick={consoleDoubleClick}>
        <span style={{
          ...FONTS.H3, color: COLORS.TEXT_GRAY, position: 'relative', left: 27, top: 7,
        }}
        >
          Console
        </span>
      </div>
      <Box
        style={{
          height: consoleHeight - CONSOLE_HEADER_HEIGHT,
          backgroundColor: COLORS.WHITE,
        }}
        overflow="auto"
      >
        <div style={{ marginLeft: 10 }}>
          <pre style={{ ...FONTS.BODY, margin: 0 }}>
            {text.filter((i) => i !== undefined).join('')}
          </pre>
          <Input
            fullWidth
            disableUnderline
            startAdornment={<span style={{ marginRight: 5 }}>{'>'}</span>}
            onChange={(event) => setInputText(event.target.value)}
            value={inputText}
            onKeyDown={(e) => { if (e.key === 'Enter') handlerEnter(); }}
          />
        </div>
      </Box>
    </div>
  );
}

function mapToState(state) {
  return {
    consoleHeight: state.documentData.consoleHeight,
    text: state.documentData.consoleText,
    length: state.documentData.consoleText.length,
  };
}

export default connect(mapToState, {
  setConsoleHeight: setConsoleHeightAction,
  consoleDoubleClick: consoleDoubleClickAction,
})(Console);
