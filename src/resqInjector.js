import { getReactRoot } from './utils';

/**
 * wait for react to be loaded
 * @param {*} timeout
 * @param {*} reactRoot
 */
export const waitForReact = (timeout = 10000, reactRoot) => {
  cy.readFile('node_modules/resq/dist/index.js', 'utf8', { log: false }).then(
    (script) => {
      cy.window({ log: false }).then({ timeout: timeout }, (win) => {
        win.eval(script);
        return new Cypress.Promise.resolve(
          win.resq.waitToLoadReact(timeout, getReactRoot(reactRoot))
        )
          .then(() => {
            cy.log('[cypress-react-selector] loaded');
          })
          .catch((err) => {
            throw new Error(
              `[cypress-react-selector] root found as ${reactRoot}. It is not valid root for your application. \n
              > Make sure to declare root selector as a configuration [recommended]\n
              > or Pass as a parameter to waitForReact() method`
            );
          });
      });
    }
  );
};
