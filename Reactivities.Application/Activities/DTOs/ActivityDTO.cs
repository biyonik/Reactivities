using Reactivities.Application.Profile.DTOs;

namespace Reactivities.Application.Activities.DTOs;

public class ActivityDTO
{
    public Guid Id { get; set; }
    public string Title { get; set; }
    public DateTime Date { get; set; }
    public string Description { get; set; }
    public string Category { get; set; }
    public string City { get; set; }
    public string Venue { get; set; }
    public string HotUserName { get; set; }
    public bool IsCancelled { get; set; }
    public ICollection<ProfileDTO> Attendees { get; set; }
}