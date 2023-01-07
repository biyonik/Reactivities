using Microsoft.AspNetCore.Identity;

namespace Reactivities.Domain;

public class AppUser: IdentityUser<Guid>
{
    public string DisplayName { get; set; }
    public string? Bio { get; set; }
    public ICollection<ActivityAttendee> Activities { get; set; }
}