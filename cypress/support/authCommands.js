Cypress.Commands.add(
    "login",
    (username, password) => {
            cy.visit('/')
            cy.get('#email').should('be.visible').type(username)
            cy.get('#password').should('be.visible').type(password)
            cy.get('#btn-login').should('be.visible').click()
    }
);
