/*
* @author Gustavo Lincoln 
*/
public without sharing class ExportFilesController {
    
    private static ExportFilesService service;
    
    static {
        service = new ExportFilesService();
    }

    //4 test injection
    public static void setService( ExportFilesService mockedService ) {
        service = mockedService;
    }
    

    @AuraEnabled
    public static ExportFilesInfo getFilesDetails() { 
        
        try {

            return service.getFilesDetails();
            
        } catch (Exception e) {

            throw new AuraHandledException( e.getMessage() );
        
        }
    
    }

    @AuraEnabled
    public static ExportFilesInfo getFilesDetailsOnInterval( Date startDate, Date endDate ) { 
        
        try {

            return service.getFilesDetails( startDate, endDate );
            
        } catch (Exception e) {

            throw new AuraHandledException( e.getMessage() );
        
        }
    
    }

}
