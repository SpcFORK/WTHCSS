import stylesheet from './core/stylesheet.js'

const ep_ = {
  stylesheet
}

const ev_ = new CustomEvent('wtfcss:loaded', {
  detail: {
    version: '0.0.1',
    entrypoint: ep_,
  }
})

window.WTFCSS = { ...ep_ }

window.dispatchEvent(ev_)