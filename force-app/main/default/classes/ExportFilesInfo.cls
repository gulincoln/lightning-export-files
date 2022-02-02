/*
* @author Gustavo Lincoln 
*/
public class ExportFilesInfo {
    
    @AuraEnabled public Integer count;

    @AuraEnabled public Decimal totalSize;

    @AuraEnabled public String identifier;


    public ExportFilesInfo() {
        this.count = 0;
        this.totalSize = 0.0;
        this.identifier = 'KB';
    }

}
