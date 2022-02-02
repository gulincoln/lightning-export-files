import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import getFilesDetails from '@salesforce/apex/ExportFilesController.getFilesDetails';
import getFilesDetailsOnInterval from '@salesforce/apex/ExportFilesController.getFilesDetailsOnInterval';


export default class LightningExportFiles extends LightningElement {
    
    @track interval = {};
    @track fileDetails = {};
    
    isLoading = false;
    isExportAll = false;

    handleExportAllChange(event) {
        this.isExportAll = event.target.checked;
        this.clearIntervalDates();
    }

    handleStartDateChange(event) {
        this.interval.start = event.target.value;
        this.checkDateValidity(event.target);
    }

    handleEndDateChange(event) {
        this.interval.end = event.target.value;
        this.checkDateValidity(event.target);
    }

    handleCloseConfirmation(event) {
        this.fileDetails = {};
    }

    checkDateValidity(dateComponent) {

        dateComponent.setCustomValidity( '' );
        dateComponent.reportValidity();

        if( !this.interval.start || !this.interval.end ) return;

        if( !this.hasValidDateInterval ) {
            dateComponent.setCustomValidity( 'Favor inserir um intervalo válido!' );
            dateComponent.reportValidity();
        }
    
    }

    checkFileDetails(event) {

        this.isLoading = true;

        if( this.hasValidDateInterval ) {

            this.retrieveFileDetailsOnInterval();
            return;

        }

        this.retrieveFileDetails();

    }

    retrieveFileDetailsOnInterval() {

        getFilesDetailsOnInterval( { startDate: this.interval.start, endDate: this.interval.end } ).then( result => {

            this.fileDetails = result;

        } ).catch( error => {

            this.displayErrorMessage( 'Erro ao buscar detalhes dos Arquivos!', error.body.message );

        } ).finally( () => { this.isLoading = false } );

    }

    retrieveFileDetails() {

        getFilesDetails().then( result => {

            this.fileDetails = result;

        } ).catch( error => {

            this.displayErrorMessage( 'Erro ao buscar detalhes dos Arquivos!', error.body.message );

        } ).finally( () => { this.isLoading = false } );

    }

    async startProcess() {

        this.fileDetails = {};

        this.displayMessage( 'Migração Iniciada com sucesso!', 'Assim que finalizar o processo, você será notificado do término', 'success' );

    }

    clearIntervalDates() {
        this.template.querySelectorAll('lightning-input').forEach( element => element.value = '' );
    }

    get hasValidDateInterval() {
        return this.interval?.start && this.interval?.end && this.interval?.start <= this.interval?.end;
    }

    get hasValidInputs() {
        return this.hasValidDateInterval || this.isExportAll;
    }

    get hasInvalidInputs() {
        return !this.hasValidInputs;
    }

    get displayConfirmation() {
        return this.fileDetails?.count && this.fileDetails?.totalSize;
    }

    displayErrorMessage( title, message ) {

        this.displayMessage( title, message, 'error' );

    }

    displayMessage( title, message, variant ) {

        this.dispatchEvent( new ShowToastEvent( { title: title, message: message, variant: variant } ) );
    
    }

}