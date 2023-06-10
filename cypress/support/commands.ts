/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
import * as selectors from '../fixtures/selectors.json';
import * as data from '../fixtures/data.json'

declare global {
    namespace Cypress {
        interface Chainable {
            goToDashboardPage(): Chainable<void>;
            openDetailedIssueView(): Chainable<void>;
        }
    }
}
Cypress.Commands.add('goToDashboardPage', () => {
    // Visit the project board page
    cy.visit(data.baseUrl)

    // wait for default redirects
    cy.wait(15000)
    cy.url().should('eq', `${data.baseUrl}/project/board`)
});

Cypress.Commands.add('openDetailedIssueView', () => {
    // Verify that the task board is visible.
    cy.get(selectors.backlogContainer).should('be.visible');

    // Click on an item on the task board.
    cy.get(selectors.firstBacklogIssue).click();

    // Check that details view is opened.
    cy.get(selectors.detailsViewModal).should('be.visible');
});