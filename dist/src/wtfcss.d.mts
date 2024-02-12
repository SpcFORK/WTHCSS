import WTFStylesheet from './core/stylesheet.mjs';
import './helpers/index.mjs';
import './helpers/@charset.mjs';
import './helpers/@colorprofile.mjs';
import './helpers/@container.mjs';
import './helpers/@property.mjs';
import './helpers/@counterstyle.mjs';
import './helpers/@fontface.mjs';
import './helpers/@fontfeaturevalues.mjs';
import './helpers/@fontpalletevalues.mjs';
import './helpers/@import.mjs';
import './helpers/@keyframes.mjs';
import './helpers/@layer.mjs';
import './helpers/@media.mjs';
import './helpers/@namespace.mjs';
import './helpers/@page.mjs';
import './helpers/@startingstyle.mjs';
import './helpers/@supports.mjs';
import './keywords/index.mjs';
import './keywords/types.mjs';
import './keywords/important.mjs';
import './functions/index.mjs';
import './functions/abs.mjs';
import './functions/acos.mjs';
import './functions/asin.mjs';
import './functions/atan.mjs';
import './functions/atan2.mjs';
import './functions/attr.mjs';
import './functions/calc.mjs';
import './functions/clamp.mjs';
import './functions/cos.mjs';
import './functions/counter.mjs';
import './functions/counters.mjs';
import './functions/crossfade.mjs';
import './functions/element.mjs';
import './functions/env.mjs';
import './functions/exp.mjs';
import './functions/fitcontent.mjs';
import './functions/hypot.mjs';
import './functions/log.mjs';
import './functions/max.mjs';
import './functions/min.mjs';
import './functions/minmax.mjs';
import './functions/mod.mjs';
import './functions/path.mjs';
import './functions/pow.mjs';
import './functions/ray.mjs';
import './functions/rem.mjs';
import './functions/repeat.mjs';
import './functions/round.mjs';
import './functions/sign.mjs';
import './functions/sin.mjs';
import './functions/sqrt.mjs';
import './functions/symbols.mjs';
import './functions/tan.mjs';
import './functions/url.mjs';
import './functions/var.mjs';
import './handles/index.mjs';
import './handles/or.gate.mjs';
import './magic/index.mjs';
import './magic/rootManipulate.mjs';

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
