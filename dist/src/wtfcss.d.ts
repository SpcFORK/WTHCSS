import WTFStylesheet from './core/stylesheet.js';
import './helpers/index.js';
import './helpers/@charset.js';
import './helpers/@colorprofile.js';
import './helpers/@container.js';
import './helpers/@property.js';
import './helpers/@counterstyle.js';
import './helpers/@fontface.js';
import './helpers/@fontfeaturevalues.js';
import './helpers/@fontpalletevalues.js';
import './helpers/@import.js';
import './helpers/@keyframes.js';
import './helpers/@layer.js';
import './helpers/@media.js';
import './helpers/@namespace.js';
import './helpers/@page.js';
import './helpers/@startingstyle.js';
import './helpers/@supports.js';
import './keywords/index.js';
import './keywords/types.js';
import './keywords/important.js';
import './functions/index.js';
import './functions/abs.js';
import './functions/acos.js';
import './functions/asin.js';
import './functions/atan.js';
import './functions/atan2.js';
import './functions/attr.js';
import './functions/calc.js';
import './functions/clamp.js';
import './functions/cos.js';
import './functions/counter.js';
import './functions/counters.js';
import './functions/crossfade.js';
import './functions/element.js';
import './functions/env.js';
import './functions/exp.js';
import './functions/fitcontent.js';
import './functions/hypot.js';
import './functions/log.js';
import './functions/max.js';
import './functions/min.js';
import './functions/minmax.js';
import './functions/mod.js';
import './functions/path.js';
import './functions/pow.js';
import './functions/ray.js';
import './functions/rem.js';
import './functions/repeat.js';
import './functions/round.js';
import './functions/sign.js';
import './functions/sin.js';
import './functions/sqrt.js';
import './functions/symbols.js';
import './functions/tan.js';
import './functions/url.js';
import './functions/var.js';
import './handles/index.js';
import './handles/or.gate.js';
import './magic/index.js';
import './magic/rootManipulate.js';

const ep_ = {
  stylesheet: WTFStylesheet
};

const ev_ = new CustomEvent('wtfcss:loaded', {
  detail: {
    version: '0.0.1',
    entrypoint: ep_,
  }
});

window.WTFCSS = { ...ep_ };

window.dispatchEvent(ev_);
