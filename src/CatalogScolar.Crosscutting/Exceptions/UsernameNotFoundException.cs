using System.Security.Authentication;

namespace CatalogScolar.Crosscutting.Exceptions;

public class UsernameNotFoundException : AuthenticationException
{
    public UsernameNotFoundException(string message) : base(message)
    {
    }
}
