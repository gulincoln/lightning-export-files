/*
* @author Gustavo Lincoln 
*/
public class ExportFilesTransformer {

    public ExportFilesInfo toFileDetails( List<AggregateResult> results ) {

        ExportFilesInfo fileDetails = new ExportFilesInfo();

        if( results.isEmpty() ) return fileDetails;

        fileDetails.count = (Integer) results.get(0).get('counter');
        
        Decimal contentSize = (Decimal) results.get(0).get('totalSize');

        return checkContentSize( fileDetails, contentSize );

    }

    private ExportFilesInfo checkContentSize( ExportFilesInfo fileDetails, Decimal contentSize ) {

        if( contentSize < 1000 ) return fileDetails;

        fileDetails.totalSize = (contentSize / 1000).setScale(3);
        fileDetails.identifier = 'MB';

        if( fileDetails.totalSize > 1000 ) {
            fileDetails.totalSize = (fileDetails.totalSize / 1000).setScale(3);
            fileDetails.identifier = 'GB';
        }

        return fileDetails;

    }

}
