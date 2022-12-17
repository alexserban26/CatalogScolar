using CatalogScolar.Crosscutting.Constants;

namespace CatalogScolar.Crosscutting.Exceptions;

public class EmailNotFoundException : BaseException
{
    public EmailNotFoundException() : base(ErrorConstants.EmailNotFoundType, "Email address not registered")
    {
    }
}
