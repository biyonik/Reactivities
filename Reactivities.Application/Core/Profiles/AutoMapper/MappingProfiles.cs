using AutoMapper;
using Reactivities.Domain;

namespace Reactivities.Application.Core.Profiles.AutoMapper;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<Activity, Activity>().ReverseMap();
    }
}