import { on } from "cluster"
import { onFormLayoutsPage } from "../support/pageObjects/formLayoutsPage"
import { navigateTo } from "../support/pageObjects/navigationPage"
import { onDatePickerPage } from "../support/pageObjects/datePickerPage"
import { onSmartTablePage } from "../support/pageObjects/smartTablePage"

describe('First test suite', () => {

    beforeEach('open application', () =>{
        cy.openHomePage()
    })

    it('verify navigation across the pages', () => {
        navigateTo.formLayoutsPage()
        navigateTo.datePickerPage()
        navigateTo.formLayoutsPage()
        navigateTo.smartTablePage()
        navigateTo.tooltipPage()
        navigateTo.toastrPage()
    })

    it('submit Inline and Basic form and select tomorrow date in the calendar', () => {
        navigateTo.formLayoutsPage()
        onFormLayoutsPage.submitInlineFormWithNameAndEmail('Test Test', 'test@test.com')
        onFormLayoutsPage.submitBasicFormWithEmailAndPassword('test@test.com', '12345678')
        navigateTo.datePickerPage()
        onDatePickerPage.selectCommonDatePickerDateFromToday(50)
        onDatePickerPage.selectDatePickerWithRange(10, 30)
    })

    it.only('edit, add and delete table items', () =>{
        navigateTo.smartTablePage() 
        onSmartTablePage.editRowAgeByName('Larry', '15')
        onSmartTablePage.addNewTableItemWithNameAndSurname('Anna', 'Smith')
        onSmartTablePage.deleteTableItemByIndex(1)
    })
})