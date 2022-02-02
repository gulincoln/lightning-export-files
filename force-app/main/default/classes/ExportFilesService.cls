/*
* @author Gustavo Lincoln 
*/
public virtual class ExportFilesService {
    
    private ContentDocumentRepository repository;
    
    private ExportFilesTransformer transformer;


    public ExportFilesService() {
        repository = new ContentDocumentRepository();
        transformer = new ExportFilesTransformer();
    }

    public ExportFilesInfo getFilesDetails() {

        return transformer.toFileDetails( repository.findFileDetails() );

    }

    public ExportFilesInfo getFilesDetails( Date startDate, Date endDate ) {

        return transformer.toFileDetails( repository.findFileDetails( startDate, endDate ) );

    }

}
