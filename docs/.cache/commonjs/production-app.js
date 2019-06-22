"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _apiRunnerBrowser = require("./api-runner-browser");

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _router = require("@reach/router");

var _gatsbyReactRouterScroll = require("gatsby-react-router-scroll");

var _domready = _interopRequireDefault(require("@mikaelkristiansson/domready"));

var _navigation = require("./navigation");

var _emitter = _interopRequireDefault(require("./emitter"));

var _pageRenderer = _interopRequireDefault(require("./page-renderer"));

var _asyncRequires = _interopRequireDefault(require("./async-requires"));

var _matchPaths = _interopRequireDefault(require("./match-paths.json"));

var _loader = _interopRequireWildcard(require("./loader"));

var _ensureResources = _interopRequireDefault(require("./ensure-resources"));

window.asyncRequires = _asyncRequires.default;
window.___emitter = _emitter.default;
window.___loader = _loader.default;
window.___webpackCompilationHash = window.webpackCompilationHash;

_loader.default.addProdRequires(_asyncRequires.default);

_loader.default.addMatchPaths(_matchPaths.default);

(0, _loader.setApiRunnerForLoader)(_apiRunnerBrowser.apiRunner);
(0, _navigation.init)(); // Let the site/plugins run code very early.

(0, _apiRunnerBrowser.apiRunnerAsync)(`onClientEntry`).then(() => {
  // Let plugins register a service worker. The plugin just needs
  // to return true.
  if ((0, _apiRunnerBrowser.apiRunner)(`registerServiceWorker`).length > 0) {
    require(`./register-service-worker`);
  }

  class RouteHandler extends _react.default.Component {
    render() {
      let {
        location
      } = this.props;
      return _react.default.createElement(_ensureResources.default, {
        location: location
      }, ({
        pageResources,
        location
      }) => _react.default.createElement(_navigation.RouteUpdates, {
        location: location
      }, _react.default.createElement(_gatsbyReactRouterScroll.ScrollContext, {
        location: location,
        shouldUpdateScroll: _navigation.shouldUpdateScroll
      }, _react.default.createElement(_pageRenderer.default, (0, _extends2.default)({}, this.props, {
        location: location,
        pageResources: pageResources
      }, pageResources.json)))));
    }

  }

  const {
    pagePath,
    location: browserLoc
  } = window;

  if ( // Make sure the window.page object is defined
  pagePath && // The canonical path doesn't match the actual path (i.e. the address bar)
  __BASE_PATH__ + pagePath !== browserLoc.pathname && // Ignore 404 pages, since we want to keep the same URL
  pagePath !== `/404.html` && !pagePath.match(/^\/404\/?$/) && // Also ignore the offline shell (since when using the offline plugin, all
  // pages have this canonical path)
  !pagePath.match(/^\/offline-plugin-app-shell-fallback\/?$/)) {
    (0, _router.navigate)(__BASE_PATH__ + pagePath + browserLoc.search + browserLoc.hash, {
      replace: true
    });
  }

  _loader.default.loadPage(browserLoc.pathname).then(() => {
    const Root = () => (0, _react.createElement)(_router.Router, {
      basepath: __BASE_PATH__
    }, (0, _react.createElement)(RouteHandler, {
      path: `/*`
    }));

    const WrappedRoot = (0, _apiRunnerBrowser.apiRunner)(`wrapRootElement`, {
      element: _react.default.createElement(Root, null)
    }, _react.default.createElement(Root, null), ({
      result
    }) => {
      return {
        element: result
      };
    }).pop();

    let NewRoot = () => WrappedRoot;

    const renderer = (0, _apiRunnerBrowser.apiRunner)(`replaceHydrateFunction`, undefined, _reactDom.default.hydrate)[0];
    (0, _domready.default)(() => {
      renderer(_react.default.createElement(NewRoot, null), typeof window !== `undefined` ? document.getElementById(`___gatsby`) : void 0, () => {
        (0, _apiRunnerBrowser.apiRunner)(`onInitialClientRender`);
      });
    });
  });
});