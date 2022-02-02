/*
* @author Gustavo Lincoln 
*/
public virtual class ContentDocumentRepository extends AbstractRepository {
    
    virtual
    public List<AggregateResult> findFileDetails() {

        return [ SELECT COUNT(Id) counter, SUM(ContentSize) totalSize FROM ContentDocument ];

    }

    virtual
    public List<AggregateResult> findFileDetails( Date startDate, Date endDate ) {

        return [ SELECT COUNT(Id) counter, SUM(ContentSize) totalSize FROM ContentDocument WHERE CreatedDate >= :startDate AND CreatedDate <= :endDate ];

    }

}
