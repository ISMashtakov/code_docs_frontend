import React from 'react';
import { connect } from 'react-redux';
import Box from '@material-ui/core/Box';
import AceEditor from 'react-ace';

import COLORS from '../style/colors';
import FONTS from '../style/fonts';
import { HEADER_HEIGHT } from './Header';
import { CONSOLE_BOTTOM_SPACE, CONSOLE_TOP_SPACE } from './Console';

import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-github';

function Workspace({ text, consoleHeight }) {
  return (
    <Box style={{
      position: 'absolute', bottom: consoleHeight + CONSOLE_BOTTOM_SPACE + CONSOLE_TOP_SPACE, top: HEADER_HEIGHT + 52, left: 70, right: 97,
    }}
    >
      <AceEditor
        mode="python"
        theme="github"
        value={text}
        fontSize={FONTS.BODY.fontSize}
        style={{ background: COLORS.WHITE, width: '100%', height: '100%' }}
        highlightActiveLine={false}
        setOptions={{
          showLineNumbers: true,
        }}
      />
    </Box>
  );
}
function mapToState(state) {
  return {
    text: state.documentData.text,
    consoleHeight: state.documentData.consoleHeight,
  };
}
export default connect(mapToState)(Workspace);