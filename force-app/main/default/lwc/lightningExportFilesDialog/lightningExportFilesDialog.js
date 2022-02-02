import { LightningElement, api } from 'lwc';

export default class LightningExportFilesDialog extends LightningElement {
    
    @api fileDetails;

    startExport(event) {

        this.dispatchEvent( new CustomEvent( 'confirm', {} ) );

    }

    dispatchCloseEvent(event) {

        this.dispatchEvent( new CustomEvent( 'closemodal', {} ) );

    }

    get hasValidRecords() {
        return this.fileDetails?.count > 0;
    }

    get counter() {
        return ( this.fileDetails.count !== 1 ) ? this.fileDetails.count + ' registros' : '1 registro'; 
    }

}