using System.Threading.Tasks;
using CatalogScolar.Domain.Entities;

namespace CatalogScolar.Domain.Services.Interfaces;

public interface IMailService
{
    Task SendPasswordResetMail(User user);
    Task SendActivationEmail(User user);
    Task SendCreationEmail(User user);
}
