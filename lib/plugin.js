import Vue from 'vue'
import Segment from '@dansmaculotte/vue-segment'
import isbot from 'isbot';

const SEGMENT_WRITE_KEY = '<%= options.writeKey %>'
const SEGMENT_DISABLED = <%= options.disabled %>
const SEGMENT_USE_ROUTER = <%= options.useRouter %>
const SEGMENT_SETTINGS = <%= JSON.stringify(options.settings) %>

export default function (context, inject) {
  const { app, store, $config } = context

  const options = {
    writeKey: SEGMENT_WRITE_KEY,
    disabled: SEGMENT_DISABLED,
    settings: SEGMENT_SETTINGS
  }

  if ($config.segment) {
    Object.assign(options, $config.segment)
  }

  if (isbot(navigator.userAgent)) {
    console.warn('Analytics disabled as user-agent is perceived to be a bot');
    options.disabled = true;
  }

  if (SEGMENT_USE_ROUTER && app.router) {
    options.router = app.router
  }

  Vue.use(Segment, options)

  if (store) {
    store.$segment = Vue.$segment
  }

  context.$segment = Vue.$segment

  if (Vue.$segment) {
    inject('segment', Vue.$segment)
  }
}
