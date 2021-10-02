// copy/pasted from something auto-generated via:
// https://theme-designer.grommet.io/
import {ThemeType} from 'grommet';
import { Close, Menu } from 'grommet-icons';

const defaultTheme: ThemeType = {
  // "name": "dslama-net",
  // "rounding": 0,
  // "spacing": 20,
  // "defaultMode": "light",
  "global": {
    "colors": {
      "brand": {
        "dark": "#e7eeed",
        "light": "#151910"
      },
      "background": {
        "dark": "#004741",
        "light": "#F3F7F6"
      },
      "background-back": {
        "dark": "#004741",
        "light": "#DAE7E3"
      },
      "background-front": {
        "dark": "#004741",
        "light": "#E7EEED"
      },
      "background-contrast": {
        "dark": "#004741",
        "light": "#e7efed"
      },
      "text": {
        "dark": "#EEEEEE",
        "light": "#2A3220"
      },
      "text-strong": {
        "dark": "#FFFFFF",
        "light": "#151910"
      },
      "text-weak": {
        "dark": "#CCCCCC",
        "light": "#726E75"
      },
      "text-xweak": {
        "dark": "#999999",
        "light": "#99969C"
      },
      "border": {
        "dark": "#444444",
        "light": "#726E75"
      },
      "control": "#006992",
      "active-background": "background",
      "active-text": "#26A96C",
      "selected-background": "background-front",
      "selected-text": "text-strong",
      "status-critical": "#FF4A1C",
      "status-warning": "#F0A202",
      "status-ok": "#26A96C",
      "status-unknown": "#726E75",
      "status-disabled": "#726E75",
      "graph-0": "brand",
      "graph-1": "status-warning",
      "focus": "#1D84B5"
    },
    "font": {
      "family": "Helvetica",
      "size": "15px",
      "height": "20px",
      "maxWidth": "300px"
    },
    "active": {
      "background": "active-background",
      "color": "active-text"
    },
    "hover": {
      "background": "active-background",
      "color": "active-text"
    },
    "selected": {
      "background": "selected-background",
      "color": "selected-text"
    },
    "control": {
      "border": {
        "radius": "0px"
      }
    },
    "drop": {
      "border": {
        "radius": "0px"
      }
    },
    "borderSize": {
      "xsmall": "1px",
      "small": "2px",
      "medium": "3px",
      "large": "10px",
      "xlarge": "20px"
    },
    "breakpoints": {
      "small": {
        "value": 640,
        "borderSize": {
          "xsmall": "1px",
          "small": "2px",
          "medium": "3px",
          "large": "5px",
          "xlarge": "10px"
        },
        "edgeSize": {
          "none": "0px",
          "hair": "1px",
          "xxsmall": "2px",
          "xsmall": "3px",
          "small": "5px",
          "medium": "10px",
          "large": "20px",
          "xlarge": "40px"
        },
        "size": {
          "xxsmall": "20px",
          "xsmall": "40px",
          "small": "80px",
          "medium": "160px",
          "large": "320px",
          "xlarge": "640px",
          "full": "100%"
        }
      },
      "medium": {
        "value": 1280
      },
      "large": {}
    },
    "edgeSize": {
      "none": "0px",
      "hair": "1px",
      "xxsmall": "3px",
      "xsmall": "5px",
      "small": "10px",
      "medium": "20px",
      "large": "40px",
      "xlarge": "80px",
      "responsiveBreakpoint": "small"
    },
    "input": {
      "padding": "10px",
      "weight": 600
    },
    "spacing": "20px",
    "size": {
      "xxsmall": "40px",
      "xsmall": "80px",
      "small": "160px",
      "medium": "320px",
      "large": "640px",
      "xlarge": "960px",
      "xxlarge": "1280px",
      "full": "100%"
    }
  },
  menu: {
    background: 'control',
    icons: {
      down: Menu,
      up: Close
    }
  },
  "chart": {},
  "diagram": {
    "line": {}
  },
  "meter": {},
  "formField": {
    "border": {
      "color": "text-xweak",
      "error": {
        "color": {
          "dark": "white",
          "light": "status-critical"
        }
      },
      "position": "inner",
      "side": "all",
      "size": "xsmall",
      "style": "solid"
    },
    "content": {
      "pad": "small"
    },
    "disabled": {
      "background": {
        "color": "status-disabled",
        "opacity": "medium"
      }
    },
    "error": {
      "color": "status-critical",
      "margin": {
        "vertical": "xsmall",
        "horizontal": "small"
      },
      // "size": "medium",
      // "weight": "bold",
      "background": {
        "color": "status-critical",
        "opacity": "weak"
      }
    },
    "help": {
      "color": "dark-3",
      "margin": {
        "start": "small"
      }
    },
    "info": {
      "color": "text-xweak",
      "margin": {
        "vertical": "xsmall",
        "horizontal": "small"
      }
    },
    "label": {
      "margin": {
        "vertical": "small",
        "horizontal": "none"
      },
      "color": "text-strong"
    },
    "margin": {
      "bottom": "large"
    },
    "round": "0px"
  },
  "layer": {
    "background": {
      "dark": "#111111",
      "light": "#FFFFFF"
    }
  },
  "button": {
    "border": {
      "width": "2px",
      "radius": "15px"
    },
    "padding": {
      "vertical": "3px",
      "horizontal": "18px"
    }
  },
  "checkBox": {
    "check": {
      "radius": "0px"
    },
    "toggle": {
      "radius": "20px",
      "size": "40px"
    },
    "size": "20px"
  },
  "radioButton": {
    "size": "20px"
  },
  "calendar": {
    "small": {
      "fontSize": "10.333333333333332px",
      "lineHeight": 1.375,
      "daySize": "22.86px"
    },
    "medium": {
      "fontSize": "15px",
      "lineHeight": 1.45,
      "daySize": "45.71px"
    },
    "large": {
      "fontSize": "29px",
      "lineHeight": 1.11,
      "daySize": "91.43px"
    }
  },
  "clock": {
    "analog": {
      "hour": {
        "width": "7px",
        "size": "20px"
      },
      "minute": {
        "width": "3px",
        "size": "10px"
      },
      "second": {
        "width": "3px",
        "size": "8px"
      },
      "size": {
        "small": "60px",
        "medium": "80px",
        "large": "120px",
        "xlarge": "180px",
        "huge": "240px"
      }
    },
    "digital": {
      "text": {
        "xsmall": {
          "size": "5.666666666666666px",
          "height": 1.5
        },
        "small": {
          "size": "10.333333333333332px",
          "height": 1.43
        },
        "medium": {
          "size": "15px",
          "height": 1.375
        },
        "large": {
          "size": "19.666666666666668px",
          "height": 1.167
        },
        "xlarge": {
          "size": "24.333333333333336px",
          "height": 1.1875
        },
        "xxlarge": {
          "size": "33.66666666666667px",
          "height": 1.125
        }
      }
    }
  },
  "heading": {
    "level": {
      "1": {
        "small": {
          "size": "34px",
          "height": "39px",
          "maxWidth": "673px"
        },
        "medium": {
          "size": "52px",
          "height": "57px",
          "maxWidth": "1047px"
        },
        "large": {
          "size": "90px",
          "height": "95px",
          "maxWidth": "1793px"
        },
        "xlarge": {
          "size": "127px",
          "height": "132px",
          "maxWidth": "2540px"
        }
      },
      "2": {
        "small": {
          "size": "29px",
          "height": "34px",
          "maxWidth": "580px"
        },
        "medium": {
          "size": "43px",
          "height": "48px",
          "maxWidth": "860px"
        },
        "large": {
          "size": "57px",
          "height": "62px",
          "maxWidth": "1140px"
        },
        "xlarge": {
          "size": "71px",
          "height": "76px",
          "maxWidth": "1420px"
        }
      },
      "3": {
        "small": {
          "size": "24px",
          "height": "29px",
          "maxWidth": "487px"
        },
        "medium": {
          "size": "34px",
          "height": "39px",
          "maxWidth": "673px"
        },
        "large": {
          "size": "43px",
          "height": "48px",
          "maxWidth": "860px"
        },
        "xlarge": {
          "size": "52px",
          "height": "57px",
          "maxWidth": "1047px"
        }
      },
      "4": {
        "small": {
          "size": "20px",
          "height": "25px",
          "maxWidth": "393px"
        },
        "medium": {
          "size": "24px",
          "height": "29px",
          "maxWidth": "487px"
        },
        "large": {
          "size": "29px",
          "height": "34px",
          "maxWidth": "580px"
        },
        "xlarge": {
          "size": "34px",
          "height": "39px",
          "maxWidth": "673px"
        }
      },
      "5": {
        "small": {
          "size": "13px",
          "height": "18px",
          "maxWidth": "253px"
        },
        "medium": {
          "size": "13px",
          "height": "18px",
          "maxWidth": "253px"
        },
        "large": {
          "size": "13px",
          "height": "18px",
          "maxWidth": "253px"
        },
        "xlarge": {
          "size": "13px",
          "height": "18px",
          "maxWidth": "253px"
        }
      },
      "6": {
        "small": {
          "size": "10px",
          "height": "15px",
          "maxWidth": "207px"
        },
        "medium": {
          "size": "10px",
          "height": "15px",
          "maxWidth": "207px"
        },
        "large": {
          "size": "10px",
          "height": "15px",
          "maxWidth": "207px"
        },
        "xlarge": {
          "size": "10px",
          "height": "15px",
          "maxWidth": "207px"
        }
      }
    }
  },
  "paragraph": {
    "small": {
      "size": "13px",
      "height": "18px",
      "maxWidth": "253px"
    },
    "medium": {
      "size": "15px",
      "height": "20px",
      "maxWidth": "300px"
    },
    "large": {
      "size": "20px",
      "height": "25px",
      "maxWidth": "393px"
    },
    "xlarge": {
      "size": "24px",
      "height": "29px",
      "maxWidth": "487px"
    },
    "xxlarge": {
      "size": "34px",
      "height": "39px",
      "maxWidth": "673px"
    }
  },
  "text": {
    "xsmall": {
      "size": "10px",
      "height": "15px",
      "maxWidth": "207px"
    },
    "small": {
      "size": "13px",
      "height": "18px",
      "maxWidth": "253px"
    },
    "medium": {
      "size": "15px",
      "height": "20px",
      "maxWidth": "300px"
    },
    "large": {
      "size": "20px",
      "height": "25px",
      "maxWidth": "393px"
    },
    "xlarge": {
      "size": "24px",
      "height": "29px",
      "maxWidth": "487px"
    },
    "xxlarge": {
      "size": "34px",
      "height": "39px",
      "maxWidth": "673px"
    }
  },
  // "scale": 1.4
};

export default defaultTheme;
