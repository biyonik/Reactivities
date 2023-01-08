using AutoMapper;
using Reactivities.Application.Activities.DTOs;
using Reactivities.Application.Profile.DTOs;
using Reactivities.Domain;

namespace Reactivities.Application.Core.Profiles.AutoMapper;

public class MappingProfiles : global::AutoMapper.Profile
{
    public MappingProfiles()
    {
        CreateMap<Activity, Activity>().ReverseMap();
        CreateMap<Activity, ActivityDTO>()
            .ForMember(d => d.HotUserName, o => o.MapFrom(s => s.Attendees
                .FirstOrDefault(x => x.IsHost).AppUser.UserName)).ReverseMap();
        CreateMap<ActivityAttendee, ProfileDTO>()
            .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
            .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName))
            .ForMember(d => d.Bio, o => o.MapFrom(s => s.AppUser.Bio));

    }
}